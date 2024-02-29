import React, { useState, useEffect } from 'react';

const VideoListComponent = () => {




  return (
    <div>
      Video List
      <ul>
        {selectedVideos.map((selectedVideo) => (
          <li key={selectedVideo.id}>
            <iframe width="560" height="315" src={`https://www.youtube.com/embed/${selectedVideo.youtube_video_id}`} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default VideoListComponent;