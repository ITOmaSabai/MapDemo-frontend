import { getAuth, onAuthStateChanged } from "firebase/auth";
import UserInfo from "./UserInfo";
import { useContext, useState } from "react";

const GetCurrentUserInfo = () => {
  const [ userDisplayName, setUserDisplayName ] = useState(null);
  const auth = getAuth();
  const user = auth.currentUser;
  console.log(user);

  onAuthStateChanged(auth, (user) => {
    if (user) {
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