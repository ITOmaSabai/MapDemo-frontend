import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Autocomplete, FormControl, FormGroup, Icon, Input, TextField } from '@mui/material';
import { Tags } from '../Tags';
import { Tag } from '@mui/icons-material';
import ClickableAndDeletableChips from '../ClickableAndDeletableChips';
import RoomTwoToneIcon from '@mui/icons-material/RoomTwoTone';
import SpotContext from '../../contexts/SpotContext';
import ReverseGeocodedAddressContext from '../../contexts/ReverseGeocodedAddressContext';
import IsNewMarkerSelectedContext from '../../contexts/IsNewMarkerSelectedContext';
import IsSavedMarkerSelectedContext from '../../contexts/IsSavedMarkerSelectedContext';
import { useDataPosted } from '../../contexts/DataPostedContext';
import SelectedMarkerContext from '../../contexts/SelectedMarkerContext';
import useFirebaseAuth from "../../Hooks/useFirebasAuth";

const style = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '500px',
  height: '60vh',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function PostSpotModal({postSpotModalOpen, setPostSpotModalOpen}) {
  const [ open, setOpen ] = useState(false);
  const handleClose = () => {
    setOpen(false);
    setPostSpotModalOpen(false);
  }
  const [ inputedTags, setInputedTags ] = useState();
  const [ chips, setChips ] = useState([
    { key: 0, label: "行ってみたい" },
    { key: 1, label: "行ったことある" },
    { key: 2, label: "おもしろ" },
    { key: 3, label: "聖地" },
    { key: 4, label: "海がキレイ" }
  ]);
  const { markers } = useContext(SpotContext);
  const [ postSpotName, setPostSpotName ] = useState();
  const [ postSpotDescription, setPostSpotDescription ] = useState();
  const { reverseGeocodedAddress } = useContext(ReverseGeocodedAddressContext);
  const { setIsDataPosted } = useDataPosted();
  const { setIsNewMarkerSelected } = useContext(IsNewMarkerSelectedContext);
  const { setIsSavedMarkerSelected } = useContext(IsSavedMarkerSelectedContext);
  const { setSelectedMarker } = useContext(SelectedMarkerContext);
  const { currentUser } = useFirebaseAuth();

  useEffect(() => {
    setOpen(postSpotModalOpen);
  }, [postSpotModalOpen]);

  // const handleSetTags = (e) => {
  //   const newChip = {key: 10, label: e}
  // console.log(newChip)
  //   setChips([...chips, newChip])
  // };

  const handlePostNewSpot = (e) => {
    e.preventDefault();
    postSpotData();
  }

  const postSpotData = async () => {
    const verifyIdToken = async () => {
      const token = await currentUser?.getIdToken();
    try {
      const response = await fetch(`${process.env.REACT_APP_RAILS_API_ENDPOINT}/api/v1/maps`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ map: {
          name: postSpotName,
          description: postSpotDescription,
          lat: markers.lat,
          lng: markers.lng,
          address_components: reverseGeocodedAddress.address_components,
          formatted_address: reverseGeocodedAddress.formatted_address,
        } }),
      });
      if (!response.ok) {
        throw new Error('データの送信に失敗しました');
      }
      const data = await response.json();
      // console.log('保存成功:', data);
      setIsDataPosted(true);
      setSelectedMarker(data.map.id);
      // 情報欄の表示を変更する
      setIsNewMarkerSelected(false);
      setIsSavedMarkerSelected(true);
      // formの値を空にする
      setPostSpotName('');
      setPostSpotDescription('');
    } catch (error) {
      console.error('エラー:', error);
    }
  };
  verifyIdToken();
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        <Box sx={style}>
          <form onSubmit={handlePostNewSpot} >
            <Box display={"flex"} flexDirection={"column"} sx={{width: "100%"}}>
              <Typography variant='h5' fontSize={"24px"}><RoomTwoToneIcon />スポット新規投稿</Typography>
              <TextField
                id="spotName"
                label="スポット名"
                variant="outlined"
                color="info"
                margin="normal"
                helperText="※必須項目です"
                placeholder="表示されるスポット名"
                name="spotName"
                value={postSpotName}
                onChange={(e) => setPostSpotName(e.target.value)}
              />
              <TextField
                id="outlined-multiline-static"
                label="説明"
                multiline
                rows={2}
                color='info'
                placeholder="思い出や感想をシェアしましょう"
                margin="normal"
                name='description'
                value={postSpotDescription}
                onChange={(e) => setPostSpotDescription(e.target.value)}
              />
              <Button
                type='submit'
                color='success'
                variant='contained'
                display={"flex"}
                alignItems={"center"}
                sx={{width: "150px"}}
              >
                投稿する
              </Button>
            </Box>
          </form>
            {/* {inputedTags} */}
        </Box>
      </Modal>
    </div>
  );
}