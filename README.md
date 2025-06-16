# IssueTracker API

A Node.js REST API for tracking projects, issues, and comments with full Docker and CI/CD support.

## 🚀 Features

- ✅ User authentication with JWT
- 🛠 CRUD for Projects and Issues
- 💬 Comment system
- 📦 Dockerized
- ✅ CI/CD via GitHub Actions

## 🧪 Setup

```bash
git clone https://github.com/yourusername/IssueTracker.git
cd IssueTracker
cp .env.example .env
docker compose up --build

_______________________________________________________________________________________

📬 API Endpoints

Auth
	•	POST /auth/signup
	•	POST /auth/login

User
	•	GET /me (requires Bearer token)
	•	PUT /me

Projects
	•	POST /projects
	•	GET /projects
	•	PUT /projects/:id
	•	DELETE /projects/:id

Issues
	•	POST /issues
	•	GET /issues
	•	PUT /issues/:id
	•	DELETE /issues/:id

Comments
	•	POST /issues/:id/comments
	•	GET /issues/:id/comments


    __________________________________________________

✅ Run Locally without Docker:

# Install dependencies
npm install

# Set up PostgreSQL locally and update .env
cp .env.example .env

# Migrate DB
npx prisma migrate dev --name init

# Run app
npm run dev