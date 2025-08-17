from fastapi import FastAPI
from pydantic import BaseModel
from server import summarize
from fastapi.middleware.cors import CORSMiddleware
import smtplib
from email.mime.text import MIMEText
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


@app.get("/")
def index():
    return {"IsRunning": True}

@app.post("/summarize")
def generate_summary(req: SummarizeRequest):
    summary = summarize(req.transcript, req.instruction)
    return {"summary": summary}

