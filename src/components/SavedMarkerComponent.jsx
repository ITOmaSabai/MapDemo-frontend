import React, { useState, useEffect, useContext } from 'react';
import { AdvancedMarker, Marker, Pin } from '@vis.gl/react-google-maps';
import SelectedMarkerContext from '../contexts/SelectedMarkerContext';
import { useDataPosted } from '../contexts/DataPostedContext';
import SavedMarkerContext from '../contexts/SavedMarkerContext';

const SavedMarkerComponent = () => {
  // const [savedMarkers, setSavedMarkers] = useState([]);
  const { setSelectedMarker } = useContext(SelectedMarkerContext);
  const { isDataPosted, setIsDataPosted } = useDataPosted();
  const { savedMarkers, setSavedMarkers } = useContext(SavedMarkerContext);

  useEffect(() => {
    fetch('https://mapdemo-backend.onrender.com/api/v1/maps')
      .then(response => response.json())
      .then(data => {
        setSavedMarkers(data);
        setIsDataPosted(false);
      })
      .catch(error => console.error('Error:', error));
  }, [isDataPosted]);

  const handleMarkerClick = (id) => {
    setSelectedMarker(id);
  };

  return (
    <>
      {/* {savedMarkers.map((savedMarker) => (
        <Marker 
          key={savedMarker.id} 
          id={savedMarker.id} 
          position={{lat: savedMarker.lat, lng:savedMarker.lng}}
          onClick={() => handleMarkerClick(savedMarker.id)}
        />
        ))} */}
      {savedMarkers.map((savedMarker) => (
        <AdvancedMarker
          key={savedMarker.id} 
          position={{lat: savedMarker.lat, lng:savedMarker.lng}}
          onClick={() => handleMarkerClick(savedMarker.id)}
        >
          <Pin
            background={'#22ccff'}
            borderColor={'#1e89a1'}
            glyphColor={'#0f677a'}
          >
          </Pin>
        </AdvancedMarker>
    ))}
    </>
  )
};

export default SavedMarkerComponent;