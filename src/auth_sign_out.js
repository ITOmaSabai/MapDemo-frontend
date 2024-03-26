import { getAuth, signOut } from "firebase/auth";
import { Button } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';


const AuthSignOut = () => {
  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      window.location.href = '/';
    }).catch((error) => {
    });
  };

  return (
    <Button onClick={handleSignOut} color="warning">
      <LogoutIcon sx={{mr: 2}} />
      ログアウト
    </Button>
  );
};

export default AuthSignOut