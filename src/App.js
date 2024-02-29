// "use client";
import './App.css';
import { APIProvider } from '@vis.gl/react-google-maps';
import MarkerPostComponent from './components/MarkerPostComponent';
import { SpotProvider } from './contexts/SpotContext';
import PostSpotForm from './components/PostSpotForm';
import VideoListComponent from './components/VideoListComponent';
import VideoFetcher from './components/VideoFetcher';

export default function App() {
  const defaultPosition = { lat: 13.749999828728921, lng: 100.5027801676758 }
  return (
        <SpotProvider>
      <div >
          <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY} language='en'>
            <MarkerPostComponent zoom={10} position={defaultPosition} />
            <PostSpotForm />
            <VideoFetcher />
            <VideoListComponent />
          </APIProvider>
      </div>
        </SpotProvider>
  );
}
