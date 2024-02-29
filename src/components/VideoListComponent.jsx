import React, { useState, useEffect } from 'react';

const VideoListComponent = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/videos')
      .then(response => response.json())
      .then(data => setVideos(data))
      .catch(error => console.error('Error:', error));
    console.log(videos);
  }, []);

  return (
    <div>
      Video List
      <ul>
        {videos.map((video) => (
          <li key={video.id}>
            <iframe width="560" height="315" src={`https://www.youtube.com/embed/${video.youtube_video_id}`} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            {/* <div>{video.youtube_video_id}</div> */}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default VideoListComponent;