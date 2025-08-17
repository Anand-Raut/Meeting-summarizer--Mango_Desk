from fastapi import FastAPI
from pydantic import BaseModel
from server import summarize
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SummarizeRequest(BaseModel):
    transcript: str
    instruction: str

@app.get("/api/health")
def index():
    return {"status": "running"}

@app.post("/api/summarize")
def generate_summary(req: SummarizeRequest):
    summary = summarize(req.transcript, req.instruction)
    return {"summary": summary}


dist_path = os.path.join(os.path.dirname(__file__), "..", "client", "dist")

if os.path.isdir(dist_path):
    app.mount("/assets", StaticFiles(directory=os.path.join(dist_path, "assets")), name="assets")

    @app.get("/")
    def serve_index():
        return FileResponse(os.path.join(dist_path, "index.html"))
