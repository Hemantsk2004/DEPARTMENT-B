# CampusLink X Backend

Backend API: https://campuslinkx-backend.onrender.com

CampusLink X Backend serves as the core infrastructure powering the CampusLink X platform. It provides secure authentication, role-based access control, course management, portfolio management, AI-powered learning assistance, real-time study rooms, opportunity management, and academic collaboration services.

Built using Node.js, Express.js, TypeScript, MongoDB, and Socket.IO, the backend is designed to support scalable educational environments while delivering a seamless experience for students, lecturers, and administrators.

## Key Features

### Authentication and Authorization

Secure JWT-based authentication with role-based access control for Students, Lecturers, and Administrators. Passwords are encrypted using industry-standard hashing techniques and protected routes ensure secure access to platform resources.

### User Management

Manage user accounts, profiles, roles, and personal information across the platform.

### Course Management

Create, update, manage, and enroll users into courses while maintaining structured academic content and learning resources.

### Study Materials

Upload, store, and distribute academic materials, notes, and learning resources to enrolled students.

### AI Study Assistant

Integrates AI-powered note analysis and summarization capabilities, allowing students to generate concise summaries, key concepts, and revision notes from uploaded content.

### Real-Time Study Rooms

Powered by Socket.IO, enabling live communication and collaborative discussions between students within course-specific study rooms.

### Opportunities Management

Manage internships, hackathons, placements, and other career opportunities available to students.

### Portfolio Management

Supports student portfolios including project showcases, skill listings, resumes, profile images, GitHub links, and LinkedIn profiles.

### Assignments and Submissions

Assignment creation, submission tracking, grading workflows, and academic progress management.

### Notifications System

Provides timely updates regarding assignments, opportunities, announcements, and course activities.

## Technology Stack

Runtime Environment: Node.js

Framework: Express.js

Programming Language: TypeScript

Database: MongoDB

ODM: Mongoose

Authentication: JWT

Password Security: bcryptjs

Real-Time Communication: Socket.IO

File Uploads: Multer

PDF Processing: PDF Parse

AI Integration: Google Gemini API

Environment Management: dotenv

## API Modules

Authentication

/api/auth

Users

/api/users

Courses

/api/courses

Materials

/api/materials

Portfolio

/api/portfolio

Opportunities

/api/opportunities

Announcements

/api/announcements

Lectures

/api/lectures

Assignments

/api/assignments

Submissions

/api/submissions

Notifications

/api/notifications

Study Rooms

/api/study-rooms

AI Services

/api/ai

## Project Structure

src/
├── controllers/
├── routes/
├── models/
├── middlewares/
├── services/
├── sockets/
├── uploads/
├── config/
└── app.ts

## Installation and Setup

Clone the repository:

git clone <backend-repository-url>

Install dependencies:

npm install

Create a .env file:

PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key

FRONTEND_URL=http://localhost:3000

BACKEND_URL=http://localhost:5000

Start the development server:

npm run dev

Build the application:

npm run build

Run the production build:

npm start

## Deployment

The backend is deployed on Render and provides REST APIs and Socket.IO services to the CampusLink X frontend application.

## Architecture Overview

Client Application (Next.js Frontend)

↓

REST APIs (Express.js)

↓

MongoDB Database

↓

Socket.IO Real-Time Communication

↓

AI Processing with Google Gemini

This architecture enables secure user management, scalable course operations, collaborative study environments, and AI-enhanced learning experiences.

## Future Enhancements

Video Lecture Management

Attendance Tracking System

Discussion Forums

Peer-to-Peer Learning Features

Advanced Analytics Dashboard

Institution-Level Administration

Course Progress Tracking

In-App Messaging System

## Author

Hemant Singh Kanwal

CampusLink X Backend was developed as part of a full-stack academic collaboration platform aimed at improving learning, communication, academic management, and career development within educational institutions.
