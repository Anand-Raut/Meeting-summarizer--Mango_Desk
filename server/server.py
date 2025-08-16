from google import genai
import os
from dotenv import load_dotenv

load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def summarize(transcript: str, instruction: str):
    prompt = f"""{instruction}

Transcript:
{transcript}
"""
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )
    return response.text

# test
print(summarize(
    transcript="Alice talked about budget. Bob listed tasks for Q3. Charlie asked about deadlines.",
    instruction="Summarize in 3 bullet points with focus on action items."
))
