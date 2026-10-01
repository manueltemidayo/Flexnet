import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  Box,
  Typography,
  Chip,
  Rating,
  Button,
  Skeleton,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import { useNavigate } from 'react-router-dom'
import { getMovieDetails, getImageUrl } from '../../services/tmdb'
import type { MovieDetails as MovieDetailsType } from '../../types/movie'
import EmptyState from '../../components/empty-state/EmptyState'
import { useBookmarks } from '../../context/BookmarkContext'

export default function MovieDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [movie, setMovie] = useState<MovieDetailsType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { isBookmarked, toggleBookmark } = useBookmarks()

  useEffect(() => {
    if (!id) return
    async function loadMovie() {
      try {
        setLoading(true)
        const data = await getMovieDetails(id as string)
        setMovie(data)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load movie')
      } finally {
        setLoading(false)
      }
    }
    loadMovie()
  }, [id])

  if (loading) {
    return (
      <Box>
        <Skeleton variant="rectangular" width="100%" height={400} sx={{ borderRadius: 2 }} />
        <Skeleton variant="text" width="60%" height={40} sx={{ mt: 2 }} />
        <Skeleton variant="text" width="100%" height={100} sx={{ mt: 1 }} />
      </Box>
    )
  }

  if (error || !movie) {
    return <EmptyState title="Error" message={error || 'Movie not found'} />
  }

  const bookmarked = isBookmarked(movie.id)
  const year = movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'

  return (
    <Box>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ color: 'text.secondary', mb: 2 }}
      >
        Back
      </Button>

      <Box
        sx={{
          position: 'relative',
          borderRadius: 3,
          overflow: 'hidden',
          mb: 3,
        }}
      >
        <Box
          component="img"
          src={getImageUrl(movie.backdrop_path, 'original')}
          alt={movie.title}
          sx={{
            width: '100%',
            height: { xs: 200, sm: 300, md: 400 },
            objectFit: 'cover',
            bgcolor: '#252B3B',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, #0F1117 0%, transparent 60%)',
          }}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 2, md: 3 },
        }}
      >
        <Box
          component="img"
          src={getImageUrl(movie.poster_path, 'w342')}
          alt={movie.title}
          sx={{
            width: { xs: 140, sm: 180 },
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            flexShrink: 0,
          }}
        />

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="h4"
            color="text.primary"
            gutterBottom
            sx={{ fontSize: { xs: 24, sm: 32, md: 36 }, fontWeight: 700 }}
          >
            {movie.title}
          </Typography>

          {movie.tagline && (
            <Typography variant="subtitle1" color="text.secondary" sx={{ fontStyle: 'italic', mb: 2 }}>
              "{movie.tagline}"
            </Typography>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, flexWrap: 'wrap' }}>
            <Rating value={movie.vote_average / 2} precision={0.1} readOnly />
            <Typography variant="body2" color="text.secondary">
              {movie.vote_average.toFixed(1)}/10
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {year}
            </Typography>
            {movie.runtime > 0 && (
              <Typography variant="body2" color="text.secondary">
                {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
              </Typography>
            )}
          </Box>

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
            {movie.genres.map((genre) => (
              <Chip
                key={genre.id}
                label={genre.name}
                size="small"
                sx={{
                  bgcolor: 'rgba(124, 92, 252, 0.15)',
                  color: '#7C5CFC',
                }}
              />
            ))}
          </Box>

          <Button
            variant={bookmarked ? 'contained' : 'outlined'}
            startIcon={bookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            onClick={() => toggleBookmark(movie)}
            sx={{ mb: 3 }}
          >
            {bookmarked ? 'Bookmarked' : 'Add to Bookmarks'}
          </Button>

          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
            {movie.overview}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
