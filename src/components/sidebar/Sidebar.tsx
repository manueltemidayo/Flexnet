import { NavLink } from 'react-router-dom'
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import MovieIcon from '@mui/icons-material/Movie'
import TvIcon from '@mui/icons-material/Tv'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import blows from '../../assets/blows .png'

const navItems = [
  { to: '/', label: 'Home', icon: <HomeIcon /> },
  { to: '/movies', label: 'Movies', icon: <MovieIcon /> },
  { to: '/tv-series', label: 'TV Series', icon: <TvIcon /> },
  { to: '/bookmarks', label: 'Bookmarks', icon: <BookmarkIcon /> },
]

interface SidebarProps {
  mobileOpen: boolean
  onClose: () => void
}

export default function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        bgcolor: 'background.paper',
        borderRight: '1px solid',
        borderColor: 'rgba(255,255,255,0.06)',
      }}
    >
      <Box sx={{ px: 2.5, py: 3 }}>
        <Typography variant="h6" color="white" sx={{ letterSpacing: -0.5, fontWeight: 700 }}>
          MovieApp
        </Typography>
      </Box>

      <List sx={{ px: 1.5, flex: 1 }}>
        {navItems.map((item) => (
          <ListItem key={item.to} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              component={NavLink}
              to={item.to}
              onClick={onClose}
              sx={{
                borderRadius: 2,
                color: 'text.secondary',
                '&.active': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                },
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.06)',
                  color: 'text.primary',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: 'inherit',
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                slotProps={{ primary: { sx: { fontSize: 14, fontWeight: 500 } } }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box onClick={() => 
        {
          console.log('Profile clicked')
        }
      }
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          borderTop: '1px solid',
          borderColor: 'rgba(255,255,255,0.08)',
        }}
      >
        <Avatar
          sx={{ width: 36, height: 36, bgcolor: 'primary.main'}}
          src={blows}
        />
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13 }}>
          Guest User
        </Typography>
      </Box>
    </Box>
  )

  if (isDesktop) {
    return (
      <Box
        sx={{
          width: 240,
          flexShrink: 0,
          height: '100vh',
          position: 'sticky',
          top: 0,
        }}
      >
        {content}
      </Box>
    )
  }

  return (
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        '& .MuiDrawer-paper': {
          width: 240,
          bgcolor: 'background.paper',
        },
      }}
    >
      {content}
    </Drawer>
  )
}
