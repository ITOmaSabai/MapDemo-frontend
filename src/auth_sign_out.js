import { getAuth, signOut } from "firebase/auth";
import { useContext } from "react";
import IsAuthContext from "./contexts/IsAuthContext";
import { Button } from "@mui/material";

const AuthSignOut = () => {
  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      window.location.href = '/';
    }).catch((error) => {
    });
  };

  return (
    <Button onClick={handleSignOut} >ログアウト</Button>
  );
};

export default AuthSignOut