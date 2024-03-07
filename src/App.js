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
import { grey } from '@mui/material/colors';
import PrimarySearchAppBar from './components/PrimarySearchAppBar';

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
    },
    secondary: {
      main: '#5c6bc0',
    },
  //   mode: 'dark'
  }
});

export default function App() {
  const defaultPosition = { lat: 13.749999828728921, lng: 100.5027801676758 }
  return (
    <ThemeProvider theme={theme}>
    <SelectedVideosProvider>
      <SelectedMarkerProvider>
          <SpotProvider>
            <VideosProvider>
              <DataPostedProvider>
                <SavedMarkerProvider>
                  <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY} language='en'>
                    <CssBaseLine>
                    <Box sx={{ px: 0, height: "100vh" }}>
                      <PrimarySearchAppBar>
                      <Typography variant='h3' sx={{ my: 4, textAlign: "center" }}>
                        BackHacker
                    <Box sx={{ display: "flex", px: 1}}>
                    <Box sx={{flex: 1, px: 1}}>
                        <SpotSearchBox/>
                        <VideoListComponent />
                        <PostSpotForm />
                        {/* <StreetviewPanoramaComponent /> */}
                        {/* <AutoCompleteComponent /> */}
                        <VideoDialog />
                    </Box>
                      <Box sx={{flex: 3, px: 1}}>
                        <MarkerPostComponent zoom={2} position={defaultPosition} />
                        <VideoFetcher />
                      </Box>
                    </Box>
                    </Typography>
                    </PrimarySearchAppBar>
                    </Box>
                    </CssBaseLine>
                  </APIProvider>
                </SavedMarkerProvider>
              </DataPostedProvider>
            </VideosProvider>
          </SpotProvider>
        </SelectedMarkerProvider>
      </SelectedVideosProvider>
    </ThemeProvider>
  );
}
