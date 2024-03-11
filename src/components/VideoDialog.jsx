import * as React from 'react';
import { useContext } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';
import SelectedVideosContext from '../contexts/SelectedVideosContext';
import { Box } from '@mui/material';
import FloatingActionButtonSize from './ScrollToBottomButton';
import ScrollToBottomButton from './ScrollToBottomButton';
import VideoListComponent from './VideoListComponent';
import DialogOpenContext from '../contexts/DialogOpenContext';

const emails = ['username@gmail.com'];

function SimpleDialog(props) {
  const {selectedVideos} = useContext(SelectedVideosContext);
  const { onClose, selectedValue, open, searchResultVideos } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog PaperProps={{sx: {maxHeight: "95vh"}}} maxWidth={'xl'} fullWidth onClose={handleClose} open={open}>
      <DialogContent sx={{height: "100vh", p: 0, m: 0}}>
        <Box textAlign="center" sx={{px: 2, py: 1}} display={"flex"} justifyContent={"center"}>
          <Typography fontFamily="Menlo" fontSize={15} fontWeight={"bold"}>
            {/* {searchedKeywords && `"${searchedKeywords}"`} */}
            "Bangkok, Thailand"
          </Typography>
        </Box>
        {searchResultVideos && searchResultVideos.length > 0 && (
        searchResultVideos.map((searchResultVideo) => (
        //   <iframe width="45%" height="50%" src={`https://www.youtube.com/embed/${selectedVideo.youtube_video_id}`} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        // ))
        <Box sx={{height: "90%", m: 0, p: 0}} textAlign={"center"}>
          <iframe width="98%" height="100%" src={`https://www.youtube.com/embed/${searchResultVideo.id.video_id}`} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </Box>
        )))}
    
        {ScrollToBottomButton()}
        <Box sx={{height: "30vh"}}></Box>
      </DialogContent>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function VideoDialog({handleClickOpen, searchResultVideos}) {
  const { isDialogOpen, setIsDialogOpen } = useContext(DialogOpenContext);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);
  const {selectedVideos} = useContext(SelectedVideosContext);



  const handleClose = (value) => {
    setIsDialogOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Button variant="outlined" color='secondary' onClick={handleClickOpen}>
        Watch Videos
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={isDialogOpen}
        onClose={handleClose}
        searchResultVideos={searchResultVideos}
      />
    </div>
  );
}