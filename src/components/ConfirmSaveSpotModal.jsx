import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IsConfirmSaveSpotModalOpenContext from '../contexts/IsConfirmSaveSpotModalOpenContext';
import PostSpotForm from './PostSpotForm';
import PostSpotModal from './spotPosts/PostSpotModal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ConfirmSaveSpotModal({searchedKeywords}) {
  const [open, setOpen] = React.useState(false);
  const { isConfirmSaveSpotModalOpen, setIsConfirmSaveSpotModalOpen } = React.useContext(IsConfirmSaveSpotModalOpenContext);
  const [ postSpotModalOpen, setPostSpotModalOpen ] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    setIsConfirmSaveSpotModalOpen(false);
  }

  // ビデオ表示ダイアログが閉じた時、モーダルを開く
  React.useEffect(() => {
    setOpen(true);
  }, [isConfirmSaveSpotModalOpen])

  const handlePostSpot = () => {
    setOpen(false);
    setIsConfirmSaveSpotModalOpen(false);
    setPostSpotModalOpen(true);
  };

  const handleModalOpen = () => {
    setOpen(false);
    setIsConfirmSaveSpotModalOpen(false);
  };

  return (
    <div>
      {isConfirmSaveSpotModalOpen &&
      <>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {`"${searchedKeywords}" は気に入りましたか？`}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              投稿してみんなにシェアしよう🎉
            </Typography>
            <Box display={"flex"} sx={{mt: 2}} >
              <Button color='primary' variant='text' sx={{mt: 2, pr: 5, fontWeight: "normal"}} onClick={handleClose}>投稿しない</Button>
              <Button color='info' variant='contained' sx={{mt: 2}} onClick={handlePostSpot}>投稿する</Button>
            </Box>
          </Box>
        </Modal>
      </>
      }
      <PostSpotModal
        postSpotModalOpen={postSpotModalOpen}
        setPostSpotModalOpen={setPostSpotModalOpen}
      />
    </div>
  );
}