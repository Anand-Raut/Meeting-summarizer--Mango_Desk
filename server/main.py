from fastapi import FastAPI
from pydantic import BaseModel
from server import summarize
app = FastAPI()

class SummarizeRequest(BaseModel):
    transcript: str
    instruction: str

@app.get("/index")
def index():
    return {"IsRunning" : True}

@app.post("/summarize")
def generate_summary(req: SummarizeRequest):
    summary = summarize(req.transcript, req.instruction)
    return {"summary": summary}
