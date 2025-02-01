# backend/app/main.py

from fastapi import FastAPI
from app.routes import router
from openai import OpenAI
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

import os

app = FastAPI(title="YouTube Podcast Summarizer API")



# Configure allowed origins, methods, headers, etc.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with a list of allowed origins in production
    allow_credentials=True,
    allow_methods=["*"],  # This will allow all HTTP methods including OPTIONS
    allow_headers=["*"],
)

# Include your routes
app.include_router(router)

load_dotenv()
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)