import React, { useContext, useState, useEffect } from 'react';
import { Map, Marker } from '@vis.gl/react-google-maps';
import SpotContext from '../contexts/SpotContext';
import SavedMarkerComponent from './SavedMarkerComponent';
import MarkerComponent from './MarkerComponent';
import { Box } from '@mui/material'
import IsNewMarkerSelectedContext from '../contexts/IsNewMarkerSelectedContext';
import IsSavedMarkerSelectedContext from '../contexts/IsSavedMarkerSelectedContext';
import IsTopInfoVisibleContext from '../contexts/IsTopInfoVisibleContext';

const MapComponent = ({ zoom, center, onClick }) => {
  const { markers, setMarkers } = useContext(SpotContext);
  const { setIsNewMarkerSelected } = useContext(IsNewMarkerSelectedContext);
  const { setIsSavedMarkerSelected } = useContext(IsSavedMarkerSelectedContext);
  const { setIsTopInfoVisible } = useContext(IsTopInfoVisibleContext);
  
  const handleMapOnClick = (e) => {
    onClick(e);
    // 新規投稿用の画面を表示する
    setIsNewMarkerSelected(true);
    // 投稿済みスポットの情報画面を表示しない
    setIsSavedMarkerSelected(false);
    // 最初に表示する情報画面を表示しない
    setIsTopInfoVisible(false);
    const lat = parseFloat(e.detail.latLng.lat);
    const lng = parseFloat(e.detail.latLng.lng);
    // SpotContextに座標をセットする
    setMarkers({ lat, lng });
  }
  return (
    <Box sx={{ height: "90vh", width: "100%", p: 0 }}>
        <Map
         defaultZoom={zoom}
         defaultCenter={center}
         onClick={handleMapOnClick}
         clickableIcons={false}
         disableDefaultUI
         gestureHandling={'greedy'}
         mapId={process.env.REACT_APP_GOOGLE_MAP_ID}
         minZoom={zoom + 0}
         maxZoom={zoom + 14}
        >
          {/* {markers && <Marker position={markers} />} */}
          {markers && <MarkerComponent />}
          <SavedMarkerComponent />
        </Map>
      </Box>
  );
};

export default MapComponent;