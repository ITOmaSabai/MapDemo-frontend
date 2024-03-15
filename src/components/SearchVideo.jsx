import { Box, Button, Paper, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import ReverseGeocodingComponent, { ReverseGeocodeLatLng } from "./ReverseGeocodingComponent";
import SpotContext from "../contexts/SpotContext";
import SetAddressesContext from "../contexts/SetAddressesContext";
import VideoDialog from "./VideoDialog";
import DialogOpenContext from "../contexts/DialogOpenContext";
import ReverseGeocodedAddressContext from "../contexts/ReverseGeocodedAddressContext";

const SearchVideo = () => {
  const [ addressComponents, setAddressComponents ] = useState();
  const [ formattedAddress, setFormattedAddress ] = useState();
  const [ searchResultVideos, setSearchResultVideos ] = useState();
  const [ searchedKeywords, setSearchedKeywords ] = useState();
  const { markers } = useContext(SpotContext);
  const { address } = useContext(SetAddressesContext);
  const { reverseGeocodedAddress, setReverseGeocodedAddress } = useContext(ReverseGeocodedAddressContext);
  const [ open, setOpen ] = useState(false);
  const { isDialogOpen, setIsDialogOpen } = useContext(DialogOpenContext);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAddress = await ReverseGeocodeLatLng(markers, setReverseGeocodedAddress);
    setReverseGeocodedAddress(resultAddress);
    await getVideoSearchResult(resultAddress);
    handleClickOpen();
  }

  const getVideoSearchResult = async (resultAddress) => {
    try {
      // const response = await fetch('https://mapdemo-backend.onrender.com/api/v1/videos/search', {
      const response = await fetch('http://localhost:3000/api/v1/videos/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ video: { 
          address_components: resultAddress.address_components,
          formatted_address: resultAddress.formatted_address
        } }),
      });
      if (!response.ok) {
        throw new Error('データの送信に失敗しました');
      }
      const data = await response.json();
      setSearchResultVideos(data.videos_data.items);
      setSearchedKeywords(data.search_keywords);
    } catch (error) {
      console.error('エラー:', error);
    }
  };

  const handleClickOpen = () => {
    setIsDialogOpen(true);
  };

  return (
    <>
      <Paper square sx={{bgcolor: "primary.dark", height: "90vh", width:"360px", m: 0, p: 0}}>
        <Box sx={{py: 5, md: 'flex', flexDirection: "row"}} textAlign={"center"} >
          <Box height={"15vh"} >
            <Typography color={"white"} fontFamily="Menlo" >
              {markers && 
                <ReverseGeocodingComponent
                  // onSetAddressComponentsChange={setAddressComponents}
                  // onSetFormattedAddressChange={setFormattedAddress}
                  // setAddressToSearchVideo={setReverseGeocodedAddress}
                >
                </ReverseGeocodingComponent>
              }
            </Typography>
          </Box>
          <Box sx={{px: 2, py: 4}} textAlign={"center"}>
            <form onSubmit={handleSubmit}>
              <input type="hidden" value={21.32744137161838} name="addressComponents" />
              <input type="hidden" value={79.05807583185117} name="formattedAddres" />

                {markers 
                //  && reverseGeocodedAddress && reverseGeocodedAddress.address_components.length > 1 
                  ? ( 
                  <Button
                    variant="contained"
                    color="info"
                    type="submit"
                    size='large'
                  >
                    動画を取得
                  </Button> ) : (
                  <Button
                    variant="contained"
                    color="info"
                    type="submit"
                    size='large'
                    disabled
                  >
                    動画を取得
                  </Button> ) }
                {/* } */}
              <Box textAlign="center" sx={{px: 2, my: 2}} >
                <Typography fontFamily="Menlo" fontSize={15} fontWeight={"bold"} color={"white"}>
                  {searchedKeywords && `"${searchedKeywords}"`}
                </Typography>
                <Typography fontFamily="Menlo" fontSize={14} color={"white"}>
                  {searchedKeywords && "の動画を表示しています"}
                </Typography>
              </Box>
            </form>
          </Box>
      
          <Box>
            <VideoDialog />
          </Box>
        </Box>
      </Paper>
      <VideoDialog handleClickOpen={handleClickOpen} searchResultVideos={searchResultVideos} />
    </>
  );
};

export default SearchVideo;