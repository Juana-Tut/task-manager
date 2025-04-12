# task-manager
# Task Management Web App

## Description
This is a simple Task Management Web App built using **Node.js**, **Express**, **EJS**, and **CSS**. The app allows users to:
- View a list of tasks
- Add new tasks
- Mark tasks as complete
- Delete tasks

The app follows **Server-Side Rendering (SSR)** principles using the **EJS** templating engine. All task data is stored **locally in memory**.

---
## Database Setup
### Pre requisite
  - PostgreSQL installed and set up on your system.
### Set up the Database

#### 1. Login as administrator
```sh
sudo -u postgres psql 
```
#### 2. Create a new database 
```sh
CREATE DATABASE tasks;
```
#### 3. Login to the database
```sh
\c tasks
```
#### 4. Create a role (user) to access the database (signups)
```sh
CREATE ROLE tasks WITH LOGIN PASSWORD 'tasklogin';
```
#### 5. Exit & Login back as administrator
```sh
exit
```
```sh
sudo -u postgres psql
```
#### 6. Grant permissions to our user/role 
```sh
ALTER DATABASE tasks OWNER TO tasks;
```
```sh
GRANT CREATE ON DATABASE tasks TO tasks;
```
#### 7. Exit and Login as the newly created user
```sh
psql --host=localhost --dbname=tasks --username=tasks
```
#### 8. Run the sql file
```sh
\i Database/db.sql
```

## Installation & Setup

### Steps to Run the App

#### 1. Install Dependencies
Run the following command to install required Node.js packages:
```sh
npm install
```

#### 2. Start the Server
To start the application, use:
```sh
npm start
```

#### 3. Open in Browser
Once the server is running, open your browser and visit:
```sh
http://localhost:4000/
```

---

## Features & Usage

### Adding a Task
1. Enter a **task title** and a **description** in the input field.
2. Click the **Add Task** button.
3. The task will appear in the task list.

### Marking a Task as Complete
1. Click the **Complete** button next to a task.
2. The task will be marked as **completed** (e.g., grayed out or with a strikethrough style).

### Deleting a Task
1. Click the **Delete** button next to a task.
2. The task will be removed permanently.

### Link to Video
(https://youtu.be/gtPH3Y8uBYA)
