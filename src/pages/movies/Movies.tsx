import { useState, useEffect } from 'react'
import { Typography, Box } from '@mui/material'
import { getPopularMovies } from '../../services/tmdb'
import type { MediaItem } from '../../types/movie'
import MovieGrid from '../../components/movie-grid/MovieGrid'
import EmptyState from '../../components/empty-state/EmptyState'
import { useBookmarks } from '../../context/BookmarkContext'

export default function Movies() {
  const [movies, setMovies] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { isBookmarked, toggleBookmark } = useBookmarks()

  useEffect(() => {
    async function loadMovies() {
      try {
        setLoading(true)
        const data = await getPopularMovies()
        setMovies(data)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load movies')
      } finally {
        setLoading(false)
      }
    }
    loadMovies()
  }, [])

  if (error) {
    return <EmptyState title="Error" message={error} />
  }

  if (!loading && movies.length === 0) {
    return <EmptyState title="No movies found" message="Try again later" />
  }

  return (
    <Box>
      <Typography variant="h5" color="text.primary" sx={{ mb: 3, fontWeight: 600 }}>
        Movies
      </Typography>
      <MovieGrid
        items={movies}
        loading={loading}
        isBookmarked={isBookmarked}
        onToggleBookmark={toggleBookmark}
      />
    </Box>
  )
}

