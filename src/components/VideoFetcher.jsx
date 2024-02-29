import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import VideoContext from '../contexts/VideosContext';
import SelectedVideosContext from '../contexts/SelectedVideosContext';

const VideoFetcher = () => {
  const {videos, setVideos} = useContext(VideoContext);
  const {selectedVideos, setSelectedVideos} = useContext(SelectedVideosContext);

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/videos')
      .then(response => response.json())
      .then(data => setVideos(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return null;
}

export default VideoFetcher;
