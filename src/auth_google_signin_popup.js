import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase";

const AuthGoogleSIgninPopup = () => {
  signInWithPopup(auth, provider)
  .then((result) => {
    // The signed-in user info.
    const user = result.user;
    console.log(result)
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
};

export default AuthGoogleSIgninPopup;