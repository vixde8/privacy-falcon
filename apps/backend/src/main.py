"""
Privacy Falcon Backend API.

Thin HTTP adapter over worker-scanner services.
"""

from fastapi import FastAPI
from api.scans import router as scans_router
from api.status import router as status_router
from api.results import router as results_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Privacy Falcon API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(scans_router)
app.include_router(status_router)
app.include_router(results_router)
