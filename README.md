# JobTrack 🚀

JobTrack is a full-stack job application tracking platform built to help job seekers discover job opportunities, view job details, apply for jobs, and manage their applications from a single platform.

The project is designed using a modern React frontend and a Java Spring Boot backend with MySQL as the database.

---

## 📌 Overview

Searching and applying for jobs across multiple platforms can become difficult to manage. JobTrack provides a centralized platform where users can:

- Create an account
- Login securely
- Search and browse jobs
- View detailed job information
- Apply for jobs
- Track job applications
- Manage their profile
- View application information through a dashboard
- Interact with an AI-powered chatbot

The application follows a full-stack architecture where the React frontend communicates with the Spring Boot backend through REST APIs.

---

## ✨ Features

### 👤 User Authentication

- User registration
- User login
- Secure password handling
- JWT-based authentication
- Protected routes
- Authentication-based access control

### 🔎 Job Search

- Browse available jobs
- Search for jobs
- View job information
- View individual job details
- Navigate between job listings and job detail pages

### 📄 Job Applications

- Apply for jobs
- Submit application information
- Track submitted applications
- View application status
- Manage applications from the dashboard

### 📊 Dashboard

The dashboard provides users with a centralized view of their job application activity.

Users can view:

- Applied jobs
- Application information
- Application status
- Personal job-search activity

### 👤 User Profile

Users can access and manage their profile information through the profile section.

### 🤖 AI Chatbot

JobTrack includes an AI-powered chatbot that can assist users with job and career-related questions.

The chatbot is connected to the backend and communicates through an API.

### 🔐 Security

The backend uses Spring Security and JWT authentication to protect secured endpoints and user information.

---

# 🛠️ Technologies Used

## Frontend

- React
- JavaScript
- Vite
- HTML5
- CSS3
- React Router

## Backend

- Java
- Spring Boot
- Spring Data JPA
- Spring Security
- JWT
- REST APIs
- Maven

## Database

- MySQL
- MySQL Connector/J

## AI

- OpenAI API
- OpenAI Java SDK

## Development Tools

- Visual Studio Code
- Eclipse
- MySQL Workbench
- Git
- GitHub
- Postman

---

# 🏗️ Project Architecture

```text
                     ┌─────────────────────┐
                     │      User / Browser │
                     └──────────┬──────────┘
                                │
                                ▼
                     ┌─────────────────────┐
                     │   React Frontend    │
                     │      (Vite)         │
                     └──────────┬──────────┘
                                │
                         REST API Requests
                                │
                                ▼
                     ┌─────────────────────┐
                     │ Spring Boot Backend │
                     │       (Java)        │
                     └──────────┬──────────┘
                                │
                 ┌──────────────┼──────────────┐
                 │              │              │
                 ▼              ▼              ▼
          ┌────────────┐ ┌────────────┐ ┌────────────┐
          │   MySQL    │ │    JWT     │ │  OpenAI    │
          │  Database  │ │   Security │ │    API     │
          └────────────┘ └────────────┘ └────────────┘
