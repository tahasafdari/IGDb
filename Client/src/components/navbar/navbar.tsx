import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import {USER_BY_ID} from '@/graphql/queries'
import { useEffect, useState } from 'react'
import { User } from '@/components/interfaces/User'
const settings = ['Profile', 'My Games', 'Logout']

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('isAuthenticated')
    handleCloseUserMenu()
    window.location.href = '/sign-in'
  }

  const { data, loading, error } = useQuery(USER_BY_ID, {
    variables: { id: user?.id },
    context: {
      headers: {
        Authorization: `Bearer ${token || ''}`,
      },
    },
  })
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || 'null')
    if (userData) {
      setUser(userData)
    }
  }, [])


  return (
    <AppBar
      position="absolute"
      sx={{ width: '30%', backgroundColor: 'transparent', m: '15px', boxShadow: 'none' }}
    >
      <Container
        maxWidth="xl"
        sx={{ margin: '0 auto' }}
        
      >
        <Toolbar disableGutters>
          {/* <TextField
            placeholder="Search"
            size="small"
            variant="outlined"
            sx={{
              marginRight: 1,
              backgroundColor: 'transparent',
              borderRadius: '20px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'black', // Border color
                },
                '&:hover fieldset': {
                  borderColor: 'black', // Border color when hovered
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'black', // Border color when the input is focused
                },
              },
            }}
          /> */}

          <Typography variant="h6" noWrap sx={{ flexGrow: 1 } } ></Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar src={data ? data.userById.profile_image : user?.profile_image} className={'border 18px solid black rounded-full shadow-xl'} alt="User Avatar"   />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    if (setting === 'Logout') {
                      handleLogout()
                    } else if (setting === 'Profile') {
                      // 3. Navigate to /profile when "Profile" is clicked
                      router.push('/profile');
                      handleCloseUserMenu()
                    } else {
                      handleCloseUserMenu()
                    }
                  }}
                >
                  {setting}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )

}

export default ResponsiveAppBar
