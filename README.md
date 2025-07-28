# Audio Hosting App

## Quick Start

1. **Clone the repo**
2. **Run:**
   ```bash
   docker-compose up --build
   ```
3. **Access:**
   - Frontend: [http://localhost:8080](http://localhost:8080)
   - Backend: [http://localhost:5001](http://localhost:5001)
   - DB: localhost:7000

## Default Credentials

- Username: `admin`
- Password: `password123`

## API Docs

See `/backend/README.md` for API endpoints.

## Development

- To run backend locally:  
  `cd backend && npm install && npx prisma generate && npm run dev`
- To run frontend locally:  
  `cd frontend && npm install && npm run dev`
