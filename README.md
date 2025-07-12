## TL;DL
### 🎧 "Do I REALLY need to Listen to This Podcast?" - Because Life's Too Short for 3-Hour Rants About Coffee Beans

**Perfect for:**
- People with jobs (and lives)
- Anyone who's ever fallen asleep 15 minutes into a 3-hour episode
- Those who want to sound smart at dinner parties without the commitment

<img width="526" alt="Screenshot 2025-02-01 at 12 34 55 AM" src="https://github.com/user-attachments/assets/20f932de-c1bc-4cd1-8cdc-4b958fc91834" />

<img width="512" alt="Screenshot 2025-02-01 at 12 35 18 AM" src="https://github.com/user-attachments/assets/7eaad87e-d5ba-42a1-8632-873a1eae8e24" />

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