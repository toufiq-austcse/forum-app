## Forum Application

> A Microservice based application built with Nest.js

### Architecture
Backend consist of 2 services
- Auth Service - responsible for login, sign-up, token validation, user management
- Post Service- responsible for post, like & comment management

### Technologies
- Auth Service - Node.js, Nest.js, MongoDB
- Post Service- Node.js, Nest.js, MySQL
- Github Actions
- Docker
- DockerHub

### Installation

- Clone this repository to your local machine
- Execute `cp be/auth-service/.env.example be/auth-service/.env && cp be/post-service/.env.example be/post-service/.env`
- Execute `docker compose up -d`
- Hit http://localhost:3001/api-doc for Auth Service API Documentation
- Hit http://localhost:3000/api-doc for Post Service API Documentation