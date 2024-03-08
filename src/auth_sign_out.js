import { getAuth, signOut } from "firebase/auth";
import { useContext } from "react";
import IsAuthContext from "./contexts/IsAuthContext";

const AuthSignOut = () => {
  const { setIsAuth } = useContext(IsAuthContext);

  const auth = getAuth();
  signOut(auth).then(() => {
    // Sign-out successful.
    console.log("サインアウトしました");
    setIsAuth(false);
  }).catch((error) => {
    // An error happened.
  });
};

export default AuthSignOut