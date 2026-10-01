# MovieApp

A modern movie discovery web application built with React, TypeScript, and Material UI. Search for movies and TV series, browse trending content, and save your favorites.

## Features

- Browse trending movies, popular movies, and popular TV series
- Search across movies and TV shows via TMDB
- Bookmark your favorites (saved to localStorage)
- Movie and TV detail pages with backdrop images
- Fully responsive (desktop, tablet, mobile)
- Dark cinematic theme

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** — build tool
- **Material UI** — component library
- **React Router** — client-side routing
- **TMDB API** — movie/TV data

## Getting Started

### Prerequisites

- Node.js 18+
- A free [TMDB API key](https://www.themoviedb.org/settings/api)

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/movienet.git
   cd movienet
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```

4. Add your TMDB API key to `.env`:
   ```
   VITE_TMDB_API_KEY=your_actual_api_key_here
   VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
   VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500
   ```

5. Start the dev server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint |

## Project Structure

```
src/
  components/     # Reusable UI components (MovieCard, Sidebar, etc.)
  context/        # React Context for bookmarks
  pages/          # Route-level page components
  services/       # TMDB API service layer
  theme/          # MUI theme configuration
  types/          # Shared TypeScript interfaces
  utils/          # Helper functions (localStorage, mock data)
  router/         # React Router configuration
```

## Deployment

### Vercel

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Add the environment variables (`VITE_TMDB_API_KEY`, etc.)
4. Deploy

The included `vercel.json` handles SPA routing automatically.

## License

MIT
