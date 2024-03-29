import { Box, Button, Paper, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import ReverseGeocodingComponent, { ReverseGeocodeLatLng } from "./ReverseGeocodingComponent";
import SpotContext from "../contexts/SpotContext";
import SetAddressesContext from "../contexts/SetAddressesContext";
import VideoDialog from "./VideoDialog";
import DialogOpenContext from "../contexts/DialogOpenContext";
import ReverseGeocodedAddressContext from "../contexts/ReverseGeocodedAddressContext";
import ConfirmSaveSpotModal from "./ConfirmSaveSpotModal";
import PostSpotModal from "./spotPosts/PostSpotModal";
import { PostButton } from "./spotPosts/PostButton";
import useFirebaseAuth from "../Hooks/useFirebasAuth";
import MessageModal from "./Modals/MessageModal";
import TopInfo from "./TopInfo";
import { Feedback } from "./spotInfomations/Feedback";

const SearchVideo = () => {
  const [ searchResultVideos, setSearchResultVideos ] = useState();
  const [ searchedKeywords, setSearchedKeywords ] = useState();
  const { markers } = useContext(SpotContext);
  const { address } = useContext(SetAddressesContext);
  const { setReverseGeocodedAddress } = useContext(ReverseGeocodedAddressContext);
  const [ open, setOpen ] = useState(false);
  const { isDialogOpen, setIsDialogOpen } = useContext(DialogOpenContext);
  const [ isValidAddress, setIsValidAddress ] = useState();
  const [ isVideoSearched, setIsVideoSearched ] = useState(false);
  const { currentUser } = useFirebaseAuth();
  const [ loginModalOpen, setLoginModalOpen ] = useState(false);
  const [ isSearchedToday, setIsSearchedToday ] = useState(false);
  const [ searchFailureModalOpen, setSearchFailureModalOpen ] = useState(false);

  const searchVideoModal = {
    title: "ログインすると動画を取得できます",
    body: "街の様子をみんなにシェアしよう！",
    icon: "✈️"
  };

  const searchFailureModal = {
    title: "動画を取得できませんでした",
    body: "山、砂漠、海などは避け、都市部をクリックして再度試してみてください 🙇‍♂️",
    icon: "😭",
    button: "close"
  };

  const isFeedbackSubmitted = window.sessionStorage.getItem("isFeedbackSubmitted");

  // ボタンを押した際のアクション
  const handleSubmit = async (e) => {
    if (currentUser) {
      e.preventDefault();
      const resultAddress = await ReverseGeocodeLatLng(markers, setReverseGeocodedAddress);
      setReverseGeocodedAddress(resultAddress);

      if (resultAddress.address_components.length > 1) {
        await getVideoSearchResult(resultAddress);
        setIsValidAddress(true);
        handleClickOpen();
      } else {
        setIsValidAddress(false);
        setSearchFailureModalOpen(true)
      }
    } else {
      setLoginModalOpen(true);
    }
  }

  useEffect(() => {
    setIsVideoSearched(false);
    setReverseGeocodedAddress("");
    setSearchResultVideos(null);
  }, [markers])

  useEffect(() => {
    if (!currentUser) return;
    const verifyIdToken = async () => {
      const token = await currentUser?.getIdToken();
      try {
        const response = await fetch(`${process.env.REACT_APP_RAILS_API_ENDPOINT}/api/v1/search`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        const data = await response.json();
        setIsSearchedToday(data.isSearched);
      } catch (error) {
        console.error('エラー:', error);
      }
    };
    verifyIdToken();
  }, [currentUser])

  const getVideoSearchResult = async (resultAddress) => {
    const verifyIdToken = async () => {
      const token = await currentUser?.getIdToken();
      try {
        const response = await fetch(`${process.env.REACT_APP_RAILS_API_ENDPOINT}/api/v1/videos/search`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ video: {
            address_components: resultAddress.address_components,
            formatted_address: resultAddress.formatted_address
          } }),
        });
        const data = await response.json();
        console.log(data)
        setSearchResultVideos(data.videos_data.items);
        setSearchedKeywords(data.search_keywords);
      } catch (error) {
        console.error('エラー:', error);
      }
    }
    verifyIdToken();
  };

  const handleClickOpen = () => {
    setIsDialogOpen(true);
  };

  return (
    <>
      <MessageModal
        open={searchFailureModalOpen}
        setOpen={setSearchFailureModalOpen}
        title={searchFailureModal.title}
        body={searchFailureModal.body}
        icon={searchFailureModal.icon}
        button={"close"}
      />
      <MessageModal
        open={loginModalOpen}
        setOpen={setLoginModalOpen}
        title={searchVideoModal.title}
        body={searchVideoModal.body}
        icon={searchVideoModal.icon}
        button={"login"}
      />
      {isSearchedToday ? (
        isFeedbackSubmitted ? <TopInfo /> : <Feedback />
      ) : (
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
                {markers && !isVideoSearched ? (
                  <>
                    <Button onClick={handleSubmit} >
                      <PostButton />
                    </Button>
                    <Box sx={{pt: 4}} textAlign={"left"}>
                      <Typography color={"white"}>１日１回まで、ピンを刺した場所の動画を</Typography>
                      <Typography color={"white"}>自動で取得します🤖</Typography>
                      <Typography color={"white"}>取得した動画は、投稿してシェアすることができます</Typography>
                    </Box>
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
                      もう一度見る
                    </Button>
                    <VideoDialog
                      searchResultVideos={searchResultVideos}
                      searchedKeywords={searchedKeywords}
                      isValidAddress={isValidAddress}
                      setIsVideoSearched={setIsVideoSearched}
                    />
                  </>
                )}
            <Box textAlign="center" sx={{px: 2, my: 2}} >

            </Box>
          </Box>
            <Box>
              <ConfirmSaveSpotModal searchedKeywords={searchedKeywords} open={open} />
              <PostSpotModal />
            </Box>
          </Box>
        </Paper>
      )}
    </>
  );
};

export default SearchVideo;