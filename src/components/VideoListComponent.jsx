import React, { useContext } from 'react';
import SelectedVideosContext from '../contexts/SelectedVideosContext';
import VideoDialog from './VideoDialog';
import ReverseGeocodingComponent from './ReverseGeocodingComponent';

const VideoListComponent = () => {
  const {selectedVideos} = useContext(SelectedVideosContext);

  return (
    <div>
      <ReverseGeocodingComponent/>
     {selectedVideos && selectedVideos.length > 0 && ( 
       <ul style={{margin :"0", padding: "0"}}>
         {selectedVideos.map((selectedVideo) => (
           <li key={selectedVideo.id} style={{listStyle :"none"}}>
             <iframe width="350" height="200" src={`https://www.youtube.com/embed/${selectedVideo.youtube_video_id}`} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
           </li>
         ))}
       </ul>
      )}
    </div>
  )
}

export default VideoListComponent;