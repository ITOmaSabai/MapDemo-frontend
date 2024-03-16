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
import { ReactComponent as AddressNotFoundImage } from '../undraw_working_late_re_0c3y.svg'
import IsConfirmSaveSpotModalOpenContext from '../contexts/IsConfirmSaveSpotModalOpenContext';

function SimpleDialog(props) {
  const {selectedVideos} = useContext(SelectedVideosContext);
  const { onClose, selectedValue, open, searchResultVideos, searchedKeywords, isValidAddress, setIsVideoSearched } = props;
  const { isDialogOpen, setIsDialogOpen } = useContext(DialogOpenContext);
  const { setIsConfirmSaveSpotModalOpen } = useContext(IsConfirmSaveSpotModalOpenContext);

  const handleClose = () => {
    onClose();
    setIsConfirmSaveSpotModalOpen(true);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog PaperProps={{sx: {maxHeight: "95vh"}}} maxWidth={'xl'} fullWidth onClose={handleClose} open={open}>
      <DialogContent sx={{height: "100vh", p: 0, m: 0}}>
        <Box textAlign="center" sx={{px: 2, py: 1}} display={"flex"} justifyContent={"center"}>
          <Typography fontFamily="Menlo" fontSize={15} fontWeight={"bold"}>
            {searchedKeywords && `"${searchedKeywords}" の動画を表示中`}
          </Typography>
        </Box>
        {isValidAddress ? (
          searchResultVideos && searchResultVideos.length > 0 && (
          searchResultVideos.map((searchResultVideo) => (
          <Box sx={{height: "90%", m: 0, p: 0}} textAlign={"center"}>
            <iframe width="98%" height="100%" src={`https://www.youtube.com/embed/${searchResultVideo.id.video_id}`} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </Box>
        ))) ) : (
          <Box textAlign="center" sx={{mx: 45, my: 3, bgcolor: "primary.light"}} display={"flex"} justifyContent={"center"} flexDirection={"column"} height={"70%"}>
            <Typography variant='h5'>動画を取得できませんでした...</Typography>
            <Box sx={{p: 0, mt: 10, mb: 5}} display={"flex"} justifyContent={"center"} >
              <AddressNotFoundImage  height={"200px"}/>
            </Box>
            <Typography>動画を取得するためには、住所情報が必要です</Typography>
            <Typography>山、砂漠、海などは避け、都市部をクリックして再度試してみてください</Typography>
          </Box>
        )}
        {/* {ScrollToBottomButton()} */}
      </DialogContent>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function VideoDialog({searchResultVideos, searchedKeywords, isValidAddress, setIsVideoSearched}) {
  const { isDialogOpen, setIsDialogOpen } = useContext(DialogOpenContext);
  const [selectedValue, setSelectedValue] = React.useState();
  const {selectedVideos} = useContext(SelectedVideosContext);

  const handleClose = (value) => {
    setIsDialogOpen(false);
    setSelectedValue(value);
    setIsVideoSearched(true);
  };

  return (
    <div>
      <SimpleDialog
        selectedValue={selectedValue}
        open={isDialogOpen}
        onClose={handleClose}
        searchResultVideos={searchResultVideos}
        searchedKeywords={searchedKeywords}
        isValidAddress={isValidAddress}
      />
    </div>
  );
}