import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Autocomplete, FormControl, FormGroup, Input, TextField } from '@mui/material';
import { Tags } from './Tags';
import { Tag } from '@mui/icons-material';
import ClickableAndDeletableChips from './ClickableAndDeletableChips';

const style = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 500,
  height: '60vh',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function PostSpotModal() {
  const [ open, setOpen ] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [ inputedTags, setInputedTags ] = useState();
  const [ chips, setChips ] = useState([
    { key: 0, label: "行ってみたい" },
    { key: 1, label: "行ったことある" },
    { key: 2, label: "おもしろ" },
    { key: 3, label: "聖地" },
    { key: 4, label: "海がキレイ" }
  ]);

  const handleSetChips = (value) => {

  };

  const handleSetTags = (e) => {
    // setInputedTags(e);
    const newChip = {key: 10, label: e}
  console.log(newChip)
    setChips([...chips, newChip])
  };

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        // PaperProps={{sx: {maxHeight: "95vh"}}}
        // sx={{height: "90vh"}}
      >
        <>
          <Box sx={{minWidth: "200px"}}>a</Box>
          <Box sx={style}>
            <FormControl display={"flex"} flexDirection={"column"} sx={{width: "90%"}}>
              <Typography variant='h5' fontSize={"24px"}>スポット新規投稿</Typography>
              <TextField
                id="spotName"
                label="スポット名"
                variant="outlined"
                color="info"
                margin="normal"
                helperText="※必須項目です"
              />
              <TextField
                id="outlined-multiline-static"
                label="コメント"
                multiline
                rows={2}
                color='info'
                placeholder="コメントを入力"
                margin="normal"
                helperText=""
              />
              {/* <Autocomplete 
               options={Tags}
               renderInput={(params) => <TextField {...params} label="タグ" />}
               onChange={(e) => handleSetTags(e.target.value)}
               freeSolo={"true"}
              /> */}
              {/* <ClickableAndDeletableChips
                chips={chips}
                setChips={setChips}
              /> */}
              <Button
                color='success'
                variant='contained'
                display={"flex"}
                alignItems={"center"}
                sx={{width: "150px"}}
              >
                投稿する
              </Button>
            </FormControl>
              {inputedTags}
          </Box>
        </>
      </Modal>
    </div>
  );
}