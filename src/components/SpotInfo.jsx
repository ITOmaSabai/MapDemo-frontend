import React from "react";
import { Box, Card, CardMedia, Stack, Typography } from "@mui/material";
import ClickableAndDeletableChips from "./ClickableAndDeletableChips";
import thumbnail from "../mqdefault.jpg";
import VideoListComponent from "./VideoListComponent";

const SpotInfo = () => {

  return (
    <Card sx={{bgcolor: "primary.main", height: "100%"}}>
      <CardMedia><img src={thumbnail} alt="thumbnail" /></CardMedia>
      <Box >
        <Box sx={{pt: 0, mt: 0}}>
          <Typography variant="h3" sx={{p: 2, color: "white" }}>Bangkok, Thailand</Typography>
          <Typography sx={{p: 2, color: "white" }}>Soi Sukhumwit 16, Sukhumwit Road, Khlong Toei, Khet Khlong Toei, Bangkok, 10110, Thailand</Typography>
        </Box>
          <ClickableAndDeletableChips />
        <Box>
          <VideoListComponent />
        </Box>
      </Box>
    </Card>
  )
};

export default SpotInfo;