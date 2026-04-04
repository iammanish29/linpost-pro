# Deployment Guide

This guide explains how to deploy LinPost Pro to production using Vercel (frontend) and Railway (backend + database).

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Database Setup (Railway PostgreSQL)](#database-setup)
3. [Backend Deployment (Railway)](#backend-deployment)
4. [Frontend Deployment (Vercel)](#frontend-deployment)
5. [GitHub Actions CI/CD Setup](#cicd-setup)
6. [Environment Variables Reference](#environment-variables)
7. [Monitoring & Health Checks](#monitoring)

---

## Prerequisites

- GitHub account with the repository
- [Railway account](https://railway.app) (free tier available)
- [Vercel account](https://vercel.com) (free tier available)
- Node.js 20+ installed locally

---

## Database Setup

### 1. Create Railway Project

1. Go to [railway.app](https://railway.app) and sign in
2. Click **New Project** → **Provision PostgreSQL**
3. Railway creates a PostgreSQL instance automatically

### 2. Get Database URL

1. Click on the PostgreSQL service
2. Go to **Variables** tab
3. Copy `DATABASE_URL` — you'll need this for the backend

### 3. Run Database Migrations

```bash
# Set DATABASE_URL in your local .env
cd server
npm install
# Drizzle ORM handles schema — the app creates tables on first run
```

---

## Backend Deployment

### Option A: Railway (Recommended)

#### 1. Create Railway Service

1. In your Railway project, click **New Service** → **GitHub Repo**
2. Select the `linpost-pro` repository
3. Railway detects the `railway.json` config automatically

#### 2. Configure Environment Variables

In Railway service → **Variables**, set:

```
NODE_ENV=production
PORT=3001
DATABASE_URL=<from-railway-postgresql>
JWT_SECRET=<generate-with: openssl rand -base64 32>
CORS_ORIGIN=https://your-frontend.vercel.app
LINKEDIN_CLIENT_ID=<from-linkedin-developer-portal>
LINKEDIN_CLIENT_SECRET=<from-linkedin-developer-portal>
```

#### 3. Deploy

Railway auto-deploys on every push to `main`. For manual deploy:

```bash
npm install -g @railway/cli
railway login
railway up --service linpost-pro-backend
```

### Option B: Manual VPS

```bash
# On your server
git clone https://github.com/iammanish29/linpost-pro
cd linpost-pro/server
npm install
npm run build

# Set environment variables
export NODE_ENV=production
export PORT=3001
export DATABASE_URL="postgresql://..."
export JWT_SECRET="your-secret"

# Start with PM2
npm install -g pm2
pm2 start dist/index.js --name linpost-pro-api
pm2 save
```

---

## Frontend Deployment

### Vercel (Recommended)

#### 1. Import Project

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **New Project** → Import from GitHub
3. Select the `linpost-pro` repository
4. Set **Root Directory** to `client`
5. Framework preset: **Vite**

#### 2. Configure Environment Variables

In Vercel project → **Settings** → **Environment Variables**:

```
VITE_API_URL=https://your-backend.up.railway.app
VITE_APP_NAME=LinPost Pro
```

#### 3. Deploy

Vercel auto-deploys on every push to `main`.

---

## CI/CD Setup

The GitHub Actions workflow (`.github/workflows/deploy.yml`) automates deployments.

### Required GitHub Secrets

Go to **GitHub** → **Repository** → **Settings** → **Secrets and variables** → **Actions**

Add these secrets:

| Secret | Description | How to get |
|--------|-------------|------------|
| `VERCEL_TOKEN` | Vercel API token | Vercel → Account → Settings → Tokens |
| `VERCEL_ORG_ID` | Vercel team/org ID | Vercel → Account → Settings → General |
| `VERCEL_PROJECT_ID` | Vercel project ID | Vercel → Project → Settings → General |
| `RAILWAY_TOKEN` | Railway API token | Railway → Account → Tokens |
| `RAILWAY_BACKEND_URL` | Railway backend URL | Railway → Service → Domains |
| `VITE_API_URL` | Backend URL for frontend build | Same as `RAILWAY_BACKEND_URL` |

### CI/CD Pipeline Flow

```
Push to main
    │
    ▼
Build & Test
    ├── Install dependencies
    ├── TypeScript type-check (client)
    ├── TypeScript type-check (server)
    ├── Build client (Vite)
    └── Build server (tsc)
    │
    ├──────────────────────────────────┐
    ▼                                  ▼
Deploy Frontend                   Deploy Backend
(Vercel)                          (Railway)
    │                                  │
    └──────────────────────────────────┘
                    │
                    ▼
             Health Check
         (verify /health endpoint)
```

### Manual Trigger

```bash
# Trigger via GitHub CLI
gh workflow run deploy.yml
```

---

## Environment Variables

### Backend

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | 3001 | Server port |
| `NODE_ENV` | Yes | development | Environment |
| `DATABASE_URL` | Yes | — | PostgreSQL connection string |
| `JWT_SECRET` | Yes | dev-secret | JWT signing secret |
| `JWT_EXPIRES_IN` | No | 7d | Token expiry |
| `CORS_ORIGIN` | Yes | localhost:5173 | Frontend URL |
| `LINKEDIN_CLIENT_ID` | No | — | LinkedIn OAuth |
| `LINKEDIN_CLIENT_SECRET` | No | — | LinkedIn OAuth |

### Frontend

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `VITE_API_URL` | No | (empty) | Backend API URL |
| `VITE_APP_NAME` | No | LinPost Pro | App display name |

---

## Monitoring

### Health Check Endpoint

```bash
curl https://your-backend.up.railway.app/health
# Response: {"status":"ok","timestamp":"2026-04-04T00:00:00.000Z"}
```

### Railway Metrics

- View logs: Railway dashboard → Service → Logs
- CPU/Memory: Railway dashboard → Service → Metrics
- Deployment history: Railway dashboard → Service → Deployments

### Vercel Analytics

- Enable in: Vercel project → Analytics tab
- View: Page views, performance metrics, errors

---

## Troubleshooting

### Backend won't start

```bash
# Check Railway logs
railway logs --service linpost-pro-backend

# Common issues:
# - DATABASE_URL not set
# - JWT_SECRET not set
# - Port binding issue (Railway auto-assigns PORT)
```

### Frontend can't reach backend

```bash
# Check CORS settings
# Ensure CORS_ORIGIN matches your Vercel domain exactly

# Check VITE_API_URL in Vercel environment variables
# Must be full URL: https://your-backend.up.railway.app
```

### Database connection fails

```bash
# Verify DATABASE_URL format:
# postgresql://user:password@host:port/database

# Railway provides this automatically when you add PostgreSQL
# Check Variables tab in Railway PostgreSQL service
```

### Build fails in CI/CD

```bash
# Check GitHub Actions logs
# Common issues:
# - Missing secrets (VERCEL_TOKEN, RAILWAY_TOKEN, etc.)
# - TypeScript errors
# - Missing environment variables during build
```
