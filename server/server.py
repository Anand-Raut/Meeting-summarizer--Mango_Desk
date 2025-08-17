from google import genai
import os
from dotenv import load_dotenv

load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

DEFAULT_INSTRUCTION = (
    "You are an AI assistant that generates clear, professional meeting summaries. "
    "Rules:\n"
    "- Always remove filler words\n"
    "- Be concise and well-structured\n"
    "- Use short paragraphs or numbered points\n"

)

def summarize(transcript: str, instruction: str = ""):
    effective_instruction = DEFAULT_INSTRUCTION
    if instruction.strip():
        effective_instruction += f"\nCustom instruction: {instruction}"

    prompt = f"""
            Instruction:
            {effective_instruction}

            Transcript:
            {transcript}

            Summary:
            """
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )
    return response.text
