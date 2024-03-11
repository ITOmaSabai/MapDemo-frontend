import React, { useContext } from 'react';
import SelectedVideosContext from '../contexts/SelectedVideosContext';
import VideoDialog from './VideoDialog';
import ReverseGeocodingComponent from './ReverseGeocodingComponent';
import { Box, Stack } from '@mui/material';

const VideoListComponent = () => {
  const {selectedVideos} = useContext(SelectedVideosContext);

  return (
    <div>
      <ReverseGeocodingComponent/>
      <Box sx={{m: 0, p: 0, }} display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
     {selectedVideos && selectedVideos.length > 0 && ( 
      <>
         {selectedVideos.map((selectedVideo) => (
            <iframe key={selectedVideo.id} width="150" height="100" src={`https://www.youtube.com/embed/${selectedVideo.youtube_video_id}`} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
         ))}
       </>
      )}
      </Box>
    </div>
  )
}

export default VideoListComponent;