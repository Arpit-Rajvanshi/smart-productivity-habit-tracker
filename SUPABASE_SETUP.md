# 🗄️ Supabase Step-by-Step Setup Guide

This guide will walk you through setting up **Supabase** as the primary PostgreSQL database for your **FocusFlow (HabitPulse)** application.

---

## Step 1: Create a Supabase Project
1.  Go to [Supabase.com](https://supabase.com) and Sign In.
2.  Click on **"New Project"**.
3.  Select your Organization.
4.  **Project Details**:
    *   **Name**: `FocusFlow` (or your preferred name).
    *   **Database Password**: Create a strong password (and **Save it!**).
    *   **Region**: Select the region closest to your users (e.g., *East US*).
5.  Click **"Create New Project"**. Wait a few minutes for the database to provision.

---

## Step 2: Initialize the Database Schema
FocusFlow requires several tables (`users`, `tasks`, `habits`, etc.) to function.

1.  In your Supabase Dashboard, click the **SQL Editor** icon in the left sidebar (it looks like `>_`).
2.  Click **"New Query"**.
3.  Open the local file `backend/database/schema.sql` in your code editor.
4.  **Copy the entire contents** of `schema.sql`.
5.  **Paste** it into the Supabase SQL Editor window.
6.  Click **"Run"** at the bottom right.
    *   *You should see a message saying "Success. No rows returned."*

---

## Step 3: Get your Connection String
To connect your Node.js backend to Supabase, you need the **URI connection string**.

1.  Click on the **Project Settings** (gear icon) at the bottom of the left sidebar.
2.  Go to **"Database"**.
3.  Scroll down to the **"Connection string"** section.
4.  Select the **"Node.js"** or **"URI"** tab.
5.  **Copy the string**. It will look something like this:
    `postgresql://postgres:[YOUR-PASSWORD]@db.xxxx.supabase.co:5432/postgres`

---

## Step 4: Configure FocusFlow Backend
1.  Open your local `backend/.env` file.
2.  Paste your connection string into the `DATABASE_URL` variable:
    ```env
    DATABASE_URL=postgresql://postgres:YOUR_ACTUAL_PASSWORD@db.xxxx.supabase.co:5432/postgres
    ```
    > [!IMPORTANT]
    > **Replace `[YOUR-PASSWORD]`** with the actual database password you created in Step 1.

---

## Step 5: Verify Connection
1.  Start your backend:
    ```bash
    cd backend
    npm install
    npm run dev
    ```
2.  If you see `Server running on port 5000` and no database errors, you are successfully connected to Supabase!

---

### 🛡️ Why use Supabase?
*   **Production-Ready**: High availability and automatic backups.
*   **Scalable**: Handles complex relational queries for tasks/habits effortlessly.
*   **Visual Editor**: You can browse and edit your user data directly in the Supabase "Table Editor" UI.
