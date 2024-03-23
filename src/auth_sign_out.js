import { getAuth, signOut } from "firebase/auth";
import { useContext } from "react";
import IsAuthContext from "./contexts/IsAuthContext";
import { Button } from "@mui/material";

const AuthSignOut = () => {
  const { setIsAuth } = useContext(IsAuthContext);

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      setIsAuth(false);
    }).catch((error) => {
    });
  };

  return (
    <Button onClick={handleSignOut} >ログアウト</Button>
  );
};

export default AuthSignOut