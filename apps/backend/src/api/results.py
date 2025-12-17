"""
Scan Results API.

Returns final privacy score and explainability
for completed scans.
"""

from fastapi import APIRouter, Depends, HTTPException
from deps.mongo import get_db
from pydantic import BaseModel
from typing import Any, Optional

router = APIRouter(prefix="/scans", tags=["scans"])


class ScanResultsResponse(BaseModel):
    scan_id: str
    status: str
    ruleset_version: str
    score: Optional[Any]
    grade: Optional[str]
    confidence: Optional[Any]
    explainability: Optional[Any]
    completed_at: Optional[str]


@router.get("/{scan_id}/results", response_model=ScanResultsResponse)
def get_scan_results(scan_id: str, db=Depends(get_db)):
    scan = db.scans.find_one(
        {"scan_id": scan_id},
        {
            "_id": 0,
            "scan_id": 1,
            "status": 1,
            "ruleset_version": 1,
            "score": 1,
            "grade": 1,
            "confidence": 1,
            "explainability": 1,
            "completed_at": 1,
        },
    )

    if not scan:
        raise HTTPException(status_code=404, detail="Scan not found")

    if scan["status"] != "completed":
        raise HTTPException(
            status_code=409,
            detail=f"Scan not completed yet (status={scan['status']})",
        )

    return {
        "scan_id": scan["scan_id"],
        "status": scan["status"],
        "ruleset_version": scan.get("ruleset_version"),
        "score": scan.get("score"),
        "grade": scan.get("grade"),
        "confidence": scan.get("confidence"),
        "explainability": scan.get("explainability"),
        "completed_at": scan["completed_at"].isoformat()
        if scan.get("completed_at")
        else None,
    }
