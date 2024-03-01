import React, { useEffect } from 'react';
import { useContext } from 'react';
import VideosContext from '../contexts/VideosContext';
import SelectedVideosContext from '../contexts/SelectedVideosContext';
import SelectedMarkerContext from '../contexts/SelectedMarkerContext';

const VideoFetcher = () => {
  const {videos, setVideos} = useContext(VideosContext) || { videos: [] };
  const {setSelectedVideos} = useContext(SelectedVideosContext) || { SelectedVideos: [] };
  const {selectedMarker} = useContext(SelectedMarkerContext) || { selectedMarker: [] };

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/videos')
      .then(response => response.json())
      .then(data => setVideos(data))
      .catch(error => console.error('Error:', error));
  }, [setVideos]);

  useEffect(() => {
      const matchedVideos = videos ? videos.filter(v => v.map_id === selectedMarker) : [];
      // console.log(matchedVideos)s
      setSelectedVideos(matchedVideos);
  }, [videos, selectedMarker, setSelectedVideos])

  return null;
};

export default VideoFetcher;
