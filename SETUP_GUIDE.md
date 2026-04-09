# FocusFlow Setup Guide

To get the application up and running, you'll need to configure your local credentials and database. Follow these steps:

---

## 1. Database Setup (PostgreSQL)

FocusFlow requires a PostgreSQL database to store user data, tasks, and habits.

1.  **Install PostgreSQL**: If you don't have it, download it from [postgresql.org](https://www.postgresql.org/download/).
2.  **Create Database**: Open your terminal or a tool like `pgAdmin` and run:
    ```sql
    CREATE DATABASE focusflow;
    ```
3.  **Run Schema**: Apply the database structure by running the SQL found in:
    `backend/database/schema.sql`
    
    *Command line example:*
    ```bash
    psql -U postgres -d focusflow -f backend/database/schema.sql
    ```

---

## 2. Environment Configuration

You need to create a `.env` file in the `backend/` directory to store your sensitive credentials.

1.  Navigate to the `backend/` folder.
2.  Create a new file named `.env`.
3.  Copy and fill in the following template:

```env
# Server Port
PORT=5000

# PostgreSQL Connection String
# Format: postgres://[user]:[password]@[host]:[port]/[database]
DATABASE_URL=postgres://postgres:your_password@localhost:5432/focusflow

# Strong secret for JWT signing
# You can generate one using: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET=add_a_very_long_random_string_here
```

---

## 3. Launching the App

Once the credentials are set, you can start the services.

### Start the Backend
```bash
cd backend
npm install
npm run dev
```

### Start the Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 4. Cloud Deployment (Production)

To deploy **FocusFlow** to the cloud, use the following recommended platforms:

### 🗄️ Database: Supabase
1.  **Create Project**: Sign up at [supabase.com](https://supabase.com) and create a New Project.
2.  **Get URL**: Go to **Project Settings > Database** and copy the **Connection String** (Node.js/URI).
3.  **Run Schema**: Use the Supabase **SQL Editor** to paste and run your `schema.sql`.

### 🚀 Backend: Render or Railway
1.  **Connect Repo**: Connect your GitHub repository to [render.com](https://render.com).
2.  **Environment Variables**:
    *   `DATABASE_URL`: Your Supabase connection string.
    *   `JWT_SECRET`: A secure random string.
    *   `FRONTEND_URL`: Your final Vercel URL (e.g., `https://focusflow-app.vercel.app`).
    *   `NODE_ENV`: `production`

### 💻 Frontend: Vercel
1.  **Project Root**: Set the **Root Directory** to `frontend/`.
2.  **Environment Variables**:
    *   `VITE_API_URL`: Your Render/Railway backend URL (e.g., `https://focusflow-api.onrender.com/api`).
3.  **Deployment**: Vercel will automatically detect the `vercel.json` and handle routing.

---

**Tip**: Use `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` in your terminal to generate a secure `JWT_SECRET`.
