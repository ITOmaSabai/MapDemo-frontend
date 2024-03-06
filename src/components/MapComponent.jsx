import React, { useContext, useState, useEffect } from 'react';
import { Map, Marker } from '@vis.gl/react-google-maps';
import SpotContext from '../contexts/SpotContext';
import SavedMarkerComponent from './SavedMarkerComponent';
import MarkerComponent from './MarkerComponent';

const MapComponent = ({ zoom, center, onClick }) => {
  const {markers, setMarkers} = useContext(SpotContext);
  
  const handleMapOnClick = (e) => {
    onClick(e);
    const lat = parseFloat(e.detail.latLng.lat);
    const lng = parseFloat(e.detail.latLng.lng);
    setMarkers({ lat, lng });
  }
  return (
      <div style={{ height: "90vh", width: "100%" }}>
        <Map
         defaultZoom={zoom}
         defaultCenter={center}
         onClick={handleMapOnClick}
         clickableIcons={false}
         disableDefaultUI
         gestureHandling={'greedy'}
         mapId={process.env.REACT_APP_GOOGLE_MAP_ID}
        >
          {/* {markers && <Marker position={markers} />} */}
          {markers && <MarkerComponent />}
          <SavedMarkerComponent />
        </Map>
      </div>
  );
};

export default MapComponent;