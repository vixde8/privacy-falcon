"""
Mongo Dependency.

Provides a shared MongoDB handle for API routes.
Backend never applies business rules using this DB.
"""

from pymongo import MongoClient
import os

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
MONGO_DB = os.getenv("MONGO_DB", "privacy_falcon")

_client = MongoClient(MONGO_URI)
_db = _client[MONGO_DB]

def get_db():
    return _db
