// "use client";
import './App.css';
import { APIProvider } from '@vis.gl/react-google-maps';
import MarkerPostComponent from './components/MarkerPostComponent';
import { SpotProvider } from './contexts/SpotContext';
import PostSpotForm from './components/PostSpotForm';
import VideoListComponent from './components/VideoListComponent';
import VideoFetcher from './components/VideoFetcher';
import { SelectedMarkerProvider } from './contexts/SelectedMarkerContext';
import { SelectedVideosProvider } from './contexts/SelectedVideosContext';
import { VideosProvider } from './contexts/VideosContext';

export default function App() {
  const defaultPosition = { lat: 13.749999828728921, lng: 100.5027801676758 }
  return (
    <SelectedVideosProvider>
      <SelectedMarkerProvider>
          <SpotProvider>
            <VideosProvider>
                  <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY} language='en'>
              <div style={{display: "flex", padding: "5px"}}>
              <div style={{flex: 3}}>
                    <MarkerPostComponent zoom={2} position={defaultPosition} />
                    <PostSpotForm />
                    <VideoFetcher />
                    </div>
                    <div style={{flex: 1}}>
                    <VideoListComponent />
                    </div>
              </div>
                  </APIProvider>
            </VideosProvider>
          </SpotProvider>
        </SelectedMarkerProvider>
      </SelectedVideosProvider>
  );
}
