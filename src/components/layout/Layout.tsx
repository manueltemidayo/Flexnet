import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Box, IconButton, useTheme, useMediaQuery } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import Sidebar from '../sidebar/Sidebar'
import SearchBar from '../navbar/SearchBar'

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Sidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: { xs: 2, md: 3 },
            py: 2,
            position: 'sticky',
            top: 0,
            zIndex: 10,
            bgcolor: 'background.default',
            borderBottom: '1px solid',
            borderColor: 'rgba(255,255,255,0.06)',
          }}
        >
          {!isDesktop && (
            <IconButton
              onClick={() => setMobileOpen(true)}
              sx={{ color: 'text.primary' }}
              aria-label="Open menu"
            >
              <MenuIcon />
            </IconButton>
          )}
          <SearchBar />
        </Box>

        <Box
          component="main"
          sx={{
            flex: 1,
            px: { xs: 2, md: 3 },
            py: { xs: 2, md: 3 },
            maxWidth: 1600,
            width: '100%',
            mx: 'auto',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}
