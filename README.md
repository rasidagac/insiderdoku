# insiderdoku

A Sudoku game with leaderboard functionality built with Vue 3, TypeScript, and a Node.js backend API.

## Features

- Interactive Sudoku game with multiple difficulty levels
- Real-time leaderboard with API integration using VueUse
- Score tracking and persistence
- Modern UI with Tailwind CSS
- TypeScript support throughout the stack

## Tech Stack

### Frontend

- Vue 3 with Composition API
- TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Pinia for state management
- VueUse for composables and utilities

### Backend

- Node.js with Express
- TypeScript
- PostgreSQL database
- RESTful API

## Project Setup

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm
- Docker and Docker Compose (for full stack)

### Frontend Only Setup

```sh
cd frontend
pnpm install
pnpm dev
```

### Full Stack Setup

```sh
# Start all services (frontend, backend, database)
docker-compose up

# Or run in detached mode
docker-compose up -d
```

The application will be available at:

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Database: localhost:5432

### Development Commands

```sh
# Frontend development
cd frontend
pnpm dev

# Backend development
cd backend
pnpm dev

# Run tests
pnpm test:unit

# Lint code
pnpm lint
```

### Environment Variables

The frontend uses the following environment variables:

- `VITE_API_URL` - Backend API URL (defaults to http://localhost:3001)

## Project Structure

```
insiderdoku/
├── frontend/          # Vue 3 frontend application
│   ├── src/
│   │   ├── composables/  # VueUse composables (useLeaderboard)
│   │   ├── stores/       # Pinia stores (game state only)
│   │   └── views/        # Page components
├── backend/           # Node.js API server
├── shared/            # Shared TypeScript types
└── docker-compose.yml # Full stack orchestration
```
