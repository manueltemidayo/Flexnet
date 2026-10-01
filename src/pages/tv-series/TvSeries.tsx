import { useState, useEffect } from 'react'
import { Typography, Box } from '@mui/material'
import { getPopularTVShows } from '../../services/tmdb'
import type { MediaItem } from '../../types/movie'
import MovieGrid from '../../components/movie-grid/MovieGrid'
import EmptyState from '../../components/empty-state/EmptyState'
import { useBookmarks } from '../../context/BookmarkContext'

export default function TvSeries() {
  const [shows, setShows] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { isBookmarked, toggleBookmark } = useBookmarks()

  useEffect(() => {
    async function loadShows() {
      try {
        setLoading(true)
        const data = await getPopularTVShows()
        setShows(data)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load TV series')
      } finally {
        setLoading(false)
      }
    }
    loadShows()
  }, [])

  if (error) {
    return <EmptyState title="Error" message={error} />
  }

  if (!loading && shows.length === 0) {
    return <EmptyState title="No TV series found" message="Try again later" />
  }

  return (
    <Box>
      <Typography variant="h5" color="text.primary" sx={{ mb: 3, fontWeight: 600 }}>
        TV Series
      </Typography>
      <MovieGrid
        items={shows}
        loading={loading}
        isBookmarked={isBookmarked}
        onToggleBookmark={toggleBookmark}
      />
    </Box>
  )
}
