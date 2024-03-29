import XIcon from '@mui/icons-material/X';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const ShareButton = ({url, fontSize}) => {
  // const URL = "https://map-demo-frontend.vercel.app/"
  return (
      <Link to={url} style={{color: "inherit", textDecoration: "none"}} target='_blank'>
        <Box display={"flex"} flexDirection={"row"} >
        <Typography fontSize={10} pr={1}>share on</Typography>
        <XIcon variant={"contained"} fontSize={fontSize} />
        </Box>
      </Link>
  )
};