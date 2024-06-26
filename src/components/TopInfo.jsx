import React, { useContext, useEffect, useState } from "react";
import { Box, Card, CardMedia, Stack, Typography, Avatar, Paper } from "@mui/material";
import ClickableAndDeletableChips from "./ClickableAndDeletableChips";
import thumbnail from "../mqdefault.jpg";
import VideoListComponent from "./VideoListComponent";
import VideoDialog from "./VideoDialog";
import SavedMarkerContext from "../contexts/SavedMarkerContext";
import SelectedMarkerContext from "../contexts/SelectedMarkerContext";
import SelectedVideosContext from "../contexts/SelectedVideosContext";
import SetAddressesContext from "../contexts/SetAddressesContext";
import AddressFetcher from "./AddressFetcher";
import SelectedAddressContext from "../contexts/SelectedAddressContext";
import LikeButton from "./Likes/LikeButton";
import SearchVideo from "./SearchVideo";
import TopAnimation from "./TopAnimation";
import { ShareButton } from "./ShareButton";

const TopInfo = () => {
  const URL = "https://map-demo-frontend.vercel.app/"
  const url = `https://twitter.com/share?url=${URL}&text=【BackHacker.】%0a%0a`

  return (
    <>
      <Paper square sx={{bgcolor: "primary.dark", height: "90vh", width:"360px", m: 0, p: 0, alignItems: "center", justifyContent: "center"}}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          flexDirection: 'column',
          pb: 20
        }}>
          <TopAnimation />
          <Typography color={"primary.light"} sx={{mt: 3}}>スポットを訪問してみよう</Typography>
        </Box>
      </Paper>
    </>
  )
};

export default TopInfo;