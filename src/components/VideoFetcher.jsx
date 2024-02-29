import React, { useState, useEffect } from 'react';

const VideoFetcher = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/videos')
      .then(response => response.json())
      .then(data => setVideos(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return null;
}

export default VideoFetcher;
