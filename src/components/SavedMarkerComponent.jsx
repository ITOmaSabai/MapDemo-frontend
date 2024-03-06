import React, { useState, useEffect, useContext, useRef } from 'react';
import { AdvancedMarker, Marker, Pin, useMap } from '@vis.gl/react-google-maps';
import SelectedMarkerContext from '../contexts/SelectedMarkerContext';
import { useDataPosted } from '../contexts/DataPostedContext';
import SavedMarkerContext from '../contexts/SavedMarkerContext';
import { MarkerClusterer } from '@googlemaps/markerclusterer'

const SavedMarkerComponent = () => {
  // const [savedMarkers, setSavedMarkers] = useState([]);
  const { setSelectedMarker } = useContext(SelectedMarkerContext);
  const { isDataPosted, setIsDataPosted } = useDataPosted();
  const { savedMarkers, setSavedMarkers } = useContext(SavedMarkerContext);

  useEffect(() => {
    // fetch('https://mapdemo-backend.onrender.com/api/v1/maps')
    fetch('http://localhost:3000/api/v1/maps')
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

  const map = useMap();
  const clusterer = useRef(null);
  const [markers, setMarkers] = useState({});

  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }

  }, [map]);

  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  },[markers])

  const setMarkerRef = (marker, key) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;
    setMarkers(prev => {
      if (marker) {
        return {...prev, [key]: marker};
      } else {
        const newMarkers = {...prev};
        delete newMarkers[key];
        return newMarkers;
      }
    })
  }

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
          ref={marker => setMarkerRef(marker, savedMarker.id)}
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