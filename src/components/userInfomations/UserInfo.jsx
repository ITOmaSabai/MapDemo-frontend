import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import HeaderAppBar from '../HeaderAppBar';
import useFirebaseAuth from "../../Hooks/useFirebasAuth";

const UserInfo = ({currentUserInfo}) => {
  const { currentUser } = useFirebaseAuth();

  return (
    <>
    <HeaderAppBar />
    <Box sx={{p: 5, textAlign: "center", height: "80vh"}} bgcolor={"primary.dark"} >
      <Stack sx={{textAlign: "center", mb: 10, display: "flex", justifyContent: "center", flexDirection: "row"}}>
        { currentUser ? (
        <>
          <Avatar src={currentUser.photoURL}></Avatar>
          <Typography variant="h4" component="h2" fontFamily={"Menlo"} fontWeight={"bold"} color={"primary.light"}>{currentUser.displayName}</Typography>
        </>
        ) :(null)}
      </Stack>

    </Box>
    </>
  );
};

export default UserInfo;