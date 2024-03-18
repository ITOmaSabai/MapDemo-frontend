import React, { useState, useEffect, useContext, useRef } from 'react';
import { AdvancedMarker, Marker, Pin, useMap } from '@vis.gl/react-google-maps';
import SelectedMarkerContext from '../contexts/SelectedMarkerContext';
import { useDataPosted } from '../contexts/DataPostedContext';
import SavedMarkerContext from '../contexts/SavedMarkerContext';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import marker from '@googlemaps/markerclusterer';
import SpotContext from '../contexts/SpotContext';
import IsSavedMarkerSelectedContext from '../contexts/IsSavedMarkerSelectedContext';
import IsNewMarkerSelectedContext from '../contexts/IsNewMarkerSelectedContext';
import IsTopInfoVisibleContext from '../contexts/IsTopInfoVisibleContext';

const SavedMarkerComponent = () => {
  const { setSelectedMarker } = useContext(SelectedMarkerContext);
  const { isDataPosted, setIsDataPosted } = useDataPosted();
  const { savedMarkers, setSavedMarkers } = useContext(SavedMarkerContext);
  const { setMarkers } = useContext(SpotContext);
  const { setIsSavedMarkerSelected } = useContext(IsSavedMarkerSelectedContext);
  const { setIsNewMarkerSelected } = useContext(IsNewMarkerSelectedContext);
  const { setIsTopInfoVisible } = useContext(IsTopInfoVisibleContext);

  useEffect(() => {
    // fetch('https://mapdemo-backend.onrender.com/api/v1/maps')
    fetch(`${process.env.RAILS_API_ENDPOINT}/api/v1/maps`)
      .then(response => response.json())
      .then(data => {
        setSavedMarkers(data);
        setIsDataPosted(false);
      })
      .catch(error => console.error('Error:', error));
  }, [isDataPosted]);

  const map = useMap();

  const handleMarkerClick = (id, lat, lng) => {
    // 既存のスポットの情報画面を表示する
    setIsSavedMarkerSelected(true);
    // 新規登録用の画面を表示しない
    setIsNewMarkerSelected(false);
    // 最初に表示する情報画面を表示しない
    setIsTopInfoVisible(false);

    setSelectedMarker(id);
    map.panTo({lat, lng});
    const currentZoomLevel = map.getZoom();

    const zoomToMarker = (zoomLevel) => {
      // window.setTimeout(() => {
      //   map.setZoom(zoomLevel);
      // }, 300);
    }

    if (currentZoomLevel < 5) {
      zoomToMarker(5);
    } else if (currentZoomLevel < 9) {
      zoomToMarker(9);
    } else if (currentZoomLevel < 12) {
      zoomToMarker(12);
    } else {
      zoomToMarker(16);
    };
  };



  // クラスター機能を実装する
  // const map = useMap();
  // const clusterer = useRef(null);
  // const [markers, setMarkers] = useState({});

  // useEffect(() => {
    // mapインスタンスが存在し、clustererが存在しない場合、MarkerClustererインスタンスを生成する
  //   if (!map) return;
  //   if (!clusterer.current) {
  //     clusterer.current = new MarkerClusterer({ map });
  //   }
  // }, [map]);

  // useEffect(() => {

  // }, [markers])

  // useEffect(() => {
    // markersが変化した場合に、markersを一度全て削除し、markersを追加する
  //   clusterer.current?.clearMarkers();
  //   clusterer.current?.addMarkers(Object.values(markers));
  // },[markers])

  // const setMarkerRef = (marker, key) => {
  //   if (marker && markers[key]) return;
  //   if (!marker && !markers[key]) return;
    // 以前の状態をmarkersにセットする
    // setMarkers(prev => {
      // markerが存在する場合
      // if (marker) {
        // 以前の状態のコピーに、新しいmarkerのキーを持つmarkerを追加する
      //   return {...prev, [key]: marker};
      // } else {
        // markerが存在しない場合、前の状態のコピーから、新しいmarkerを削除する
  //       const newMarkers = {...prev};
  //       delete newMarkers[key];
  //       return newMarkers;
  //     }
  //   })
  // }

  return (
    <>
      {savedMarkers.map((savedMarker) => (
        <AdvancedMarker
          key={savedMarker.id} 
          position={{lat: savedMarker.lat, lng:savedMarker.lng}}
          onClick={() => handleMarkerClick(savedMarker.id, savedMarker.lat, savedMarker.lng)}
          // ref={(marker) => setMarkerRef(marker, savedMarker.id)}
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