# Sup'Learn - Complete Setup Guide

## 🎯 Project Overview
Sup'Learn is an academic resource hub built with Angular + Spring Boot for engineering students to share and access educational materials.

## 📋 Prerequisites

### Required Software
1. **Java JDK 11 or higher** - [Download](https://www.oracle.com/java/technologies/javase-downloads.html)
2. **Node.js 14+ and npm** - [Download](https://nodejs.org/)
3. **MySQL 8.0+** - [Download](https://dev.mysql.com/downloads/mysql/)
4. **Maven 3.6+** (or use included Maven wrapper)
5. **Angular CLI** - Install via: `npm install -g @angular/cli`

## 🗄️ Database Setup

### 1. Install and Start MySQL
Ensure MySQL is running on your system.

### 2. Create Database
```sql
CREATE DATABASE suplearn_db;
```

### 3. Configure Database Credentials
Edit `suplearn-backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/suplearn_db?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD_HERE
```

## 🚀 Backend Setup (Spring Boot)

### 1. Navigate to Backend Directory
```cmd
cd suplearn-backend
```

### 2. Build the Project
```cmd
mvnw.cmd clean install
```

### 3. Run the Backend
```cmd
mvnw.cmd spring-boot:run
```

The backend will start on **http://localhost:8080**

### Verify Backend is Running
Open http://localhost:8080/api/resources/public in your browser (should return an empty array or resources)

## 🎨 Frontend Setup (Angular)

### 1. Navigate to Project Root
```cmd
cd ..
```

### 2. Install Dependencies
```cmd
npm install
```

### 3. Run the Frontend
```cmd
ng serve
```

The frontend will start on **http://localhost:4200**

### Open Application
Navigate to **http://localhost:4200** in your browser

## 👥 Initial Data Setup

### Create Admin User
Use Postman or any REST client to send a POST request:

**Endpoint:** `POST http://localhost:8080/api/auth/register`

**Body (JSON):**
```json
{
  "username": "admin",
  "email": "admin@suplearn.com",
  "password": "admin123",
  "firstName": "Admin",
  "lastName": "User",
  "role": "ADMIN",
  "phoneNumber": ""
}
```

### Create Test Data (Optional)
You can create:
- Years (1st, 2nd, 3rd)
- Modules (Computer Science, Mathematics, etc.)
- Subjects (Algorithms, Calculus, etc.)

Via API calls or directly in the database.

## 🔧 Project Structure

```
suplearn/
├── suplearn-backend/          # Spring Boot backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/suplearn/
│   │   │   │   ├── model/           # Entity classes
│   │   │   │   ├── repository/      # Data access layer
│   │   │   │   ├── service/         # Business logic
│   │   │   │   ├── controller/      # REST API endpoints
│   │   │   │   └── security/        # Security configuration
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   ├── pom.xml
│   └── mvnw.cmd
│
├── src/                       # Angular frontend
│   ├── app/
│   │   ├── components/        # UI components
│   │   ├── services/          # HTTP services
│   │   ├── models/            # TypeScript interfaces
│   │   ├── guards/            # Route guards
│   │   └── app.module.ts
│   ├── environments/
│   ├── assets/
│   └── index.html
│
├── angular.json
├── package.json
└── README.md
```

## 🎯 Key Features

### For Everyone (No Login Required)
- ✅ Browse and search resources
- ✅ Upload resources (pending admin approval)
- ✅ Download resources
- ✅ View ratings and comments
- ✅ Filter by Year → Module → Subject → Type

### For Students (After Login)
- ✅ Take quizzes (Google Forms integration)
- ✅ Track learning progress
- ✅ Create revision schedules
- ✅ Sync with calendar apps
- ✅ Rate and comment on resources

### For Professors
- ✅ Upload verified content
- ✅ Create and manage quizzes
- ✅ View student progress

### For Admins
- ✅ Approve/reject uploaded resources
- ✅ Manage users
- ✅ Moderate comments

## 🌐 API Endpoints

### Public Endpoints
- `GET /api/resources/public` - Get all approved resources
- `GET /api/resources/view/{id}` - Get resource details
- `POST /api/resources/upload/anonymous` - Upload resource
- `GET /api/resources/search?keyword=...` - Search resources
- `GET /api/resources/download/{id}` - Download resource

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login

### Student Endpoints (Requires Auth)
- `GET /api/progress/user/statistics` - Get progress statistics
- `GET /api/schedule/user` - Get user schedules
- `POST /api/quizzes/attempt` - Record quiz attempt

## 🔐 Default User Roles

1. **STUDENT** - Access to quizzes, progress tracking, schedules
2. **PROFESSOR** - Upload content, create quizzes
3. **ADMIN** - Approve content, manage users

## 🐛 Troubleshooting

### Backend Issues
- **Port 8080 already in use:** Change port in `application.properties`
- **Database connection failed:** Verify MySQL is running and credentials are correct
- **Build failed:** Ensure Java 11+ is installed

### Frontend Issues
- **npm install fails:** Try `npm install --legacy-peer-deps`
- **Port 4200 already in use:** Run `ng serve --port 4300`
- **CORS errors:** Verify backend CORS configuration

## 📚 Next Steps

1. **Add sample data** via API or database
2. **Create academic hierarchy** (Years, Modules, Subjects)
3. **Upload test resources**
4. **Test user registration and login**
5. **Explore dashboard features**

## 🤝 Contributing

This project was created as an academic resource sharing platform. Feel free to:
- Add new features
- Improve UI/UX
- Fix bugs
- Add documentation

## 📄 License

MIT License - Feel free to use for educational purposes

## 📞 Support

For questions or issues, refer to the codebase or create an issue in your repository.

---

**Happy Learning! 📖**
