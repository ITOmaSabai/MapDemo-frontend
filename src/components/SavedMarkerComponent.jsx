import React, { useState, useEffect } from 'react';
import { Marker } from '@vis.gl/react-google-maps';
import { useContext } from 'react';
import SelectedMarkerContext from '../contexts/SelectedMarkerContext';

const SavedMarkerComponent = () => {
  const [savedMarkers, setSavedMarkers] = useState([]);
  const { setSelectedMarkers } = useContext(SelectedMarkerContext);

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/maps')
      .then(response => response.json())
      .then(data => {
        setSavedMarkers(data)
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const handleMarkerClick = (id) => {
    // すべてのvideoから、map_idがクリックされたMarkerのmap.idと等しいものを抜き出し、videoに代入
    // const video = videos.find(v => v.map_id === id);
    // videoContextが必要
    // setSelectedVideos(video);
    setSelectedMarkers(id);
  };

  return (
    <>
      {savedMarkers.map((savedMarker) => (
        <Marker 
          key={savedMarker.id} 
          id={savedMarker.id} 
          position={{lat: savedMarker.lat, lng:savedMarker.lng}}
          onClick={() => handleMarkerClick(savedMarker.id)}
        />
        ))}
    </>
  )
};

export default SavedMarkerComponent;