import { getAuth, onAuthStateChanged } from "firebase/auth";
import UserInfo from "./UserInfo";
import { useContext, useEffect, useState } from "react";
import IsAuthContext from "../contexts/IsAuthContext";

const GetCurrentUserInfo = () => {
  const { isAuth, setIsAuth } = useContext(IsAuthContext);
  const [ userDisplayName, setUserDisplayName ] = useState(null);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    console.log(user);
    console.log(isAuth);
  }, [isAuth]);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsAuth(true);
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

  if (user !== null) {
    // The user object has basic properties such as display name, email, etc.
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;

    // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
    const uid = user.uid;
  }

  return (
    <UserInfo
      // displayName={userDisplayName}
      // photoURL={photoURL}
    />
  );
};

export default GetCurrentUserInfo;