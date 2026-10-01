import { useState, useEffect } from 'react'
import { Typography, Box } from '@mui/material'
import { getTrendingMovies, getPopularMovies, getPopularTVShows } from '../../services/tmdb'
import type { MediaItem } from '../../types/movie'
import MovieGrid from '../../components/movie-grid/MovieGrid'
import { useBookmarks } from '../../context/BookmarkContext'

export default function Home() {
  const [trending, setTrending] = useState<MediaItem[]>([])
  const [popularMovies, setPopularMovies] = useState<MediaItem[]>([])
  const [popularTV, setPopularTV] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { isBookmarked, toggleBookmark } = useBookmarks()

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const [trendingData, moviesData, tvData] = await Promise.all([
          getTrendingMovies(),
          getPopularMovies(),
          getPopularTVShows(),
        ])
        setTrending(trendingData)
        setPopularMovies(moviesData)
        setPopularTV(tvData)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load data')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (error) {
    return (
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <section>
        <Typography variant="h5" color="text.primary" sx={{ mb: 2, fontWeight: 600 }}>
          Trending Movies
        </Typography>
        <MovieGrid
          items={trending}
          loading={loading}
          isBookmarked={isBookmarked}
          onToggleBookmark={toggleBookmark}
        />
      </section>

      <section>
        <Typography variant="h5" color="text.primary" sx={{ mb: 2, fontWeight: 600 }}>
          Popular Movies
        </Typography>
        <MovieGrid
          items={popularMovies}
          loading={loading}
          isBookmarked={isBookmarked}
          onToggleBookmark={toggleBookmark}
        />
      </section>

      <section>
        <Typography variant="h5" color="text.primary" sx={{ mb: 2, fontWeight: 600 }}>
          Popular TV Series
        </Typography>
        <MovieGrid
          items={popularTV}
          loading={loading}
          isBookmarked={isBookmarked}
          onToggleBookmark={toggleBookmark}
        />
      </section>
    </Box>
  )
}
