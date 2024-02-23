// "use client";
import './App.css';
import { APIProvider } from '@vis.gl/react-google-maps';
import MarkerPostComponent from './components/MarkerPostComponent';


export default function App() {
  const position = { lat: 53.54, lng: 10 }
  return (
      <div >
        <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}>
          <MarkerPostComponent zoom={8} position={position} />
          {/* <MapComponent zoom={9} position={position} ></MapComponent> */}
        </APIProvider>
      </div>
  );
}
