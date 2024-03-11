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

const TopInfo = () => {
  
  return (
    <>
      <Paper sx={{bgcolor: "primary.dark", height: "90vh", width:"360px", m: 0, p: 0, alignItems: "center", justifyContent: "center"}}>
        <Box sx={{mx: 3, py: 1, md: 'flex', flexDirection: "row", alignItems: "center"}} display={"flex"} flexDirection={"row"}>
          <Typography color={"primary.light"}>地図上の好きな場所をクリック</Typography>
        </Box>
        <Box sx={{pt: 0, mt: 0}}>
          <SearchVideo />
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