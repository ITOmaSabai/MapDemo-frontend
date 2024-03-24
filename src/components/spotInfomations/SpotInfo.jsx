import React, { useContext, useEffect, useState } from "react";
import { Box, Card, CardMedia, Stack, Typography, Avatar, Paper } from "@mui/material";
import ClickableAndDeletableChips from "../ClickableAndDeletableChips";
import thumbnail from "../../mqdefault.jpg";
import VideoListComponent from "../VideoListComponent";
import VideoDialog from "../VideoDialog";
import SavedMarkerContext from "../../contexts/SavedMarkerContext";
import SelectedMarkerContext from "../../contexts/SelectedMarkerContext";
import SelectedVideosContext from "../../contexts/SelectedVideosContext";
import SetAddressesContext from "../../contexts/SetAddressesContext";
import AddressFetcher from "../AddressFetcher";
import SelectedAddressContext from "../../contexts/SelectedAddressContext";
import LikeButton from "../LikeButton";
import SpotInfoConfig from "./SpotInfoConfig";

const SpotInfo = () => {
  const { selectedMarker, setSelectedMarker } = useContext(SelectedMarkerContext);
  const { savedMarkers } = useContext(SavedMarkerContext);
  const [ selectedSpotInfomation, setSelectedSpotInfomation ] = useState();
  const {selectedVideos} = useContext(SelectedVideosContext);
  const { selectedAddress } = useContext(SelectedAddressContext);

  useEffect(() => {
    if (savedMarkers && savedMarkers.length > 0) {
      const selectedSpotInfo = savedMarkers.find(savedMarker => savedMarker.id === selectedMarker);
      setSelectedSpotInfomation(selectedSpotInfo);
      }
  }, [selectedMarker, savedMarkers]);

  return (
    <>
      <AddressFetcher />
      <Paper square sx={{bgcolor: "primary.dark", height: "90vh", width:"360px", m: 0, p: 0}}>
        <Box sx={{mx: 1, pt: 2, mb: 2, display: 'flex', flexDirection: "row", justifyContent: "space-between"}} >
          <Box sx={{display: 'flex', flexDirection: "row", height: "100%",}} >
            {selectedSpotInfomation && selectedSpotInfomation.user.avatar ? (
              <Avatar src={selectedSpotInfomation.user.avatar} sx={{mr: 2}} ></Avatar>
            ) : (
              <Avatar sx={{mr: 2}} ></Avatar>)
            }
            <Typography color="primary.light" fontFamily="Menlo" display="flex" alignItems="center" >{selectedSpotInfomation ? selectedSpotInfomation.user.name : ""}</Typography>
          </Box>
          <SpotInfoConfig />
        </Box>
        {selectedVideos && selectedVideos.length > 0 && (
        <iframe width="350" height="200" src={`https://www.youtube.com/embed/${selectedVideos[0].youtube_video_id}`} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        )}
        <Box >
          <Box sx={{pt: 0, mt: 0}}>
            <Typography fontFamily="Menlo" variant="h3" fontWeight={"bold"} sx={{pt: 2, px: 2, color: "white" }}>{selectedSpotInfomation ? selectedSpotInfomation.name : ""}</Typography>
            <Typography fontFamily="Menlo" fontSize={14} sx={{px: 2, py: 1, color: "white" }}>{selectedAddress ? selectedAddress.formatted_address : ""}</Typography>
            {/* <ClickableAndDeletableChips /> */}

            <Typography fontFamily="Noto Sans JP" sx={{p: 2, color: "primary.light" }}>{selectedSpotInfomation ? selectedSpotInfomation.description : ""}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2}}>
          </Box>
        </Box>
        <Box >
          {/* {selectedSpotInfomation ? selectedSpotInfomation.likes.length > 0 : ( */}
            <LikeButton />
        </Box>
      </Paper>
    </>
  )
};

export default SpotInfo;