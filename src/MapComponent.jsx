import React from 'react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';

const MapComponent = ({ position, zoom }) => {
  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}>
      <div style={{ height: "100vh", width: "100%" }}>
        <Map zoom={zoom} center={position}>
        </Map>
      </div>
    </APIProvider>
  );
};

export default MapComponent;