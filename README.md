## TL;DL
### Get instant summaries and chat with your favorite podcasts

<img width="526" alt="Screenshot 2025-02-01 at 12 34 55 AM" src="https://github.com/user-attachments/assets/20f932de-c1bc-4cd1-8cdc-4b958fc91834" />

<img width="512" alt="Screenshot 2025-02-01 at 12 35 18 AM" src="https://github.com/user-attachments/assets/7eaad87e-d5ba-42a1-8632-873a1eae8e24" />

## Project Structure

```
.
├── frontend/          # Next.js frontend application
└── backend/          # FastAPI backend application
```

## Prerequisites

- Python 3.8+
- Node.js 18+
- npm or yarn
- OpenAI API key

## Backend Setup

1. Create a virtual environment and activate it:

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Create a `.env` file in the backend directory with your OpenAI API key:

```
OPENAI_API_KEY=your_api_key_here
```

4. Start the backend server:

```bash
uvicorn app.main:app --reload
```

The backend will run on `http://localhost:8000`

## Frontend Setup

1. Install dependencies:

```bash
cd frontend
npm install
# or
yarn install
```

2. Start the development server:

```bash
npm run dev
# or
yarn dev
```

The frontend will run on `http://localhost:3000`

## Features

- Quick podcast summaries
- Key takeaways extraction
- Interactive chat about the podcast content
- Modern UI with Tailwind CSS
- Dark mode support

## Tech Stack

### Frontend
- Next.js 15.1
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui components

### Backend
- FastAPI
- OpenAI API
- Python 3.8+
- Various NLP libraries (see requirements.txt)

## Development Notes

- The frontend uses Turbopack for faster development builds (reference: `frontend/package.json`, lines 6-9)
- CORS is enabled on the backend for development (reference: `backend/app/main.py`, lines 16-22)
- The project uses the Geist font family (reference: `frontend/app/layout.tsx`, lines 5-13)

## API Documentation

Once the backend is running, you can access the API documentation at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Deployment

### Frontend
The frontend can be deployed on Vercel (reference: `frontend/README.md`, lines 32-36)

### Backend
The backend can be deployed on any platform that supports Python applications. Make sure to:
1. Set up environment variables
2. Configure CORS for production
3. Use a production-grade ASGI server like Uvicorn or Gunicorn

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
