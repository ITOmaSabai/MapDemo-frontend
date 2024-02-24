// "use client";
import './App.css';
import { APIProvider } from '@vis.gl/react-google-maps';
import MarkerPostComponent from './components/MarkerPostComponent';
import { SpotProvider } from './contexts/SpotContext';
import PostSpotForm from './components/PostSpotForm';

export default function App() {
  const defaultPosition = { lat: 13.749999828728921, lng: 100.5027801676758 }
  return (
        <SpotProvider>
      <div >
          <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}>
            <MarkerPostComponent zoom={10} position={defaultPosition} />
            <PostSpotForm />
          </APIProvider>
      </div>
        </SpotProvider>
  );
}
