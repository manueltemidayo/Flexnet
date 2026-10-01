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
import { getTVDetails, getImageUrl } from '../../services/tmdb'
import type { TVDetails as TVDetailsType } from '../../types/movie'
import EmptyState from '../../components/empty-state/EmptyState'
import { useBookmarks } from '../../context/BookmarkContext'

export default function TvDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [show, setShow] = useState<TVDetailsType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { isBookmarked, toggleBookmark } = useBookmarks()

  useEffect(() => {
    if (!id) return
    async function loadShow() {
      try {
        setLoading(true)
        const data = await getTVDetails(id as string)
        setShow(data)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load TV series')
      } finally {
        setLoading(false)
      }
    }
    loadShow()
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

  if (error || !show) {
    return <EmptyState title="Error" message={error || 'TV series not found'} />
  }

  const bookmarked = isBookmarked(show.id)
  const year = show.first_air_date ? show.first_air_date.substring(0, 4) : 'N/A'
  const runtime = show.episode_run_time.length > 0 ? show.episode_run_time[0] : 0

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
          src={getImageUrl(show.backdrop_path, 'original')}
          alt={show.title}
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
          src={getImageUrl(show.poster_path, 'w342')}
          alt={show.title}
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
            {show.title}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, flexWrap: 'wrap' }}>
            <Rating value={show.vote_average / 2} precision={0.1} readOnly />
            <Typography variant="body2" color="text.secondary">
              {show.vote_average.toFixed(1)}/10
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {year}
            </Typography>
            {runtime > 0 && (
              <Typography variant="body2" color="text.secondary">
                {runtime}m per episode
              </Typography>
            )}
            <Typography variant="body2" color="text.secondary">
              {show.number_of_seasons} season{show.number_of_seasons !== 1 ? 's' : ''}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
            {show.genres.map((genre) => (
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
            onClick={() => toggleBookmark(show)}
            sx={{ mb: 3 }}
          >
            {bookmarked ? 'Bookmarked' : 'Add to Bookmarks'}
          </Button>

          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
            {show.overview}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
