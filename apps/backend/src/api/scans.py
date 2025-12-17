"""
Scan Submission API.

Creates a new scan job in `queued` state.
"""

from fastapi import APIRouter, Depends
from pydantic import BaseModel, HttpUrl
from deps.mongo import get_db
from uuid import uuid4
from datetime import datetime

router = APIRouter(prefix="/scans", tags=["scans"])


class ScanRequest(BaseModel):
    target_url: HttpUrl
    ruleset_version: str | None = None


class ScanResponse(BaseModel):
    scan_id: str
    status: str


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
