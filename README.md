Full Stack Auth Application (CodeIgniter 4 + React)
This project is a complete full-stack web application featuring a CodeIgniter 4 REST API for the backend and a React.js single-page application for the frontend. It demonstrates user registration, token-based (JWT) authentication, and protected data fetching with a clean, modern UI.

✨ Features
Secure User Authentication: Full Register and Login functionality.

Token-Based API: Uses JSON Web Tokens (JWT) to secure API endpoints.

1-to-1 Database Relationship: Demonstrates a relationship between a users table and a teachers profile table.

CRUD Functionality: A single API endpoint to create user and teacher profiles simultaneously.

Data Visualization: Protected pages display user and teacher data in sortable, filterable data tables.

Responsive UI: A clean and creative user interface built with React.

Separated Concerns: Independent backend API and frontend client for better scalability and maintenance.

🛠️ Technology Stack
Backend (API)
PHP (v8.1+)

CodeIgniter 4

MySQL

Composer

JSON Web Tokens (JWT)

Frontend (Client)
React.js (v18+)

React Router

Axios

MUI Datatables

Node.js & npm


Getting Started
To get this project up and running on your local machine, follow the steps below.

Prerequisites
Make sure you have the following software installed:

XAMPP or WAMP (for Apache & MySQL)

Composer (getcomposer.org)

Node.js and npm (nodejs.org)

⚙️ 1. Backend Setup (ci4-auth-api)
Clone the Repository

Bash

git clone <your-backend-repo-url>
cd ci4-auth-api
Install Dependencies

Bash

composer install
Configure Environment

Rename the env file to .env.

Update the .env file with your database credentials (DB_USERNAME, DB_PASSWORD) and set a unique jwt.secret.

Setup Database

Start Apache and MySQL from your XAMPP/WAMP control panel.

Open phpMyAdmin and create a new database named ci4_react_auth.

Import the schema from the database/database_dump.sql file into your new database.

Start the API Server

Bash

php spark serve
The backend API will be running on http://localhost:8080.

🖥️ 2. Frontend Setup (react-auth-client)
Clone the Repository

Bash

git clone <your-frontend-repo-url>
cd react-auth-client
Install Dependencies

Bash

npm install
Start the Application

Bash

npm start
The React application will open in your browser at http://localhost:3000. You can now register and log in.

📋 API Endpoints
The base URL for the API is http://localhost:8080/api.

Method	Endpoint	Description	Protected
POST	/register	Creates a new user and a related teacher profile.	No
POST	/login	Authenticates a user and returns a JWT token.	No
GET	/teachers	Fetches a joined list of all teachers and users.	Yes
GET	/users	Fetches a list of all users from auth_user.	Yes
