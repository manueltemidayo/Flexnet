import { Box, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'

export default function Error() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center',
      }}
    >
      <ReportProblemIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 3 }} />
      <Typography variant="h4" color="text.primary" gutterBottom sx={{ fontWeight: 600 }}>
        404
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        The page you're looking for doesn't exist.
      </Typography>
      <Button component={Link} to="/" variant="contained">
        Go Home
      </Button>
    </Box>
  )
}
