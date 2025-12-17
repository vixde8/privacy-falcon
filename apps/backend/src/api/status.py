"""
Scan Status API.

Provides current lifecycle status and progress
for an existing scan job.
"""

from fastapi import APIRouter, Depends, HTTPException
from deps.mongo import get_db
from pydantic import BaseModel

router = APIRouter(prefix="/scans", tags=["scans"])


class ScanStatusResponse(BaseModel):
    scan_id: str
    status: str
    progress: dict
    updated_at: str


@router.get("/{scan_id}/status", response_model=ScanStatusResponse)
def get_scan_status(scan_id: str, db=Depends(get_db)):
    scan = db.scans.find_one(
        {"scan_id": scan_id},
        {
            "_id": 0,
            "scan_id": 1,
            "status": 1,
            "progress": 1,
            "updated_at": 1,
        },
    )

    if not scan:
        raise HTTPException(status_code=404, detail="Scan not found")

    return {
        "scan_id": scan["scan_id"],
        "status": scan["status"],
        "progress": scan.get("progress", {}),
        "updated_at": scan["updated_at"].isoformat(),
    }
