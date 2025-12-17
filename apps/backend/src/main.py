"""
Privacy Falcon Backend API.

Thin HTTP adapter over worker-scanner services.
"""

from fastapi import FastAPI
from api.scans import router as scans_router

app = FastAPI(title="Privacy Falcon API")

app.include_router(scans_router)
