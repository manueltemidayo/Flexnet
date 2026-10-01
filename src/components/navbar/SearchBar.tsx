import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, InputAdornment, Box } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = query.trim()
    if (trimmed) {
      navigate(`/search?query=${encodeURIComponent(trimmed)}`)
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ flex: 1, maxWidth: 600 }}
    >
      <TextField
        fullWidth
        size="small"
        placeholder="Search for movies or TV series"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
              </InputAdornment>
            ),
          },
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            bgcolor: 'background.paper',
            borderRadius: 3,
            '& fieldset': {
              borderColor: 'rgba(255,255,255,0.08)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255,255,255,0.15)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'primary.main',
            },
          },
          '& .MuiInputBase-input': {
            color: 'text.primary',
            py: 1.25,
            fontSize: 14,
          },
        }}
      />
    </Box>
  )
}
