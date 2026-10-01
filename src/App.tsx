import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from './theme/theme'
import AppRouter from './router/router'
import { BookmarkProvider } from './context/BookmarkContext'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BookmarkProvider>
        <AppRouter />
      </BookmarkProvider>
    </ThemeProvider>
  )
}
