# Audio App Backend API

## Base URL

`http://localhost:5001`

## Authentication

Most endpoints require authentication via JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Audio Categories

The `category` field for audio files must be one of the following pre-set values:

- `Music`
- `Recording`
- `Sound`
- `Other`

## Endpoints

### Authentication

#### POST /api/auth/login

Login with username and password.

**Request Body:**

```json
{
  "username": "admin",
  "password": "password123"
}
```

**Response:**

```json
{
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "username": "admin"
  }
}
```

### Users

#### POST /api/users

Create a new user.

**Request Body:**

```json
{
  "username": "newuser",
  "password": "password123"
}
```

#### GET /api/users/me

Get current user profile with audio files.

**Headers:** `Authorization: Bearer <token>`

**Response:**

```json
{
  "id": 1,
  "username": "admin",
  "audios": [
    {
      "id": 1,
      "filename": "audio.mp3",
      "description": "My audio file",
      "category": "Music",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### PUT /api/users/:id

Update user profile.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**

```json
{
  "username": "newusername",
  "password": "newpassword"
}
```

#### DELETE /api/users/:id

Delete user account.

**Headers:** `Authorization: Bearer <token>`

### Audio

#### POST /api/audio/upload

Upload an audio file.

**Headers:** `Authorization: Bearer <token>`

**Request:** Multipart form data

- `audio`: Audio file (MP3, WAV, OGG)
- `description`: Audio description (optional)
- `category`: Audio category (must be one of the pre-set values above)

**Response:**

```json
{
  "message": "Audio uploaded successfully",
  "audio": {
    "id": 1,
    "filename": "1234567890-123456789.mp3",
    "description": "My audio file",
    "category": "Music",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### GET /api/audio

List all audio files for the current user.

**Headers:** `Authorization: Bearer <token>`

**Response:**

```json
[
  {
    "id": 1,
    "filename": "1234567890-123456789.mp3",
    "description": "My audio file",
    "category": "Music",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### GET /api/audio/:id/play

Stream audio file for playback.

**Headers:** `Authorization: Bearer <token>`

**Response:** Audio file stream

#### DELETE /api/audio/:id

Delete an audio file.

**Headers:** `Authorization: Bearer <token>`

**Response:**

```json
{
  "message": "Audio deleted successfully"
}
```

## Error Responses

All endpoints return error responses in this format:

```json
{
  "message": "Error description"
}
```

Common HTTP status codes:

- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Internal Server Error
