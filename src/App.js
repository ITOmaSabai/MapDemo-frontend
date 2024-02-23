// "use client";
import './App.css';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import MapComponent from './MapComponent';


export default function App() {
  const position = { lat: 53.54, lng: 10 }
  return (
      <div >
        <MapComponent zoom={9} position={position} ></MapComponent>
      </div>
  );
}
