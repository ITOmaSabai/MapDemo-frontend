import React from 'react';
import { Marker } from '@vis.gl/react-google-maps';

const MarkerComponent = ({ position }) => {
  return <Marker position={position} />;
};

export default MarkerComponent;