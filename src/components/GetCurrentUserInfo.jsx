import { getAuth, onAuthStateChanged } from "firebase/auth";
import UserInfo from "./UserInfo";
import React, { useContext, useEffect, useState } from "react";
import IsAuthContext from "../contexts/IsAuthContext";
import { Button } from "@mui/material";
import { useUser } from "../Hooks/useUser";
import useFirebaseAuth from "../Hooks/useFirebasAuth";

const GetCurrentUserInfo = () => {
  const { isAuth, setIsAuth } = useContext(IsAuthContext);
  const [ userDisplayName, setUserDisplayName ] = useState(null);
  const [ currentUserInfo, setCurrentUserInfo ] = useState({});
  const { currentUser } = useFirebaseAuth();

  const getUserInfo = async () => {
    const verifyIdToken = async () => {
      const token = await currentUser?.getIdToken();
      console.log("userのトークン", token)
      try {
        const response = await fetch(`${process.env.REACT_APP_RAILS_API_ENDPOINT}/api/v1/profile`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('データの送信に失敗しました');
        }
        const data = await response.json();
        console.log('ユーザー情報を取得しました:', data);
      } catch (error) {
        console.error('エラー:', error);
      }
    };
    verifyIdToken();
  };


  return (
    <>
      <UserInfo
        // displayName={userDisplayName}
        // photoURL={photoURL}
      />
      {`userinfoは: ${getUserInfo()}`}
    </>
  );
};

export default GetCurrentUserInfo;