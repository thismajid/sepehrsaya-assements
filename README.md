# Sepehrsaya Assessments

This project is an Express.js application with MongoDB integration, featuring user management and authentication.

## Features

- User CRUD operations
- Authentication with JWT
- MongoDB database integration
- Docker containerization
- API documentation with Swagger

## Prerequisites

- Docker and Docker Compose
- Node.js (for local development)
- MongoDB (for local development without Docker)

## Getting Started (With Docker)

1. Clone the repository:

```bash
git clone https://github.com/thismajid/sepehrsaya-assessments
```

2. Navigate to the project directory:

```bash
cd sepehrsaya-assessments
```

3. Start project:

```bash
docker-compose up
```

4. Open this url on browser:

```bash
http://localhost:3000/api/v1/docs
```

## Running the Project Without Docker

To run this project locally without using Docker, follow these steps:

1. Ensure you have Node.js and npm installed on your system. You can download them from [nodejs.org](https://nodejs.org/).

2. Make sure you have MongoDB installed and running on your local machine. If not, you can download it from [mongodb.com](https://www.mongodb.com/try/download/community).

3. Clone the repository:

```bash
git clone https://github.com/thismajid/sepehrsaya-assessments
```

4. Navigate to the project directory:

```bash
cd sepehrsaya-assessments
```

5. Install the project dependencies:

```bash
npm install
```

6. Create a `.env` file in the root directory of the project. You can copy the `.env.example` file and modify it as needed:

```bash
cp .env.example .env
```

7. Open the `.env` file and update the `MONGODB_URL` to point to your local MongoDB instance:

```bash
MONGODB_URL=mongodb://localhost:27017/sepehrsaya
```

8. Start the server

```bash
npm start
```

 9. The server should now be running. By default, it will be available at:

```bash
http://localhost:3000/api/v1/docs
```

## API Endpoints

- POST /api/v1/auth/login - User login
- GET /api/v1/users - Get all users
- GET /api/v1/users/:id - Get a specific user
- PATCH /api/v1/users/:id - Update a user
- DELETE /api/v1/users/:id - Delete a user

For detailed API documentation, refer to the Swagger docs at `/api/v1/docs`.
