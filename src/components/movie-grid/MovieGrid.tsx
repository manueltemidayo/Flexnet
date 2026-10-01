import { Box } from '@mui/material'
import MovieCard from '../movie-card/MovieCard'
import MovieCardSkeleton from '../loading/MovieCardSkeleton'
import type { MediaItem } from '../../types/movie'

interface MovieGridProps {
  items: MediaItem[]
  loading?: boolean
  isBookmarked: (id: number) => boolean
  onToggleBookmark: (item: MediaItem) => void
}

export default function MovieGrid({
  items,
  loading = false,
  isBookmarked,
  onToggleBookmark,
}: MovieGridProps) {
  if (loading) {
    return (
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',
            sm: 'repeat(3, 1fr)',
            md: 'repeat(4, 1fr)',
            lg: 'repeat(5, 1fr)',
          },
          gap: { xs: 2, sm: 2.5, md: 3 },
        }}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </Box>
    )
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(2, 1fr)',
          sm: 'repeat(3, 1fr)',
          md: 'repeat(4, 1fr)',
          lg: 'repeat(5, 1fr)',
        },
        gap: { xs: 2, sm: 2.5, md: 3 },
      }}
    >
      {items.map((item) => (
        <MovieCard
          key={`${item.media_type}-${item.id}`}
          item={item}
          isBookmarked={isBookmarked(item.id)}
          onToggleBookmark={onToggleBookmark}
        />
      ))}
    </Box>
  )
}
