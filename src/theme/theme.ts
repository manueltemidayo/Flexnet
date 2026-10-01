import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#a80202',
    },
    background: {
      default: '#0F1117',
      paper: '#161B29',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#9CA3AF',
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', sans-serif",
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: '#1A1F2B',
          border: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
})

export default theme
