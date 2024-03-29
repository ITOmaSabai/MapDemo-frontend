import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import SpotSearchBox from './SpotSearchBox';
import AuthGoogleSIgninPopup from '../auth_google_signin_popup';
import { Link } from 'react-router-dom';
import SignInButton from './SignInButton';
import AuthSignOut from '../auth_sign_out';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import BackpackIcon from '@mui/icons-material/Backpack';
import LanguageIcon from '@mui/icons-material/Language';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import useFirebaseAuth from '../Hooks/useFirebasAuth';
import { Avatar } from '@mui/material';
import { ShareButton } from './ShareButton';
import XIcon from '@mui/icons-material/X';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function HeaderAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const { currentUser } = useFirebaseAuth();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleSignIn = () => {
    AuthGoogleSIgninPopup();
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const URL = "https://map-demo-frontend.vercel.app/";
  const url = !currentUser ?
  `https://twitter.com/share?url=${URL} (※PC💻環境より閲覧してください)&text=【BackHacker.】世界を飛び回ろう✈️%0a%0a` :
  `https://twitter.com/share?url=${URL} (※PC💻環境より閲覧してください)&text=${currentUser.displayName}は【BackHacker.】で旅をしています🌎%0a%0a`;

  // ヘッダー右のアイコン部分
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      { currentUser ? (
        <div>
          <Link to="/user" style={{color: "inherit", textDecoration: "none"}}>
            <MenuItem onClick={handleMenuClose}>
              <AccountCircleIcon sx={{ mr: 1}}/>
              <Typography fontFamily={"Noto Sans JP"} fontWeight={"bold"}>
                プロフィール
              </Typography>
            </MenuItem>
          </Link>
          <MenuItem sx={{textAlign: "center"}}>
            <Typography fontFamily={"Noto Sans JP"} fontWeight={"bold"}>
              <AuthSignOut />
            </Typography>
          </MenuItem>
        </div>
      ) : (
        <MenuItem sx={{textAlign: "center"}}>
          <Typography fontFamily={"Noto Sans JP"} fontWeight={"bold"}>
            <SignInButton variant={"none"} color={"none"} />
          </Typography>
        </MenuItem>
      )}
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label="share this App on X."
          color="inherit"
        >
          <XIcon />
          {/* <ShareButton /> */}
        </IconButton>
        Notifications
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        Notifications
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/" style={{color: "inherit", textDecoration: "none"}}>
            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
              fontFamily="Menlo"
            >
              BackHacker.
            </Typography>
          </Link>
          <Link to="/" style={{color: "inherit", textDecoration: "none"}}>
            <Box sx={{ml: 3, mt: 1}}>
              <LaptopMacIcon sx={{mr: 1, fontSize: 20}}></LaptopMacIcon>
              <CloseIcon sx={{mr: 1, fontSize: 20}}></CloseIcon>
              <BackpackIcon sx={{mr: 1, fontSize: 20}}></BackpackIcon>
              <CloseIcon sx={{mr: 1, fontSize: 20}}></CloseIcon>
              <LanguageIcon sx={{mr: 1, fontSize: 20}}></LanguageIcon>
            </Box>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {/* <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <Search>
                <SpotSearchBox >
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </SpotSearchBox>
              </Search> */}
              <IconButton
                size="small"
                aria-label="share this App on X."
                color="inherit"
                alignItems="center"
                sx={{mr: 2}}
              >
                <ShareButton url={url} fontSize={'5px'} />
              </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              sx={{mb: 0.5}}
            >
              <Badge color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {currentUser ?
                <Avatar
                  src={`${currentUser.photoURL}`}
                  alt={`${currentUser.displayName}`}
                  sx={{width: "25px", height: "25px"}}
                />
              :
                <AccountCircle fontSize='20px' />
              }
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}