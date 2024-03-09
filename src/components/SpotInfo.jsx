import React, { useContext, useEffect, useState } from "react";
import { Box, Card, CardMedia, Stack, Typography, Avatar, Paper } from "@mui/material";
import ClickableAndDeletableChips from "./ClickableAndDeletableChips";
import thumbnail from "../mqdefault.jpg";
import VideoListComponent from "./VideoListComponent";
import VideoDialog from "./VideoDialog";
import SavedMarkerContext from "../contexts/SavedMarkerContext";
import SelectedMarkerContext from "../contexts/SelectedMarkerContext";

const SpotInfo = () => {
  const { selectedMarker, setSelectedMarker } = useContext(SelectedMarkerContext);
  const { savedMarkers } = useContext(SavedMarkerContext);
  const [ selectedSpotInfomation, setSelectedSpotInfomation ] = useState({}
    // selectedSpotName: selectedSpotInfo.name
  );
  console.log(selectedSpotInfomation);
  console.log(savedMarkers);
  console.log(selectedMarker);

  useEffect(() => {
    if (savedMarkers && savedMarkers.length > 0) {
      const selectedSpotInfo = savedMarkers.find(savedMarker => savedMarker.id === selectedMarker);
      setSelectedSpotInfomation(selectedSpotInfo);
      }
  }, [selectedMarker]);

  return (
    <Paper sx={{bgcolor: "primary.dark", height: "100%", m: 0, p: 0}}>
      <Box sx={{mx: 3, py: 1, md: 'flex', flexDirection: "row"}} display={"flex"}>
        <Avatar sx={{ bgcolor: "secondary.light" }} >OP</Avatar>
        <Typography color={"primary.light"}>いとう</Typography>
      </Box>
      <CardMedia ><img src={thumbnail} alt="thumbnail" /></CardMedia>
      <Box >
        <Box sx={{pt: 0, mt: 0}}>
          <Typography fontFamily="Menlo" variant="h3" fontWeight={"bold"} sx={{pt: 2, px: 2, color: "white" }}>バンコク</Typography>
          <Typography fontFamily="Menlo"  sx={{px: 2, pb: 1, color: "white" }}>Bangkok, Thailand</Typography>
          <ClickableAndDeletableChips />

          <Typography fontFamily="Noto Sans JP" sx={{p: 2, color: "primary.light" }}>旅行で行ったことがある。飯がうまい！Soi Sukhumwit 16, Sukhumwit Road, Khlong Toei, Khet Khlong Toei, Bangkok, 10110, Thailand</Typography>
        </Box>
        <VideoDialog />
        {/* <Box> */}
          {/* <VideoListComponent /> */}
        {/* </Box> */}
      </Box>
    </Paper>
  )
};

export default SpotInfo;