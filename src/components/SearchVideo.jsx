import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReverseGeocodingComponent from "./ReverseGeocodingComponent";

const SearchVideo = ({latitude, longitude}) => {
  const [ addressComponents, setAddressComponents ] = useState();
  const [ formattedAddress, setFormattedAddress ] = useState();
  const [ searchResultVideos, setSearchResultVideos ] = useState();
  const [ searchedKeywords, setSearchedKeywords ] = useState();

  const getVideoSearchResult = async () => {
    try {
      // const response = await fetch('https://mapdemo-backend.onrender.com/api/v1/videos/search', {
      const response = await fetch('http://localhost:3000/api/v1/videos/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ video: { 
          address_components: addressComponents,
          formatted_address: formattedAddress
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

  const handleSubmit = (e) => {
    e.preventDefault();
    getVideoSearchResult();
  }

  return (
    <>
      <ReverseGeocodingComponent
        lat={latitude}
        lng={longitude}
        onSetAddressComponentsChange={setAddressComponents}
        onSetFormattedAddressChange={setFormattedAddress}
      >
      </ReverseGeocodingComponent>

      <form onSubmit={handleSubmit}>
        <input type="hidden" value={21.32744137161838} name="addressComponents" />
        <input type="hidden" value={79.05807583185117} name="formattedAddres" />
        <Button
          variant="contained"
          color="success"
          type="submit"
          size='large'
        >
          動画を取得
        </Button>
        <Box textAlign="center" sx={{px: 2, my: 2}} >
          <Typography fontFamily="Menlo" fontSize={15} fontWeight={"bold"}>
            {searchedKeywords && `"${searchedKeywords}"`}
          </Typography>
          <Typography fontFamily="Menlo" fontSize={14}>
            {searchedKeywords && "の動画を表示しています"}
          </Typography>
        </Box>
      </form>
      <Box>
        {searchResultVideos && searchResultVideos.length > 0 && (
          searchResultVideos.map((searchResultVideo) => (
            <li key={searchResultVideo.id.video_id} style={{listStyle :"none"}}>
             <iframe width="350" height="200" src={`https://www.youtube.com/embed/${searchResultVideo.id.video_id}`} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe></li>
          ))
        )}
      </Box>
    </>
  );
};

export default SearchVideo;