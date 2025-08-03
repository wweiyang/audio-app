# Audio Hosting App

This project is an audio hosting app that allows users to upload audio files, view their uploaded audio files, and select them to playback. It also includes account management features like creating, updating and deleting of account.

Please follow the instructions below to set up the project with Docker. A [default username and password are also provided](##default-credentials) below, so that you can log in without creating an account. Dockerfiles are also located in their respective folders (`backend` and `frontend`).

## Setup instructions (with Docker)

Note: As this project was developed on macOS, some commands might not work properly on Windows. I have tried to include the equivalent commands.

### 1. Prerequisites

- Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- Install [Postman](https://www.postman.com/downloads/) (if want to do API testing)

### 2. Clean Up Old Containers (recommended, or do this step if you encounter issues running Docker)

If you have run this project before, clean up old containers and volumes:

```
docker-compose down -v
```

If you still face issues building and starting Docker, try cleaning up all unused Docker resources:

```
docker system prune -af
```

### 3. Build and Start All Services

```
docker-compose up --build
```

This will start the database, backend, and frontend containers.

### 4. Run Database Migrations

Open a new terminal and run:

```
docker-compose exec backend npx prisma migrate dev --name init
```

This will create the required tables in the database.

⚠️ On Windows:

- If `docker-compose exec` doesn't work, try using:

  ```
  docker exec -it <backend-container-name> npx prisma migrate dev --name init
  ```

- To find container name, you can use:
  ```
  docker ps
  ```

### 5. Access the App

- **Frontend:** [http://localhost:8080](http://localhost:8080)
- **Backend API:** [http://localhost:5001](http://localhost:5001)
- **Database:** localhost:7001 (PostgreSQL)

### Optional: Test the API with Postman

- Import the provided `audio-app-backend.postman_collection.json` file into Postman.
- Use the "Auth - Login" request first. Copy the `token` from the response and set it as the `token` variable in the collection.
- You should then be able to test all endpoints (user management, audio upload, etc.).

---

## Default Credentials

You can use this default username and password to log in:

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

---

## System architecture

The project consists of 3 main parts: frontend, backend and database

![System Architecture](./system-architecture.svg)
Note: A PNG copy of the diagram is also included in the root folder, for easy viewing.

### Technology Stack

#### Frontend

- **Framework**: React
- **Build Tool**: Vite
- **UI Library**: Ant Design
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Styling**: SCSS with CSS Modules
- **Language**: TypeScript

#### Backend

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database ORM**: Prisma
- **Authentication**: JWT (jsonwebtoken)
- **File Upload**: Multer
- **Password Hashing**: bcryptjs
- **CORS**: cors

#### Database

- **Database**: PostgreSQL

#### Infrastructure

- **Containerization**: Docker & Docker Compose
- **Web Server**: Nginx (for serving frontend)
