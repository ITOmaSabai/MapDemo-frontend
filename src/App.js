// "use client";
import './App.css';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import MapComponent from './components/MapComponent';
import MarkerPostComponent from './components/MarkerPostComponent';


export default function App() {
  const position = { lat: 53.54, lng: 10 }
  return (
      <div >
        <MarkerPostComponent zoom={9} position={position} ></MarkerPostComponent>
        {/* <MapComponent zoom={9} position={position} ></MapComponent> */}
      </div>
  );
}
