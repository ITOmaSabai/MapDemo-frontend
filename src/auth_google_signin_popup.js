import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from "./firebase";
import GetCurrentUserInfo from "./components/GetCurrentUserInfo";
import { useState } from "react";

const AuthGoogleSIgninPopup = () => {
  // const [ currentUserInfo, setCurrentUserInfo ] = useState({});
  const auth = getAuth();

  signInWithPopup(auth, provider)
  .then(async (result) => {
    // The signed-in user info.
    const user = result.user;
    console.log(user)
    // const token = await user.getIdToken();
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    // ??
    const config = { "Authorization": `Bearer ${token}` }
    console.log(config)
    console.log(user.displayName)
    postSignInData(config, user);
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

  const postSignInData = (config, user) => {
    fetch(`${process.env.REACT_APP_RAILS_API_ENDPOINT}/api/v1/users`, {
      method: 'POST',
      headers: config,
      body: JSON.stringify({ user: {
        name: user.displayName,
        uid: user.uid,
        avatar: user.photoURL
      } }),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  }

};

export default AuthGoogleSIgninPopup;