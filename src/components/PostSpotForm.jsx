import React, { useContext, useEffect, useState } from 'react';
import SpotContext from '../contexts/SpotContext';
import ReverseGeocodingComponent from './ReverseGeocodingComponent';
import { useDataPosted } from '../contexts/DataPostedContext';
import SelectedMarkerContext from '../contexts/SelectedMarkerContext';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Box, FormControl, FormHelperText, Input, InputLabel, Paper, TextField, Typography } from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import IsNewMarkerSelectedContext from '../contexts/IsNewMarkerSelectedContext';
import IsSavedMarkerSelectedContext from '../contexts/IsSavedMarkerSelectedContext';
import SearchVideo from './SearchVideo';

const PostSpotForm = () => {
  const { markers } = useContext(SpotContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState(markers ? markers.lat : '');
  const [longitude, setLongitude] = useState(markers ? markers.lng : '');
  const [addressComponents, setAddressComponents] = useState('');
  const [formattedAddres, setFormattedAddres] = useState('');
  const { setIsDataPosted } = useDataPosted();
  const { setSelectedMarker } = useContext(SelectedMarkerContext);
  const { setIsNewMarkerSelected } = useContext(IsNewMarkerSelectedContext);
  const { setIsSavedMarkerSelected } = useContext(IsSavedMarkerSelectedContext);

  useEffect(() => {
    if (markers) {
      setLatitude(markers.lat);
      setLongitude(markers.lng);
    }
  }, [markers]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    await postSpotData();
  };

  const postSpotData = async () => {
    try {
      // const response = await fetch('https://mapdemo-backend.onrender.com/api/v1/maps', {
      const response = await fetch(`${process.env.RAILS_API_ENDPOINT}/api/v1/maps`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ map: {
          name: name,
          description: description,
          lat: markers.lat,
          lng: markers.lng,
          address_components: addressComponents,
          formatted_addres: formattedAddres
        } }),
      });
      if (!response.ok) {
        throw new Error('データの送信に失敗しました');
      }
      const data = await response.json();
      console.log('保存成功:', data);
      setIsDataPosted(true);
      setSelectedMarker(data.map.id);
      setIsNewMarkerSelected(false);
      setIsSavedMarkerSelected(true);
      setName('');
      setDescription('');
    } catch (error) {
      console.error('エラー:', error);
    }
  };

  return (
    <div>
    <Paper sx={{bgcolor: "primary.light", height: "90vh", width:"360px", m: 0, p: 0}}>
      <Box sx={{m: 2, pt: 4}} textAlign={"center"}>
        <Typography fontFamily="Menlo" fontSize={14} >
          {/* <ReverseGeocodingComponent
            lat={latitude}
            lng={longitude}
            onSetAddressComponentsChange={setAddressComponents}
            onSetFormattedAddressChange={setFormattedAddres}
          >
          </ReverseGeocodingComponent> */}
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Stack
          direction="column"
          spacing={3}
          useFlexGap
          flexWrap={"wrap"}
          sx={{p: 3}}
          justifyContent={"center"}
        >
          <div>
            <label>スポット名:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {/* <Box
              component="form"
              sx={{p: 3}}
            > */}
              {/* <FormControl>
                <TextField
                  error
                  required
                  size='small' 
                  label="スポット名"
                  variant="outlined" 
                  color='info'
                  helperText="スポット名を入力してください"
                />
                <InputLabel htmlFor="スポット名"></InputLabel>
                <Input
                  required
                  id='spotName'
                  size='small' 
                  defaultValue="スポット名"
                  label="スポット名"
                  variant="outlined" 
                  color='info'
                />
                <FormHelperText id="spotName-helper-text">紹介する時のスポット名</FormHelperText>

              </FormControl>  */}
              {/* </Box> */}
          </div>
          <div>
            <label>説明:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            {/* <label>緯度:</label> */}
            <input
              type="hidden"
              value={latitude}
              name="latitude"
            />
          </div>
          <div>
            {/* <label>経度:</label> */}
            <input
              type="hidden"
              value={longitude}
              name="longitude"
            />
          </div>
          <div>
            {/* <>address_components:</ label> */}
            {/* <input
              type="hidden"
              value={addressComponents}
              name="addressComponents"
            /> */}
          </div>

          <Button
            variant="contained"
            color="success"
            type="submit"
            size='large'
            endIcon={<FlightTakeoffIcon />}
          >
            街に行ってみる
          </Button>
          <Typography fontFamily="Menlo" fontSize={14} textAlign={"center"} sx={{m: 0, p: 0}} >
            (動画を表示します)
          </Typography>
        </Stack>
      </form>
    </Paper>
    </div>
  );
}

export default PostSpotForm;