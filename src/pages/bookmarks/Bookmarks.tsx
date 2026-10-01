import { Typography, Box } from '@mui/material'
import MovieGrid from '../../components/movie-grid/MovieGrid'
import EmptyState from '../../components/empty-state/EmptyState'
import { useBookmarks } from '../../context/BookmarkContext'

export default function Bookmarks() {
  const { bookmarks, isBookmarked, toggleBookmark } = useBookmarks()

  if (bookmarks.length === 0) {
    return (
      <EmptyState
        title="No bookmarks yet"
        message="Save movies and TV shows to see them here"
      />
    )
  }

  return (
    <Box>
      <Typography variant="h5" color="text.primary" sx={{ mb: 3, fontWeight: 600 }}>
        Bookmarks
      </Typography>
      <MovieGrid
        items={bookmarks}
        isBookmarked={isBookmarked}
        onToggleBookmark={toggleBookmark}
      />
    </Box>
  )
}
