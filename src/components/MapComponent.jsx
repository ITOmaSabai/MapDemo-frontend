import React, { useContext, useState } from 'react';
import { Map, Marker } from '@vis.gl/react-google-maps';
import SpotContext from '../contexts/SpotContext';
import SavedMarkerComponent from './SavedMarkerComponent';

const MapComponent = ({ zoom, center, onClick }) => {
  const {markers, setMarkers} = useContext(SpotContext);

  const handleMapOnClick = (e) => {
    onClick(e);
    const lat = parseFloat(e.detail.latLng.lat);
    const lng = parseFloat(e.detail.latLng.lng);
    setMarkers({ lat, lng });
  }
  return (
      <div style={{ height: "80vh", width: "100%" }}>
        <Map defaultZoom={zoom} defaultCenter={center} onClick={handleMapOnClick} clickableIcons={false} >
        {markers && <Marker position={markers} />}
        {<SavedMarkerComponent />}
        </Map>
      </div>
  );
};

export default MapComponent;