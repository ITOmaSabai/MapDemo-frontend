import React, { useState, useEffect } from 'react';
import { Marker } from '@vis.gl/react-google-maps';

const SavedMarkerComponent = () => {
  const [savedMarkers, setSavedMarkers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/maps')
      .then(response => response.json())
      .then(data => {
        setSavedMarkers(data)
      })
      .catch(error => console.error('Error:', error));
  }, [savedMarkers]);



  return (
    <>
      {savedMarkers.map((savedMarker) => (
        <Marker key={savedMarker.id} position={{lat: savedMarker.lat, lng:savedMarker.lng}} />
        ))}
    </>
  )
};

export default SavedMarkerComponent;