import { getAuth, onAuthStateChanged } from "firebase/auth";
import UserInfo from "./UserInfo";
import React, { useContext, useEffect, useState } from "react";
import IsAuthContext from "../../contexts/IsAuthContext";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import { useUser } from "../../Hooks/useUser";
import useFirebaseAuth from "../../Hooks/useFirebasAuth";
import HeaderAppBar from "../HeaderAppBar";

const GetCurrentUserInfo = () => {
  const { isAuth, setIsAuth } = useContext(IsAuthContext);
  const [ userDisplayName, setUserDisplayName ] = useState(null);
  const [ currentUserInfo, setCurrentUserInfo ] = useState({});
  const { currentUser } = useFirebaseAuth();

  const getUserInfo = async () => {
    const verifyIdToken = async () => {
      const token = await currentUser?.getIdToken();
      console.log(token)
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
        return data;
      } catch (error) {
        console.error('エラー:', error);
      }
    };
    return verifyIdToken();
  };

  useEffect(() => {
    getUserInfo().then(data => {
      // dataを使って画面に表示する処理をここに書く
      setCurrentUserInfo(data);
      console.log(data);
    });
  }, [])

  return (
    <>
      <Box sx={{textAlign: "center", height: "100vh"}} bgcolor={"primary.dark"} >
      <HeaderAppBar />
      <Stack sx={{mt: 5, textAlign: "center", mb: 10, display: "flex", justifyContent: "center", flexDirection: "row"}}>
        { currentUser ? (
        <>
          <Avatar src={currentUser.photoURL} sx={{mr: 3}}></Avatar>
          <Typography variant="h4" component="h2" fontFamily={"Menlo"} fontWeight={"bold"} color={"primary.light"}>{currentUser.displayName}</Typography>
        </>
        ) :(null)}
      </Stack>

    </Box>
    </>
  );
};

export default GetCurrentUserInfo;