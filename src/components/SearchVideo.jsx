import { Box, Button, Paper, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import ReverseGeocodingComponent, { ReverseGeocodeLatLng } from "./ReverseGeocodingComponent";
import SpotContext from "../contexts/SpotContext";
import SetAddressesContext from "../contexts/SetAddressesContext";
import VideoDialog from "./VideoDialog";
import DialogOpenContext from "../contexts/DialogOpenContext";
import ReverseGeocodedAddressContext from "../contexts/ReverseGeocodedAddressContext";
import ConfirmSaveSpotModal from "./ConfirmSaveSpotModal";
import PostSpotModal from "./PostSpotModal";

const SearchVideo = () => {
  const [ addressComponents, setAddressComponents ] = useState();
  const [ formattedAddress, setFormattedAddress ] = useState();
  const [ searchResultVideos, setSearchResultVideos ] = useState();
  const [ searchedKeywords, setSearchedKeywords ] = useState();
  const { markers } = useContext(SpotContext);
  const { address } = useContext(SetAddressesContext);
  const { setReverseGeocodedAddress } = useContext(ReverseGeocodedAddressContext);
  const [ open, setOpen ] = useState(false);
  const { isDialogOpen, setIsDialogOpen } = useContext(DialogOpenContext);
  const [ isValidAddress, setIsValidAddress ] = useState();
  const [ isVideoSearched, setIsVideoSearched ] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAddress = await ReverseGeocodeLatLng(markers, setReverseGeocodedAddress);
    setReverseGeocodedAddress(resultAddress);
    if (resultAddress.address_components.length > 1) {
      await getVideoSearchResult(resultAddress);
      setIsValidAddress(true);
      handleClickOpen();
    } else {
      setIsValidAddress(false);
      setSearchResultVideos("");
      setSearchedKeywords("");
      handleClickOpen();
    }
  }

  useEffect(() => {
    setIsVideoSearched(false);
    setReverseGeocodedAddress("");
  }, [markers])

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
                <ReverseGeocodingComponent />
              }
            </Typography>
          </Box>
          <Box sx={{px: 2, py: 4}} textAlign={"center"}>
            {/* markers(クリックした地点の緯度経度)が存在すれば=マップをクリックした場合に、ボタンを表示する */}
            {markers ? ( 
              !isVideoSearched ? (
              <>
                <Button
                  variant="contained"
                  color="info"
                  type="submit"
                  size='large'
                  onClick={handleSubmit}
                >
                  動画を取得
                </Button>
                <VideoDialog
                  searchResultVideos={searchResultVideos}
                  searchedKeywords={searchedKeywords}
                  isValidAddress={isValidAddress}
                  setIsVideoSearched={setIsVideoSearched}
                />
              </>
              ) : (
                <>
                  <Button
                    variant="contained"
                    color="info"
                    type="submit"
                    size='large'
                    onClick={handleClickOpen}
                  >
                    動画を見る
                  </Button>
                  <VideoDialog
                    searchResultVideos={searchResultVideos}
                    searchedKeywords={searchedKeywords}
                    isValidAddress={isValidAddress}
                    setIsVideoSearched={setIsVideoSearched}
                  />
                </>
              )
               ) : (
              <>
                <Button
                  variant="contained"
                  color="info"
                  type="submit"
                  size='large'
                  disabled
                >
                  動画を取得
                </Button>
                
              </> ) }
            {/* } */}
          <Box textAlign="center" sx={{px: 2, my: 2}} >
            {/* <Typography fontFamily="Menlo" fontSize={15} fontWeight={"bold"} color={"white"}>
              {searchedKeywords && `"${searchedKeywords}"`}
            </Typography> */}
            {/* <Typography fontFamily="Menlo" fontSize={14} color={"white"}>
              {searchedKeywords && "の動画を表示しています"}
            </Typography> */}
          </Box>
        </Box>
          <Box>
            <ConfirmSaveSpotModal searchedKeywords={searchedKeywords} />
            <PostSpotModal />
          </Box>
        </Box>
      </Paper>

    </>
  );
};

export default SearchVideo;