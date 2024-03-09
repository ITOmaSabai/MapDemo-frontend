import * as React from 'react';
import { useContext } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';
import SelectedVideosContext from '../contexts/SelectedVideosContext';


const emails = ['username@gmail.com'];

function SimpleDialog(props) {
  const {selectedVideos} = useContext(SelectedVideosContext);
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog PaperProps={{sx: {maxHeight: "95vh"}}} maxWidth={'xl'} fullWidth onClose={handleClose} open={open}>
      <DialogContent style={{height:'100vh'}}>
        {selectedVideos && selectedVideos.length > 0 && (
        selectedVideos.map((selectedVideo) => (
          <iframe width="45%" height="50%" src={`https://www.youtube.com/embed/${selectedVideo.youtube_video_id}`} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        )))}
      </DialogContent>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function VideoDialog() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);
  const {selectedVideos} = useContext(SelectedVideosContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Button variant="outlined" color='secondary' onClick={handleClickOpen}>
        Watch Videos
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}