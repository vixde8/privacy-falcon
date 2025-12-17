"""
Privacy Falcon Backend API.

Thin HTTP adapter over worker-scanner services.
"""

from fastapi import FastAPI
from api.scans import router as scans_router
from api.status import router as status_router
from api.results import router as results_router

app = FastAPI(title="Privacy Falcon API")

app.include_router(scans_router)
app.include_router(status_router)
app.include_router(results_router)
