# LinPost Pro 🚀

**LinkedIn Automation Platform** — Create, schedule, and analyze your LinkedIn posts with AI-powered assistance.

## Features

- 📝 **Compose** — AI-assisted post creation with hashtag suggestions
- 📅 **Scheduler** — Schedule posts for optimal engagement times
- 📊 **Analytics** — Track impressions, likes, comments, and engagement rate
- 🖼️ **Media Library** — Manage images and videos for your posts
- 📋 **Templates** — Reusable post templates for consistent content
- **Hashtag Research** — Discover trending hashtags to maximize reach

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS + shadcn/ui |
| State | TanStack React Query |
| Routing | Wouter (hash-based) |
| Backend | Node.js + Express + TypeScript |
| Database | PostgreSQL + Drizzle ORM |
| Auth | JWT |
| CI/CD | GitHub Actions |
| Frontend Deploy | Vercel |
| Backend Deploy | Railway |

## Local Development

### Prerequisites

- Node.js 20+
- PostgreSQL (optional — app works with in-memory demo data)

### Quick Start

```bash
# 1. Clone and install
git clone https://github.com/iammanish29/linpost-pro
cd linpost-pro

# 2. Install dependencies
cd client && npm install && cd ..
cd server && npm install && cd ..

# 3. Configure environment (optional)
cp .env.example .env
cp client/.env.example client/.env

# 4. Start backend (Terminal 1)
cd server && npm run dev

# 5. Start frontend (Terminal 2)
cd client && npm run dev
```

Frontend: http://localhost:5173
Backend: http://localhost:3001
Health check: http://localhost:3001/health

**Demo login:** `demo` / `password`

## Project Structure

```
linpost-pro/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components (shadcn/ui)
│   │   ├── pages/          # Route pages
│   │   ├── lib/            # Utilities, contexts, API client
│   │   └── hooks/          # Custom React hooks
│   ├── vercel.json         # Vercel deployment config
│   └── package.json
├── server/                 # Express backend
│   ├── src/
│   │   ├── routes/         # API route handlers
│   │   ├── middleware/      # Express middleware
│   │   ├── db/             # Database schema and connection
│   │   └── index.ts        # Server entry point
│   ├── Procfile            # Railway process definition
│   └── package.json
├── .github/
│   └── workflows/
│       └── deploy.yml      # CI/CD pipeline
├── railway.json            # Railway deployment config
└── .env.example            # Environment variables template
```

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment instructions.

| Service | Platform | Auto-Deploy |
|---------|----------|-------------|
| Frontend | Vercel | On push to main |
| Backend | Railway | On push to main |
| Database | Railway PostgreSQL | Manual setup once |

## API Endpoints

```
POST   /api/auth/login          - Login
POST   /api/auth/register       - Register
GET    /api/posts               - List posts
POST   /api/posts               - Create post
GET    /api/scheduler           - List scheduled posts
POST   /api/scheduler           - Schedule a post
GET    /api/analytics/overview  - Analytics overview
GET    /api/templates           - List templates
GET    /api/hashtags/trending   - Trending hashtags
GET    /health                  - Health check
```

## License

MIT
