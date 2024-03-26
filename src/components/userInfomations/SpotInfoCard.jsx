import React, { useContext, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SelectedMarkerContext from '../../contexts/SelectedMarkerContext';
import SavedMarkerContext from '../../contexts/SavedMarkerContext';
import SelectedVideosContext from '../../contexts/SelectedVideosContext';
import SelectedAddressContext from '../../contexts/SelectedAddressContext';
import AddressFetcher from '../AddressFetcher';
import { Avatar, Paper, Stack } from '@mui/material';
import SpotInfoConfig from '../spotInfomations/SpotInfoConfig';
import LikeButton from '../Likes/LikeButton';
import useFirebaseAuth from "../../Hooks/useFirebasAuth";

export default function SpotInfoCard() {
  const { savedMarkers, setSavedMarkers } = useContext(SavedMarkerContext);
  const [ spotsByCurrentUser, setSpotsByCurrentUser ] = useState();
  const {selectedVideos} = useContext(SelectedVideosContext);
  const { selectedAddress } = useContext(SelectedAddressContext);
  const { currentUser } = useFirebaseAuth();

  console.log("SpotCardでのcurrentUser", currentUser)
  console.log("SpotCardでのsavedMarkers", savedMarkers)

  useEffect(() => {
    if (savedMarkers && savedMarkers.length > 0 && currentUser) {
      // mapする?
      const spotByCurrentUser = savedMarkers.filter(savedMarker => savedMarker.uid === currentUser.uid);
      setSpotsByCurrentUser(spotByCurrentUser);
      }
      console.log("currentUserに投稿された:", spotsByCurrentUser)
  }, [savedMarkers, currentUser]);


  useEffect(() => {
    fetch(`${process.env.REACT_APP_RAILS_API_ENDPOINT}/api/v1/maps`,
    {
      headers: {'Content-Type': 'application/json'}
    })
      .then(response => response.json())
      .then(data => {
        setSavedMarkers(data);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <>
      <AddressFetcher />
        <Stack direction="row" spacing={5} useFlexGap flexWrap={"wrap"} alignItems={"center"}>
          {spotsByCurrentUser ? (spotsByCurrentUser.map(spot => (
            <Paper square sx={{bgcolor: "primary.dark", minHeight: "80vh", width:"360px", m: 0, p: 0}}>
              <Box sx={{mx: 1, pt: 2, mb: 2, display: 'flex', flexDirection: "row", justifyContent: "space-between"}} >
                <Box sx={{display: 'flex', flexDirection: "row", height: "100%",}} >
                  {spot && spot.user.avatar ? (
                    <Avatar src={spot.user.avatar} sx={{mr: 2}} ></Avatar>
                  ) : (
                    <Avatar sx={{mr: 2}} ></Avatar>)
                  }
                  <Typography color="primary.light" fontFamily="Menlo" display="flex" alignItems="center" >{spot ? spot.user.name : ""}</Typography>
                </Box>
                <SpotInfoConfig />
              </Box>
              {spot.videos && spot.videos.length > 0 && (
                <iframe width="350" height="200" src={`https://www.youtube.com/embed/${spot.videos[0].youtube_video_id}`} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              )}
              <Box >
              <Box sx={{pt: 0, mt: 0, overflow: "auto", minHeight: 190, maxHeight: 220}}>
                <Typography fontFamily="Menlo" variant="h3" fontWeight={"bold"} sx={{pt: 2, px: 2, color: "white" }}>{spot ? spot.name : ""}</Typography>
                <Box sx={{maxHeight: 50, overflow: "auto"}}>
                  <Typography Typography fontFamily="Menlo" fontSize={14} sx={{px: 2, py: 1, color: "white" }}>{spot ? spot.address.formatted_address : ""}</Typography>
                </Box>
                <Box sx={{maxHeight: 90, overflow: "auto"}}>
                  <Typography fontFamily="Noto Sans JP" sx={{p: 2, color: "primary.light" }}>{spot ? spot.description : ""}</Typography>
                </Box>
              </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2}}>
                </Box>
              </Box>
              <Box >
                  <LikeButton disabled={true} likesCount={spot.likes.length} />
              </Box>
            </Paper>
          ))
        ) : (
          <Typography>投稿したスポットはありません</Typography>
        )}
      </Stack>
    </>
  )
};
