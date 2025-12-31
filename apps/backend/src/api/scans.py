"""
Scan Submission API.

Creates a new scan job in `queued` state.
"""

from fastapi import APIRouter, Depends
from pydantic import BaseModel, HttpUrl
from deps.mongo import get_db
from uuid import uuid4
from datetime import datetime
from fastapi import HTTPException

router = APIRouter(prefix="/scans", tags=["scans"])


class ScanRequest(BaseModel):
    target_url: HttpUrl
    ruleset_version: str | None = None

class ScanResponse(BaseModel):
    scan_id: str
    status: str

class ScanStatusResponse(BaseModel):
    scan_id: str
    status: str
    phase: str
    progress: dict
    error: str | None = None
    updated_at: datetime


@router.post("", response_model=ScanResponse)
async def create_scan(
    payload: ScanRequest,
    db=Depends(get_db),
):
    scan_id = str(uuid4())
    now = datetime.utcnow()

    db.scans.insert_one({
        "scan_id": scan_id,
        "status": "queued",
        "progress": {
            "phase": "queued",
            "percent": 0,
        },
        "ruleset_version": payload.ruleset_version or "latest",
        "created_at": now,
        "updated_at": now,
        "meta": {
            "url": str(payload.target_url),
        },
    })

    return {
        "scan_id": scan_id,
        "status": "queued",
    }

@router.get("/{scan_id}/status", response_model=ScanStatusResponse)
async def get_scan_status(
    scan_id: str,
    db=Depends(get_db),
):
    scan = db.scans.find_one({"scan_id": scan_id})

    if not scan:
        raise HTTPException(status_code=404, detail="Scan not found")

    return {
        "scan_id": scan["scan_id"],
        "status": scan["status"],
        "phase": scan.get("progress", {}).get("phase", scan["status"]),
        "progress": scan.get("progress", {}),
        "error": scan.get("error"),
        "updated_at": scan.get("updated_at"),
    }
