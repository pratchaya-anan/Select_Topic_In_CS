from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from CRUD.index import mock
import uvicorn

origins = [
    "http://localhost:3000",
    "http://localhost:8000",
]

app = FastAPI(title="SQLite Mocktail Database ",docs_url="/api/docs", openapi_url="/api")

app.include_router(mock, prefix="/api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__": uvicorn.run("server:app", host="0.0.0.0", reload=True, port=5555)