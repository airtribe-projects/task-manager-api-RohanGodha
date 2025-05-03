
# Task Manager API

Welcome to the **Task Manager API** built with Node.js and Express! This simple RESTful API allows users to create, read, update, and delete tasks stored in memory. Each task includes details such as title, description, completion status, and priority.

## 🚀 Overview

This API provides basic CRUD operations and advanced filtering/sorting on tasks.

### Features
- Add a new task with title, description, completed status, and priority.
- Fetch all tasks or filter by completion or priority.
- Sort tasks by creation date.
- Update an existing task.
- Delete a task by ID.

> ⚠️ Note: This is an in-memory implementation. Data is lost when the server restarts.

---

## ⚙️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/task-manager-api.git
   cd task-manager-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the server**
   ```bash
   node app.js
   ```

4. **Access the API**
   Visit `http://localhost:3000` (or the port defined in `process.env.PORT`).

---

## 📘 API Documentation

### Base URL

```
http://localhost:3000
```

### Endpoints

#### 1. Welcome Page
- **GET /**  
Returns a welcome message.
```
Response: "Welcome to the Rohan Godha: Task Manager API!"
```

---

#### 2. Get All Tasks
- **GET /tasks**
- Optional Query Params:
  - `completed=true|false`
  - `sortBy=createdAt`
```bash
curl http://localhost:3000/tasks
curl http://localhost:3000/tasks?completed=true
curl http://localhost:3000/tasks?sortBy=createdAt
```

---

#### 3. Get Task by ID
- **GET /tasks/:id**
```bash
curl http://localhost:3000/tasks/1
```

---

#### 4. Get Tasks by Priority
- **GET /tasks/priority/:level**
- Valid levels: `low`, `medium`, `high`
```bash
curl http://localhost:3000/tasks/priority/high
```

---

#### 5. Create a Task
- **POST /tasks**
- Body:
```json
{
  "title": "Buy groceries",
  "description": "Milk, Eggs, Bread",
  "completed": false,
  "priority": "medium"
}
```
```bash
curl -X POST http://localhost:3000/tasks   -H "Content-Type: application/json"   -d '{"title":"Buy groceries","description":"Milk, Eggs, Bread","completed":false,"priority":"medium"}'
```

---

#### 6. Update a Task
- **PUT /tasks/:id**
- Body: Same as POST
```bash
curl -X PUT http://localhost:3000/tasks/1   -H "Content-Type: application/json"   -d '{"title":"Updated title","description":"Updated desc","completed":true,"priority":"high"}'
```

---

#### 7. Delete a Task
- **DELETE /tasks/:id**
```bash
curl -X DELETE http://localhost:3000/tasks/1
```

---

## 🧪 Input Validation

Validation is enforced:
- `title` and `description`: required, non-empty strings
- `completed`: must be a boolean
- `priority`: must be one of `"low"`, `"medium"`, or `"high"`

---

## 🔧 Error Handling

Returns:
- `400 Bad Request` for invalid input
- `404 Not Found` if a task ID does not exist
- `500 Internal Server Error` for unexpected issues

---

## 📝 Notes

- Data is stored in-memory (array), so restarting the server will reset all tasks.
- Extend this project with persistent storage (e.g., MongoDB or PostgreSQL) for production use.

---

## 👨‍💻 Author

**Rohan Godha**
