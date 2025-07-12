# app/routes.py
import os
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Union

# LangChain & related imports
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.vectorstores import FAISS
from langchain.chains import RetrievalQA
from langchain_community.document_loaders.blob_loaders.youtube_audio import (
    YoutubeAudioLoader,
)
from langchain_community.document_loaders.generic import GenericLoader
from langchain_community.document_loaders.parsers.audio import (
    OpenAIWhisperParser,
    OpenAIWhisperParserLocal,
)

local = False

router = APIRouter()

# Request body model for our summarization endpoint
class SummarizeRequest(BaseModel):
    youtube_url: str
    # Optional: allow a custom query; otherwise, we use a default summary prompt.
    query: str = "Provide a summary of this podcast focusing on the guest's background."

# Cache to store processed vector databases
url_to_vectordb = {}

def get_cached_vectordb(youtube_url: str) -> Union[FAISS, None]:
    """Retrieve cached vector database for a given URL."""
    return url_to_vectordb.get(youtube_url)

def cache_vectordb(youtube_url: str, vectordb: FAISS) -> None:
    """Cache vector database for a given URL."""
    url_to_vectordb[youtube_url] = vectordb

@router.post("/summarize")
async def summarize_podcast(request: SummarizeRequest):
    print(request)
    # Ensure the OpenAI API key is available
    openai_api_key = os.getenv("OPENAI_API_KEY")
    if not openai_api_key:
        raise HTTPException(status_code=500, detail="OpenAI API key not configured in environment.")

    try:
        # Check if we have a cached vector database for this URL
        vectordb = get_cached_vectordb(request.youtube_url)
        
        if vectordb is None:
            urls = [request.youtube_url]
            save_dir = "~/Downloads/YouTube"

            # Transcribe the videos to text
            if local:
                loader = GenericLoader(
                    YoutubeAudioLoader(urls, save_dir), OpenAIWhisperParserLocal()
                )
            else:
                loader = GenericLoader(YoutubeAudioLoader(urls, save_dir), OpenAIWhisperParser())
            
            docs = loader.load()
            combined_docs = [doc.page_content for doc in docs]
            text = " ".join(combined_docs)

            # Split the text into chunks
            text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
            splits = text_splitter.split_text(text)

            # Create embeddings
            embeddings = OpenAIEmbeddings(openai_api_key=openai_api_key)
            vectordb = FAISS.from_texts(splits, embeddings)
            
            # Cache the vector database
            cache_vectordb(request.youtube_url, vectordb)

        # Build a QA chain
        qa_chain = RetrievalQA.from_chain_type(
            llm=ChatOpenAI(model="gpt-3.5-turbo", temperature=0),
            chain_type="stuff",
            retriever=vectordb.as_retriever(),
        )

        summary = qa_chain.run(request.query)
        return {"summary": summary}
    
    except Exception as e:
        print(e)
        # For debugging and production, you might want to log the error.
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/")
async def read_root():
    return {"message": "Welcome to the YouTube Podcast Summarizer API"}