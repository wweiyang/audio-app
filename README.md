# Audio Hosting App

## Quick Start (with Docker)

### 1. Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed
- [Postman](https://www.postman.com/downloads/) (for API testing)

### 2. Clean Up Old Containers (Recommended, or run if encounter issues running Docker)

If you have run this project before, clean up old containers and volumes:

```
docker-compose down -v
docker system prune -af
```

### 3. Build and Start All Services

```
docker-compose up --build
```

- This will start the database, backend, and frontend containers.

### 4. Run Database Migrations

Open a new terminal and run:

```
docker-compose exec backend npx prisma migrate dev --name init
```

- This will create the required tables in the database.

### 5. Test the API with Postman

- Import the provided `audio-app-backend.postman_collection.json` file into Postman.
- Use the "Auth - Login" request first. Copy the `token` from the response and set it as the `token` variable in the collection.
- You can now test all endpoints (user management, audio upload, etc.).

### 6. Access the App

- **Frontend:** [http://localhost:8080](http://localhost:8080)
- **Backend API:** [http://localhost:5001](http://localhost:5001)
- **Database:** localhost:7001 (PostgreSQL)

---

## Default Credentials

- Username: `admin`
- Password: `password123`

## API Docs

See `/backend/README.md` for API endpoints and details.

## Development (For development only)

- To run backend locally:
  ```
  cd backend
  npm install
  npx prisma generate
  npm run dev
  ```
- To run frontend locally:
  ```
  cd frontend
  npm install
  npm run dev
  ```
