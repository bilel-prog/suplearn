# 🚀 Sup'Learn - Quick Start Guide

## ⚡ 5-Minute Setup

### Prerequisites Check
```cmd
java -version        # Should show Java 11+
node -v             # Should show Node 14+
npm -v              # Should show npm 6+
mysql --version     # Should show MySQL 8+
```

### Step 1: Database (2 minutes)
```cmd
# Open MySQL
mysql -u root -p

# Create database
CREATE DATABASE suplearn_db;

# Import initial data
USE suplearn_db;
source c:\Users\KHB19\Desktop\suplearn\suplearn-backend\src\main\resources\initial_data.sql
```

**OR simply:**
- The application will auto-create the database on first run
- You can add sample data later

### Step 2: Configure Database (1 minute)
Edit `suplearn-backend\src\main\resources\application.properties`:
```properties
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

### Step 3: Start Backend (1 minute)
```cmd
cd c:\Users\KHB19\Desktop\suplearn\suplearn-backend
mvnw.cmd spring-boot:run
```

Wait for: `Started SupLearnApplication in X seconds`

### Step 4: Start Frontend (1 minute)
Open NEW terminal:
```cmd
cd c:\Users\KHB19\Desktop\suplearn
npm install          # First time only
ng serve --open
```

## 🎉 You're Ready!

Browser should open at **http://localhost:4200**

### Default Login Credentials

| Username | Password | Role |
|----------|----------|------|
| admin | admin123 | Admin |
| prof.smith | admin123 | Professor |
| student1 | admin123 | Student |

## 📋 First Actions

1. **Login as Admin** → Approve pending resources
2. **Login as Professor** → Create a quiz, upload resources
3. **Login as Student** → Browse resources, take quizzes, view dashboard
4. **Guest Mode** → Upload resource without login (needs admin approval)

## 🎯 Test These Features

### As Guest (No Login)
- ✅ Browse resources at `/resources`
- ✅ Search for resources
- ✅ Download resources
- ✅ Upload a resource (goes to pending)

### As Student
- ✅ Login at `/login`
- ✅ View dashboard at `/student/dashboard`
- ✅ Track progress
- ✅ Create revision schedule
- ✅ Rate and comment on resources

### As Professor
- ✅ Upload resources (auto-approved)
- ✅ Create quizzes with Google Forms link
- ✅ View student progress

### As Admin
- ✅ Approve/reject pending resources
- ✅ Manage users
- ✅ View system statistics

## 🔧 Common Tasks

### Add New Academic Subject
1. Go to database
2. Insert Year → Module → Subject
3. OR create admin UI for this

### Upload Test Resource
1. Go to `/upload`
2. Fill form:
   - Title: "Test Resource"
   - Description: "Testing upload"
   - Select: Year → Module → Subject → Type
   - Choose file (PDF/Word/etc.)
3. Submit → Goes to pending (needs admin approval)

### Create Quiz
1. Create Google Form with quiz questions
2. Get shareable link
3. Login as Professor
4. Create quiz with Google Form URL
5. Students can access from subject page

## 📊 Project Structure Quick Reference

```
suplearn/
├── suplearn-backend/       # Spring Boot (Port 8080)
│   ├── src/main/java/com/suplearn/
│   │   ├── model/         # Database entities
│   │   ├── repository/    # Data access
│   │   ├── service/       # Business logic
│   │   └── controller/    # REST APIs
│   └── src/main/resources/
│       ├── application.properties  # Config
│       └── initial_data.sql       # Sample data
│
├── src/app/               # Angular (Port 4200)
│   ├── components/       # UI pages
│   ├── services/         # HTTP services
│   ├── models/          # TypeScript interfaces
│   └── guards/          # Route protection
│
├── SETUP_GUIDE.md       # Detailed setup
├── FEATURES_TODO.md     # Implementation guide
└── README.md           # Overview
```

## 🌐 API Testing with Postman

### Register User
```
POST http://localhost:8080/api/auth/register
Body (JSON):
{
  "username": "testuser",
  "email": "test@suplearn.com",
  "password": "test123",
  "firstName": "Test",
  "lastName": "User",
  "role": "STUDENT"
}
```

### Get All Resources
```
GET http://localhost:8080/api/resources/public
```

### Search Resources
```
GET http://localhost:8080/api/resources/search?keyword=exam
```

## ❓ Troubleshooting

### Backend won't start
- Check if MySQL is running
- Verify database credentials in `application.properties`
- Ensure port 8080 is free

### Frontend won't start
- Run `npm install` first
- Check if port 4200 is free
- Try `npm install --legacy-peer-deps` if dependencies fail

### Can't login
- Check backend console for errors
- Verify user exists in database
- Clear browser cache

## 🎓 Learning Path

1. ✅ **Day 1:** Explore as guest, browse resources
2. ✅ **Day 2:** Create account, upload resources
3. ✅ **Day 3:** As admin, approve resources
4. ✅ **Day 4:** Create quizzes, test progress tracking
5. ✅ **Day 5:** Customize and extend features

## 📞 Need Help?

- Check `SETUP_GUIDE.md` for detailed instructions
- Check `FEATURES_TODO.md` for implementation details
- Review code comments in source files

---

**Ready to learn? Start exploring Sup'Learn! 🚀**
