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
import AutoCompleteComponent from './components/AutoCompleteComponent';
import { SavedMarkerProvider } from './contexts/SavedMarkerContext';
import AutoCompleteComponent from './components/AutoCompleteComponent';
import SpotSearchBox from './components/SpotSearchBox';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiStack: {
      defaultProps: {
        useFlexGap: true,
      },
    },
  },
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
                    <div style={{display: "flex", padding: "5px"}}>
                    <div style={{flex: 1}}>
                        <SpotSearchBox/>
                        <VideoListComponent />
                        <PostSpotForm />
                        {/* <StreetviewPanoramaComponent /> */}
                        {/* <AutoCompleteComponent /> */}
                      </div>
                      <div style={{flex: 3}}>
                        <MarkerPostComponent zoom={2} position={defaultPosition} />
                        <VideoFetcher />
                      </div>
                    </div>
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
