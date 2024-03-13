import { getAuth, onAuthStateChanged } from "firebase/auth";
import UserInfo from "./UserInfo";
import React, { useContext, useEffect, useState } from "react";
import IsAutContext from "../contexts/IsAuthContext";

const GetCurrentUserInfo = () => {
  const { isAuth, setIsAuth } = useContext(IsAuthContext);
  const [ userDisplayName, setUserDisplayName ] = useState(null);
  const [ currentUserInfo, setCurrentUserInfo ] = useState({});
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
    setCurrentUserInfo({
      name: displayName,
      uid: uid,
      avatar: photoURL
    })
  }

  return (
    <>
      <UserInfo
        // displayName={userDisplayName}
        // photoURL={photoURL}
      />
      <form >
        <input
          type="hidden"
          value={currentUserInfo.name}
          name="name"
        />
        <input
          type="hidden"
          value={currentUserInfo.uid}
          name="uid"
        />
        <input
          type="hidden"
          value={currentUserInfo.avatar}
          name="avatar"
        />


      </form>
    </>
  );
};

export default GetCurrentUserInfo;