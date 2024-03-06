import React, { useEffect } from 'react';
import { useContext } from 'react';
import VideosContext from '../contexts/VideosContext';
import SelectedVideosContext from '../contexts/SelectedVideosContext';
import SelectedMarkerContext from '../contexts/SelectedMarkerContext';
import { useDataPosted } from '../contexts/DataPostedContext';

const VideoFetcher = () => {
  const {videos, setVideos} = useContext(VideosContext);
  const {setSelectedVideos} = useContext(SelectedVideosContext);
  const {selectedMarker} = useContext(SelectedMarkerContext);
  const { isDataPosted } = useDataPosted();

  useEffect(() => {
    // fetch('https://mapdemo-backend.onrender.com/api/v1/videos')
    fetch('http://localhost:3000/api/v1/videos')
      .then(response => response.json())
      .then(data => setVideos(data))
      .catch(error => console.error('Error:', error));
  }, [setVideos, isDataPosted]);

  useEffect(() => {
      const matchedVideos = videos ? videos.filter(v => v.map_id === selectedMarker) : [];
      setSelectedVideos(matchedVideos);
  }, [videos, selectedMarker, setSelectedVideos, isDataPosted])

  return null;
};

export default VideoFetcher;
