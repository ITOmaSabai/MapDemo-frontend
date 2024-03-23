import { getAuth, onAuthStateChanged } from "firebase/auth";
import UserInfo from "./UserInfo";
import React, { useContext, useEffect, useState } from "react";
import IsAuthContext from "../contexts/IsAuthContext";
import { Button } from "@mui/material";

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
      const displayName = user.displayName;
      const email = user.email;
      const photoURL = user.photoURL;
      const emailVerified = user.emailVerified;
      const uid = user.uid;
      // ...
      setCurrentUserInfo({
        userName: displayName,
        uid: uid,
        avatar: photoURL
      })
    } else {
      // User is signed out
      // ...
    }
  });

  // if (user !== null) {
    // The user object has basic properties such as display name, email, etc.
   
    // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.

  // };

  const createUser = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_RAILS_API_ENDPOINT}/api/v1/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: {
          name: currentUserInfo.userName,
          uid: currentUserInfo.uid,
          avatar: currentUserInfo.avatar
        } }),
      });
      if (!response.ok) {
        throw new Error('データの送信に失敗しました');
      }
      const data = await response.json();
      console.log('保存成功:', data);
    } catch (error) {
      console.error('エラー:', error);
    }
  };

  const handleCreateUserSubmit = async (e) => {
    e.preventDefault();
    await createUser();
  };

  // console.log(currentUserInfo)

  return (
    <>
      <UserInfo
        // displayName={userDisplayName}
        // photoURL={photoURL}
      />
      <form onSubmit={handleCreateUserSubmit}>
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
        <Button color="info" type="submit">ユーザー登録する</Button>
      </form>
    </>
  );
};

export default GetCurrentUserInfo;