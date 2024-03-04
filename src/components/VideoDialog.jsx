import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import Container from '@mui/material/Container';
import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';


const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props) {
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
        {/* <Stack  spacing={1} useFlexGap flexWrap={"wrap"}> */}
          <iframe width="45%" height="50%" src={"https://www.youtube.com/embed/J1xWCxOKQ6A"} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          <iframe width="45%" height="50%" src={"https://www.youtube.com/embed/J1xWCxOKQ6A"} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          <iframe width="45%" height="50%" src={"https://www.youtube.com/embed/J1xWCxOKQ6A"} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          <iframe width="45%" height="50%" src={"https://www.youtube.com/embed/J1xWCxOKQ6A"} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          <iframe width="45%" height="50%" src={"https://www.youtube.com/embed/J1xWCxOKQ6A"} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          <iframe width="45%" height="50%" src={"https://www.youtube.com/embed/J1xWCxOKQ6A"} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          <iframe width="45%" height="50%" src={"https://www.youtube.com/embed/J1xWCxOKQ6A"} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          <iframe width="45%" height="50%" src={"https://www.youtube.com/embed/J1xWCxOKQ6A"} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        {/* </Stack>   */}
      </DialogContent>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Typography variant="subtitle1" component="div">
        Selected: {selectedValue}
      </Typography>
      <br />
      <Button variant="outlined" onClick={handleClickOpen}>
        Open simple dialog
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}