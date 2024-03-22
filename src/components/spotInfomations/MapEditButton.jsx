import { Box,  Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

const MapEditButton = () => {

  return (
    <Box sx={{p: 0, m: 0}} display={"flex"} flexDirection={"row"} >
      <EditIcon fontSize="small" sx={{mr: 1}} />
      <Typography >
        編集
      </Typography>
    </Box>
  )
};

export default MapEditButton;