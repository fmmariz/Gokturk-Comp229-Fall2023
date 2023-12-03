// taken and modified from https://mui.com/material-ui/react-app-bar/

import * as React from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom/cjs/react-router-dom';

//material-ui stuff
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import auth from '../../auth/auth-helper';
import { useState } from 'react';
import gokturkLogo from './../../assets/images/gokturk_logo.jpg';



function NavigationBar(props){

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [loggedIn, setLoggedIn] = useState(props.currentStatus);


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (action) => {
    setAnchorElUser(null);
  };


  const pages = ['User List', 'Product List'];
  const settingsLogged = ['Profile', 'Logout'];
  const settingsNotLogged = ['Sign Up', 'Log In'];
  const locationsDict = {
    'User List': '/listusers',
    'Product List': '/listproducts',
    'Sign Up': "/signup",
    'Log In': "/signin",
    'Profile': "/profile",
  }
  let [hasLoggedOut, setHasLoggedOut] = useState(false);
  var shownSettings = [];
  var topRightIcon = null;
  
  
  
  if (loggedIn) {
    shownSettings = settingsLogged;
    topRightIcon = <Avatar alt="Username" src="/path/to/user" />;
  } else {
    shownSettings = settingsNotLogged;
    topRightIcon = <AccountCircleIcon style={{ color: 'black' }} />;
  }

  const logOut = () => {
    auth.clearJWT(
      () => {
        props.changeLogStatus(false)
        setHasLoggedOut(true)
      }
    );
  }

  if (hasLoggedOut) {
    return (<Redirect to="./" />)
  }

  const getButtonStyle = (pathname) =>
  {
    const isPage = currentPage == pathname 
    
    if(!isPage){return unselectedButtonStyle}

    console.log(pathname)
    return selectedButtonStyle
  }

  const currentPage = useLocation().pathname;
  console.log(currentPage)
  console.log(locationsDict["User List"])
  console.log(currentPage == locationsDict["User List"])

  const unselectedButtonStyle = {
    my: 2, color: 'black', display: 'block',
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'black',
      color: 'white'
    }
  };

  const selectedButtonStyle = {
    my: 2, 
    color: 'white', 
    display: 'block',
    backgroundColor: 'orange'
  };

  const getTopInfo = () => {
    if(loggedIn){
    return (<><a href="/">
      <img src={gokturkLogo} alt="Logo" height="50px" width="50px" />
    </a>
      <Typography
        variant="h6"
        noWrap
        marginLeft={"10px"}
        component="a"
        href="/"
        sx={{
          mr: 2,
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'black',
          textDecoration: 'none',
        }}
      >

        GOKTURKS
      </Typography>

      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: 'block', md: 'none' },
          }}
        >
          {pages.map((page) => (
            <MenuItem key={page} onClick={handleCloseNavMenu}
            >
              <Typography textAlign="center" style={{ color: 'black' }}>{page}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Typography
        variant="h5"
        noWrap
        component="a"
        href="#app-bar-with-responsive-menu"
        sx={{
          mr: 2,
          display: { xs: 'flex', md: 'none' },
          flexGrow: 1,
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'black',
          textDecoration: 'none',
        }}
      >
        GOKTURK
      </Typography>
      {/* This is the part that involves the list of pages on the top; */}

      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        {pages.map((page) => (
          <Button

            key={page}
            onClick={handleCloseNavMenu}
            component={Link} to={locationsDict[page]}
            sx={getButtonStyle(locationsDict[page])
              }
          >
            {page}
          </Button>
        ))}
      </Box></>)
    }else{
      return (<Box flexGrow={1} sx={{alignItems:'center', justifyContent:'center', display:'flex', flexDirection:'row'}}>
      <a href="/">
      <img src={gokturkLogo} alt="Logo" height="50px" width="50px" />
    </a>
      <Typography
        variant="h6"
        noWrap
        marginLeft={"10px"}
        component="a"
        href="/"
        sx={{
          mr: 2,
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'black',
          textDecoration: 'none',
        }}
      >
        GOKTURKS
      </Typography></Box>)
    }
  }

  return (
    <AppBar position="static"
      sx={{
        bgcolor: "white",
        color: "black"
      }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {getTopInfo()}
          {/* This is the settings area on the top right. */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {topRightIcon}
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
              {shownSettings.map((setting) => (
                (setting != 'Logout') ? (
                  <MenuItem key={setting}
                    onClick={handleCloseUserMenu}
                    component={Link} to={locationsDict[setting]}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>)
                  : (<MenuItem key={setting}
                    onClick={logOut}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>)
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavigationBar;