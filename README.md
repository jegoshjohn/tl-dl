## TL;DL
### 🎧 "Do I REALLY need to Listen to This Podcast?" - Because Life's Too Short for 3-Hour Rants About Coffee Beans

**Perfect for:**
- People with jobs (and lives)
- Anyone who's ever fallen asleep 15 minutes into a 3-hour episode
- Those who want to sound smart at dinner parties without the commitment

<img width="927" height="372" alt="Screenshot 2025-07-12 at 1 01 56 PM" src="https://github.com/user-attachments/assets/9d04dc17-6ac9-4035-952b-9acc6e120aa5" />


## Project Structure

```
.
├── frontend/          # Next.js frontend application
└── backend/          # FastAPI backend application
```

## Prerequisites

- Python 3.8+, Node.js 18+, npm/yarn
- OpenAI API key

## Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create `.env` file:
```
OPENAI_API_KEY=your_api_key_here
```

Start server:
```bash
uvicorn app.main:app --reload
```

Runs on `http://localhost:8000`

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Runs on `http://localhost:3000`

## Features

- Quick podcast summaries & key takeaways
- Interactive chat about podcast content
- Modern UI with Tailwind CSS & dark mode

## Tech Stack

**Frontend:** Next.js 15.1, React 19, TypeScript, Tailwind CSS, shadcn/ui  
**Backend:** FastAPI, OpenAI API, Python 3.8+

## API Documentation

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`
