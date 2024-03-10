// "use client";
import './App.css';
import { APIProvider, useMapsLibrary } from '@vis.gl/react-google-maps';
import MarkerPostComponent from './components/MarkerPostComponent';
import { SpotProvider } from './contexts/SpotContext';
import PostSpotForm from './components/PostSpotForm';
import VideoListComponent from './components/VideoListComponent';
import VideoFetcher from './components/VideoFetcher';
import { SelectedMarkerProvider } from './contexts/SelectedMarkerContext';
import { SelectedVideosProvider } from './contexts/SelectedVideosContext';
import { VideosProvider } from './contexts/VideosContext';
import { DataPostedProvider } from './contexts/DataPostedContext';
import StreetviewPanoramaComponent from './components/StreetviewPanoramaComponent';
import { SavedMarkerProvider } from './contexts/SavedMarkerContext';
import AutoCompleteComponent from './components/AutoCompleteComponent';
import SpotSearchBox from './components/SpotSearchBox';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import VideoDialog from './components/VideoDialog';
import { Container, Typography, Box } from '@mui/material';
import CssBaseLine from '@mui/material/CssBaseline'
import { grey, deepPurple } from '@mui/material/colors';
import HeaderAppBar from './components/HeaderAppBar';
import { SidebarDrawerOpenProvider } from './contexts/SidebarDrawerOpenContext';
import SidebarDrawer from './components/SidebarDrawer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import AuthGoogleSIgninPopup from './auth_google_signin_popup';
import UserInfo from './components/UserInfo';
import GetCurrentUserInfo from './components/GetCurrentUserInfo';
import SpotInfo from './components/SpotInfo';
import AddressFetcher from './components/AddressFetcher';
import LikeButton from './components/LikeButton';
import SpotInfoDisplaySwitcher from './components/SpotInfoDisplaySwitcher';

// const color = blueGrey[800];

const theme = createTheme({
  components: {
    MuiStack: {
      defaultProps: {
        useFlexGap: true,
      },
    },
  },
  palette: {
    primary: {
      main: grey[800],
      light: "#FAFAFA",
      dark: "#212121"
    },
    secondary: {
      main: '#FAFAFA',
      light: deepPurple[500],
      dark: grey[800]
    },
  },
  typography: {
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 700,

    h1: { fontSize: 60 },
    h2: { fontSize: 48 },
    h3: { fontSize: 42 },
    h4: { fontSize: 36 },
    h5: { fontSize: 20 },
    h6: { fontSize: 18 },
    subtitle1: { fontSize: 18 },
    body1: { fontSize: 16 },
    button: { textTransform: "none" },
    fontfamily: [
      // 'Hitmarker Text Regular", Arial',
      // '"Helvetica Neue"'
      "Courier New",
      "Menlo",
      "Monaco",
      "Consolas",
      "Noto Sans JP",
      "游ゴシック体"
    ].join(','),
  },
  props: {
    MuiTextField: { variant: "outlined" },
    MuiCheckbox: { color: "primary" },
    MuiRadio: {
        color: "primary"
    },
    MuiSwitch: {
        color: "primary"
    },
    MuiList: {
      dense: true
    },
    MuiTable: {
      size: "small"
    },
  },
  mixins: {
    toolbar: {
      minHeight: 42
    }
},
  //   mode: 'dark'
});

export const RouteComponent = () => {
  const defaultPosition = { lat: 13.749999828728921, lng: 100.5027801676758 }

  return (
    <>
      <Box sx={{ p: 0, m: 0, height: "100vh" }}>
        <HeaderAppBar />
        <SidebarDrawer />
        <Box sx={{ display: "flex", p: 0}}>
          <Box sx={{flex: 1, p: 0}}>
            {/* <VideoListComponent /> */}
            {/* <StreetviewPanoramaComponent /> */}
            {/* <AutoCompleteComponent /> */}
            {/* <VideoDialog /> */}
            <SpotInfoDisplaySwitcher />
          </Box>
          <Box sx={{flex: 3, p: 0}}>
            <MarkerPostComponent zoom={2} position={defaultPosition} />
            <VideoFetcher />
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default function App() {
  return (
    <Router>
    <ThemeProvider theme={theme}>
    <SelectedVideosProvider>
      <SelectedMarkerProvider>
          <SpotProvider>
            <VideosProvider>
              <DataPostedProvider>
                <SavedMarkerProvider>
                  <SidebarDrawerOpenProvider>
                  <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY} language='en'>
                    <CssBaseLine>
                      <div>
                        <Routes>
                          <Route path="/" element={<RouteComponent />} />
                          <Route path="/user" element={<GetCurrentUserInfo />} />
                          {/* <Route path="/login" element={<AuthGoogleSIgninPopup />} /> */}
                        </Routes>
                      </div>
                    </CssBaseLine>
                  </APIProvider>
                  </SidebarDrawerOpenProvider>
                </SavedMarkerProvider>
              </DataPostedProvider>
            </VideosProvider>
          </SpotProvider>
        </SelectedMarkerProvider>
      </SelectedVideosProvider>
    </ThemeProvider>
    </Router>
  );
}
