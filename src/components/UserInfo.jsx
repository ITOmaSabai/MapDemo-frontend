import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { deepPurple } from '@mui/material/colors';
import HeaderAppBar from './HeaderAppBar';
import SpotCard from './SpotCard';

const UserInfo = (displayName, photoURL) => {

  return (
    <>
    <HeaderAppBar />
    <Box sx={{p: 5, textAlign: "center"}} bgcolor={"primary.dark"} >
      <Stack sx={{textAlign: "center", mb: 10, display: "flex", justifyContent: "center", flexDirection: "row"}}>
        <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>
        {/* <Box sx={{textAlign: "center", mb: 10}}> */}
          <Typography variant="h4" component="h2" fontFamily={"Menlo"} fontWeight={"bold"} color={"primary.light"}>UserName</Typography>
        {/* </Box> */}
      </Stack>
  
    </Box>
    </>
  );
};

export default UserInfo;