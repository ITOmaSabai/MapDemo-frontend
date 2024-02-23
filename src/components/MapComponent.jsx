import React, { useState } from 'react';
import { Map, Marker } from '@vis.gl/react-google-maps';

const MapComponent = ({ zoom, center, onClick }) => {
  const [markers, setMarkers] = useState();

  const handleMapOnClick = (e) => {
    onClick(e);
    const lat = parseFloat(e.detail.latLng.lat);
    const lng = parseFloat(e.detail.latLng.lng);
    setMarkers({ lat, lng });
  }
  return (
      <div style={{ height: "100vh", width: "100%" }}>
        <Map zoom={zoom} center={center} onClick={handleMapOnClick} >
        <Marker position={markers} > </Marker>
        </Map>
      </div>
  );
};

export default MapComponent;