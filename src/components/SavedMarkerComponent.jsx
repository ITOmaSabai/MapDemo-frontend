import React, { useState, useEffect } from 'react';
import { Marker } from '@vis.gl/react-google-maps';
import { useContext } from 'react';
import SelectedMarkerContext from '../contexts/SelectedMarkerContext';
import { useDataPosted } from '../contexts/DataPostedContext';

const SavedMarkerComponent = () => {
  const [savedMarkers, setSavedMarkers] = useState([]);
  const { setSelectedMarker } = useContext(SelectedMarkerContext);
  const { isDataPosted, setIsDataPosted } = useDataPosted();

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/maps')
      .then(response => response.json())
      .then(data => {
        setSavedMarkers(data);
        setIsDataPosted(false);
      })
      .catch(error => console.error('Error:', error));
  }, [isDataPosted]);

  const handleMarkerClick = (id) => {
    // すべてのvideoから、map_idがクリックされたMarkerのmap.idと等しいものを抜き出し、videoに代入
    // const video = videos.find(v => v.map_id === id);
    // videoContextが必要
    // setSelectedVideos(video);
    setSelectedMarker(id);
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