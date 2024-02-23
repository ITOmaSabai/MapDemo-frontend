import React, { useState } from 'react';
import { Map, Marker } from '@vis.gl/react-google-maps';

const MapComponent = ({ zoom, center, onClick }) => {
  const [markers, setMarkers] = useState([]);

  const handleMapOnClick = (e) => {
    onClick(e);
    const lat = parseFloat(e.detail.latLng.lat);
    const lng = parseFloat(e.detail.latLng.lng);
    setMarkers([...markers, { lat, lng }]);
    console.log(lat)

  }
  return (
    // <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}>
      <div style={{ height: "100vh", width: "100%" }}>
        <Map zoom={zoom} center={center} onClick={handleMapOnClick} >
        {markers.map((marker, index) => (
        <Marker position={marker} key={index}> </Marker>
        ))}
        </Map>
      </div>
    // </APIProvider> 
  );
};

export default MapComponent;