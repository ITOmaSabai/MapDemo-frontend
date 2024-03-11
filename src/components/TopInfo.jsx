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
import LikeButton from "./LikeButton";
import SearchVideo from "./SearchVideo";
import TopAnimation from "./TopAnimation";

const TopInfo = () => {
  
  return (
    <>
      <Paper square sx={{bgcolor: "primary.dark", height: "90vh", width:"360px", m: 0, p: 0, alignItems: "center", justifyContent: "center"}}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          flexDirection: 'column',
          pb: 20
        }}>
          <TopAnimation />
          <Typography color={"primary.light"} sx={{mt: 3}}>地図上の好きな場所をクリック</Typography>
        </Box>
        <Box sx={{pt: 0, mt: 0}}>
        </Box>
        {/* <Box >

        </Box>
        <Box >
        </Box> */}
      </Paper>
    </>
  )
};

export default TopInfo;