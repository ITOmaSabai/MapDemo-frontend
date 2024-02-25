import React, { useContext, useState } from 'react';
import { Map, Marker } from '@vis.gl/react-google-maps';
import SpotContext from '../contexts/SpotContext';

const MapComponent = ({ zoom, center, onClick }) => {
  const {markers, setMarkers} = useContext(SpotContext);

  const handleMapOnClick = (e) => {
    onClick(e);
    const lat = parseFloat(e.detail.latLng.lat);
    const lng = parseFloat(e.detail.latLng.lng);
    setMarkers({ lat, lng });
  }
  return (
      <div style={{ height: "100vh", width: "100%" }}>
        <Map defaultZoom={zoom} defaultCenter={center} onClick={handleMapOnClick} clickableIcons={false} >
        {markers && <Marker position={markers} />}
        </Map>
      </div>
  );
};

export default MapComponent;