# 🎓 Sup'Learn - Academic Resource Hub

> **Your comprehensive platform for sharing and accessing engineering academic materials**

[![Made with Spring Boot](https://img.shields.io/badge/Spring%20Boot-2.7-green.svg)](https://spring.io/projects/spring-boot)
[![Made with Angular](https://img.shields.io/badge/Angular-14-red.svg)](https://angular.io/)
[![Database MySQL](https://img.shields.io/badge/MySQL-8.0-blue.svg)](https://www.mysql.com/)

## 🎯 What is Sup'Learn?

Sup'Learn is a **full-stack web application** designed for engineering students to:
- 📚 Share and access **courses, old exams, projects, and coursework**
- 🎯 Take **quizzes** and track learning progress
- 📅 Create **revision schedules** with calendar integration
- 💬 Rate and comment on resources
- 🔐 **No authentication required** for browsing and downloading!

## ✨ Key Features

| Feature | Guest | Student | Professor | Admin |
|---------|-------|---------|-----------|-------|
| Browse & Download Resources | ✅ | ✅ | ✅ | ✅ |
| Upload Resources | ✅* | ✅* | ✅ | ✅ |
| Take Quizzes | ❌ | ✅ | ✅ | ✅ |
| Progress Tracking | ❌ | ✅ | ❌ | ✅ |
| Create Quizzes | ❌ | ❌ | ✅ | ✅ |
| Approve Content | ❌ | ❌ | ❌ | ✅ |

*Requires admin approval

## 🚀 Quick Start

**Choose your path:**

### 🏃 I Want to Run It Now!
👉 **[QUICKSTART.md](QUICKSTART.md)** - 5 minutes to running app

### 📖 I Want Full Setup Guide
👉 **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Complete installation instructions

### 💻 I Want to Develop/Extend
👉 **[FEATURES_TODO.md](FEATURES_TODO.md)** - Implementation guide & roadmap

## ⚡ Super Quick Start

```bash
# 1. Create database
mysql -u root -p
CREATE DATABASE suplearn_db;

# 2. Start backend
cd suplearn-backend
mvnw.cmd spring-boot:run

# 3. Start frontend (new terminal)
npm install
ng serve --open

# 4. Open http://localhost:4200
```

**Default Login:** `admin` / `admin123`

## 🏗️ Technology Stack

### Backend
- **Framework:** Spring Boot 2.7
- **Database:** MySQL 8.0
- **Security:** Spring Security (JWT ready)
- **Build Tool:** Maven

### Frontend  
- **Framework:** Angular 14
- **Styling:** Bootstrap 5
- **HTTP Client:** RxJS
- **Routing:** Angular Router with Guards

## 📊 Resource Organization

Resources are organized hierarchically:

```
📚 Year (1st, 2nd, 3rd Engineering)
  └─ 📖 Module (Computer Science, Mathematics, etc.)
      └─ 📝 Subject (Algorithms, Calculus, etc.)
          └─ 📄 Type
              ├─ 📗 Course Materials
              ├─ 📝 Old Exams
              ├─ 💻 Projects
              └─ 📋 Coursework (TD)

## API Endpoints

### Public Endpoints (No Auth)
- `GET /api/resources` - Get all approved resources
- `GET /api/resources/{id}` - Get resource details
- `POST /api/resources/upload` - Upload resource (pending approval)
- `GET /api/resources/search` - Search resources

### Student Endpoints (Auth Required)
- `GET /api/quizzes` - Get available quizzes
- `POST /api/progress/track` - Track progress
- `GET /api/progress/stats` - Get progress statistics
- `POST /api/schedule` - Create revision schedule
- `POST /api/resources/{id}/rate` - Rate resource
- `POST /api/resources/{id}/comment` - Comment on resource

### Professor Endpoints
- `POST /api/professor/resources` - Upload verified content
- `POST /api/professor/quizzes` - Create quiz
- `GET /api/professor/students/progress` - View student progress

### Admin Endpoints
- `GET /api/admin/resources/pending` - Get pending resources
- `PUT /api/admin/resources/{id}/approve` - Approve resource
- `DELETE /api/admin/resources/{id}` - Delete resource
- `GET /api/admin/users` - Manage users

## Database Schema
- **Users** - User accounts (students, professors, admins)
- **Resources** - Academic materials
- **Modules** - Academic modules
- **Subjects** - Course subjects
- **Quizzes** - Quiz information and Google Forms links
- **Progress** - Student progress tracking
- **Schedules** - Revision schedules
- **Ratings** - Resource ratings
- **Comments** - Resource comments

## Future Enhancements
- AI-generated quizzes based on course material
- Advanced analytics dashboard
- Mobile application
- Real-time collaboration features
- Discussion forums

## License
MIT License

## Contributors
Created as an academic resource sharing platform for engineering students.
