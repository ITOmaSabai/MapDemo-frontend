import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { deepPurple } from '@mui/material/colors';
import HeaderAppBar from './HeaderAppBar';
import SpotCard from './SpotCard';

const UserInfo = () => {

  return (
    <>
    <HeaderAppBar />
    <Box sx={{p: 5, textAlign: "center"}} >
      <Stack sx={{textAlign: "center", mb: 10, display: "flex", justifyContent: "center", flexDirection: "row"}}>
        <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>
        {/* <Box sx={{textAlign: "center", mb: 10}}> */}
          <Typography variant="h4" component="h2">サンプルユーザー</Typography>
        {/* </Box> */}
      </Stack>
      <Stack 
        direction="row"
        spacing={1}
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: "center"
        }}
      >
        {/* <Stack direction="row" spacing={1} useFlexGap flexWrap={"wrap"}> */}
        <Card sx={{px: 5, py: 2, mx: 5, mb: 5}}><SpotCard/></Card>
        <Card sx={{px: 5, py: 2, mx: 5, mb: 5}}><SpotCard/></Card>
        <Card sx={{px: 5, py: 2, mx: 5, mb: 5}}><SpotCard/></Card>
        <Card sx={{px: 5, py: 2, mx: 5, mb: 5}}>lorem ipsum</Card>
        <Card sx={{px: 5, py: 2, mx: 5, mb: 5}}>lorem ipsum</Card>
      </Stack>
  
    </Box>
    </>
  );
};

export default UserInfo;