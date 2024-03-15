import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IsConfirmSaveSpotModalOpenContext from '../contexts/IsConfirmSaveSpotModalOpenContext';
import SpotSaveImage from '../SpotSaveImage.jpg'

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
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIsConfirmSaveSpotModalOpen(false);
    console.log(isConfirmSaveSpotModalOpen)
  }

  // ビデオ表示ダイアログが閉じた時、モーダルを開く
  React.useEffect(() => {
    setOpen(true);
    return 
  }, [isConfirmSaveSpotModalOpen]) 
  // isConfirmSaveSpotModalOpenがtrueになるのを監視した方がいい。どこかでfalseになる時にも実行されてしまう。

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
              {`"${searchedKeywords}" を保存しますか？`}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              この場所が気に入ったなら投稿しましょう！
            </Typography>
            <Box display={"flex"} sx={{mt: 2}} >
              <Button color='primary' variant='text' sx={{mt: 2, pr: 5, fontWeight: "normal"}} onClick={handleClose}>投稿しない</Button>
              <Button color='info' variant='contained' sx={{mt: 2}} onClick={handleClose}>投稿する</Button>
            </Box>
          </Box>
        </Modal>
      </>
      }
    </div>
  );
}