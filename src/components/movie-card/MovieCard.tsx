import { useNavigate } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Box,
  Tooltip,
} from '@mui/material'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import MovieIcon from '@mui/icons-material/Movie'
import TvIcon from '@mui/icons-material/Tv'
import StarIcon from '@mui/icons-material/Star'
import type { MediaItem } from '../../types/movie'

interface MovieCardProps {
  item: MediaItem
  isBookmarked: boolean
  onToggleBookmark: (item: MediaItem) => void
}

export default function MovieCard({
  item,
  isBookmarked,
  onToggleBookmark,
}: MovieCardProps) {
  const navigate = useNavigate()

  const detailPath = item.media_type === 'movie' ? `/movie/${item.id}` : `/tv/${item.id}`
  const year = item.release_date || item.first_air_date || ''
  const displayYear = year ? year.substring(0, 4) : 'N/A'

  const handleCardClick = () => {
    navigate(detailPath)
  }

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onToggleBookmark(item)
  }

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'transparent',
        boxShadow: 'none',
        transition: 'transform 0.25s ease',
        '&:hover': {
          transform: 'translateY(-6px)',
          '& .card-poster': {
            boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
          },
          '& .bookmark-btn': {
            opacity: 1,
          },
        },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          className="card-poster"
          component="img"
          image={
            item.poster_path
              ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
              : 'https://via.placeholder.com/500x750?text=No+Poster'
          }
          alt={item.title}
          sx={{
            width: '100%',
            aspectRatio: '2/3',
            objectFit: 'cover',
            bgcolor: '#252B3B',
            borderRadius: 2,
            transition: 'box-shadow 0.25s ease',
          }}
        />
        <Tooltip title={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}>
          <IconButton
            className="bookmark-btn"
            onClick={handleBookmarkClick}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: 'rgba(0,0,0,0.7)',
              color: 'white',
              opacity: { xs: 1, md: 0 },
              transition: 'opacity 0.2s ease, background-color 0.2s ease',
              '&:hover': {
                bgcolor: 'rgba(0,0,0,0.9)',
              },
            }}
          >
            {isBookmarked ? <BookmarkIcon sx={{ color: '#7C5CFC' }} /> : <BookmarkBorderIcon />}
          </IconButton>
        </Tooltip>
      </Box>

      <CardContent sx={{ p: 0, pt: 1.5, flex: 1 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            mb: 0.5,
          }}
        >
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: 12 }}>
            {displayYear}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: 12 }}>
            •
          </Typography>
          {item.media_type === 'movie' ? (
            <MovieIcon sx={{ fontSize: 13, color: 'text.secondary' }} />
          ) : (
            <TvIcon sx={{ fontSize: 13, color: 'text.secondary' }} />
          )}
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: 12 }}>
            {item.media_type === 'movie' ? 'Movie' : 'TV Series'}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: 12 }}>
            •
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
            <StarIcon sx={{ fontSize: 13, color: '#F5C518' }} />
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: 12 }}>
              {item.vote_average.toFixed(1)}
            </Typography>
          </Box>
        </Box>

        <Typography
          variant="subtitle2"
          color="text.primary"
          noWrap
          title={item.title}
          sx={{ fontSize: 14, fontWeight: 600 }}
        >
          {item.title}
        </Typography>
      </CardContent>
    </Card>
  )
}
