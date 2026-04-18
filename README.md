# 🎓 EduCore Backend System

🚀 A scalable and modular backend system for a Learning Management Platform (LMS), built using Node.js and Express.js.

This project handles user authentication, course management, and student progress tracking using clean architecture and RESTful APIs.

---
## 📌 Project Overview

EduCore Backend System is designed to simulate a real-world backend for an educational platform.

### 🔹 Key Highlights

* 🔐 Secure Authentication & Authorization
* 📚 Course Management System
* 📊 Student Progress Tracking
* ⚡ Optimized API Performance
* 🧱 Scalable and Maintainable Code Structure

---

## 🛠️ Tech Stack

* 🟢 **Node.js** – Backend runtime
* 🚂 **Express.js** – Web framework
* 🍃 **MongoDB** – Database
* 🔑 **JWT (JSON Web Token)** – Authentication
* 🧪 **Postman** – API testing
* ☁️ **Render** – Deployment

---

## 🌐 Base API URL

👉 **https://lms-backend-sd0y.onrender.com/api/users**

---

## 🔐 Authentication APIs

| Method | Endpoint       | Description                |
| ------ | -------------- | -------------------------- |
| POST   | /auth/register | Register new user          |
| POST   | /auth/login    | Login user and get token   |
| GET    | /auth/profile  | Get logged-in user profile |

### 📥 Sample Request (Register)

```json
{
  "name": "Suresh",
  "email": "suresh@gmail.com",
  "password": "123456",
  "role": "student"
}
```

---

## 👤 User Management APIs

| Method | Endpoint   | Description           |
| ------ | ---------- | --------------------- |
| GET    | /users     | Get all users (Admin) |
| GET    | /users/:id | Get user by ID        |
| PUT    | /users/:id | Update user           |
| DELETE | /users/:id | Delete user           |

---

## 📚 Course Management APIs

| Method | Endpoint     | Description               |
| ------ | ------------ | ------------------------- |
| POST   | /courses     | Create new course (Admin) |
| GET    | /courses     | Get all courses           |
| GET    | /courses/:id | Get course details        |
| PUT    | /courses/:id | Update course             |
| DELETE | /courses/:id | Delete course             |

### 📥 Sample Course Object

```json
{
  "title": "Data Structures",
  "description": "Learn DSA concepts",
  "instructor": "John Doe"
}
```

---

## 📊 Enrollment & Progress APIs

| Method | Endpoint            | Description        |
| ------ | ------------------- | ------------------ |
| POST   | /enroll             | Enroll in a course |
| GET    | /progress/:userId   | Get user progress  |
| PUT    | /progress/:courseId | Update progress    |

---

## 🧱 Project Structure

```bash
EduCore/
│
├── controllers/
├── models/
├── routes/
├── middleware/
├── config/
├── server.js
```

---

## ⚙️ Installation & Setup

```bash
git clone https://github.com/Suresh021/EduCore-Backend-System.git
cd educore-backend
npm install
npm start
```

---

## 🔑 Environment Variables

Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

---

## 🧪 Testing APIs

Use **Postman**:

```
Authorization: Bearer <your_token>
```

---

## 🚀 Features

* ✅ Secure JWT Authentication
* ✅ Role-Based Access Control (Admin/Student)
* ✅ RESTful API Design
* ✅ Error Handling & Validation
* ✅ Scalable Backend Architecture

---

## 🐞 Error Handling

* Proper HTTP status codes
* Centralized error middleware
* Input validation

---

## 📈 Future Improvements

* ⚡ Redis caching
* 📧 Email notifications
* 📊 Analytics dashboard
* 🧵 Background jobs

---

## 🤝 Contribution

Feel free to fork and contribute.

---

## 📬 Contact

👤 Suresh Kumar
📧 [ssc760951@gmail.com]

---

⭐ If you like this project, give it a star!
