import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Typography, Box } from '@mui/material'
import { searchMulti } from '../../services/tmdb'
import type { MediaItem } from '../../types/movie'
import MovieGrid from '../../components/movie-grid/MovieGrid'
import EmptyState from '../../components/empty-state/EmptyState'
import { useBookmarks } from '../../context/BookmarkContext'

export default function Search() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('query') || ''
  const [results, setResults] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasSearched, setHasSearched] = useState(false)
  const { isBookmarked, toggleBookmark } = useBookmarks()

  useEffect(() => {
    if (!query) {
      setResults([])
      setHasSearched(false)
      return
    }

    async function doSearch() {
      try {
        setLoading(true)
        setError(null)
        setHasSearched(true)
        const data = await searchMulti(query)
        setResults(data)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Search failed')
      } finally {
        setLoading(false)
      }
    }
    doSearch()
  }, [query])

  if (!query) {
    return (
      <EmptyState
        title="Search for movies or TV series"
        message="Use the search bar above to find content"
      />
    )
  }

  if (error) {
    return <EmptyState title="Error" message={error} />
  }

  if (hasSearched && !loading && results.length === 0) {
    return (
      <EmptyState
        title={`No results for "${query}"`}
        message="Try a different search term"
      />
    )
  }

  return (
    <Box>
      <Typography variant="h5" color="text.primary" sx={{ mb: 3, fontWeight: 600 }}>
        Search results for "{query}"
      </Typography>
      <MovieGrid
        items={results}
        loading={loading}
        isBookmarked={isBookmarked}
        onToggleBookmark={toggleBookmark}
      />
    </Box>
  )
}
