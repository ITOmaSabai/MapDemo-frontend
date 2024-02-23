"use client";
import './App.css';
import { APIProvider, Map } from '@vis.gl/react-google-maps';


export default function App() {
  const position = { lat: 53.54, lng: 10 }
  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY} >
      <div style={ {height: "100vh"} }>
        <Map zoom={9} center={position}>
        </Map>
      </div>
    </APIProvider>
  );
}
