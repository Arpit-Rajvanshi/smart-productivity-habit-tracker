# 🚀 FocusFlow Cloud Deployment Guide

This guide provides a step-by-step walkthrough for deploying your **FocusFlow (HabitPulse)** application to the cloud using **Render** (Backend) and **Vercel** (Frontend).

---

## Part 1: Backend Deployment (Render)
Render is ideal for hosting your Node.js/Express API.

1.  **Sign Up**: Create an account at [Render.com](https://render.com).
2.  **New Web Service**: Click **"New +"** and select **"Web Service"**.
3.  **Connect GitHub**: Connect your `Arpit-Rajvanshi/smart-productivity-habit-tracker` repository.
4.  **Configure Service**:
    *   **Name**: `focusflow-api`
    *   **Root Directory**: `backend` (⚠️ Very Important)
    *   **Runtime**: `Node`
    *   **Build Command**: `npm install`
    *   **Start Command**: `npm start`
5.  **Environment Variables**:
    *   Click **"Advanced"** and add these variables:
        *   `DATABASE_URL`: *Your Supabase URI*
        *   `JWT_SECRET`: *Your secure random string*
        *   `FRONTEND_URL`: `https://your-app.vercel.app` (Add this later once Vercel is set up)
        *   `NODE_ENV`: `production`
6.  **Deploy**: Click **"Create Web Service"**.

---

## Part 2: Frontend Deployment (Vercel)
Vercel is the best platform for your React/Vite frontend.

1.  **Sign Up**: Create an account at [Vercel.com](https://vercel.com).
2.  **Add New**: Click **"Add New..."** and select **"Project"**.
3.  **Import Repo**: Select your `smart-productivity-habit-tracker` repository.
4.  **Project Settings**:
    *   **Framework Preset**: Select `Vite`.
    *   **Root Directory**: `frontend` (⚠️ Very Important)
5.  **Environment Variables**:
    *   Add `VITE_API_URL`.
    *   **Value**: `https://focusflow-api.onrender.com/api` (Replace with your Render URL).
6.  **Deploy**: Click **"Deploy"**.

---

## Part 3: Connecting the Two (Final Step)

Once both are deployed, you need to "link" them so the backend allows requests from your frontend.

1.  Go back to your **Render Dashboard**.
2.  Select your `focusflow-api` service.
3.  Go to **"Environment"**.
4.  Update the **`FRONTEND_URL`** variable with your real Vercel domain (e.g., `https://focusflow-habit-pulse.vercel.app`).
5.  **Save Changes**: Render will redeploy automatically.

---

### ✅ Deployment Checklist
- [ ] Supabase database schema is executed.
- [ ] Render backend is running (Status: `Live`).
- [ ] Vercel frontend is running.
- [ ] You can sign up/login on the production URL!

> [!TIP]
> If you see a **CORS error** in your browser console, it usually means the `FRONTEND_URL` on Render doesn't exactly match your Vercel URL (make sure there's no trailing slash `/` at the end).
