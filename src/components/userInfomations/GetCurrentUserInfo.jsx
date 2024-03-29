import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, IconButton, Input, Stack, TextField, Typography } from "@mui/material";
import useFirebaseAuth from "../../Hooks/useFirebasAuth";
import HeaderAppBar from "../HeaderAppBar";
import UserInfoTab from "./UserInfoTab";
import EditIcon from '@mui/icons-material/Edit';

const GetCurrentUserInfo = () => {
  const [ userDisplayName, setUserDisplayName ] = useState(null);
  const [ currentUserInfo, setCurrentUserInfo ] = useState({});
  const [ changedName, setChangedName ] = useState();
  const [ editing, setEditing ] = useState(false);
  const { currentUser } = useFirebaseAuth();

  const getUserInfo = async () => {
    const verifyIdToken = async () => {
      const token = await currentUser?.getIdToken();
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
        // console.log('ユーザー情報を取得しました:', data);
        setCurrentUserInfo(data)
        // return data;
      } catch (error) {
        console.error('エラー:', error);
      }
    };
    verifyIdToken();
  };

  const handleChangeName = (e) => {
    setChangedName(e.target.value);
  };

  useEffect(() => {
    if (currentUser) {
      getUserInfo();
    }
  }, [currentUser, ])

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSubmitName = (e) => {
    e.preventDefault();
    const createLike = async () => {
      const verifyIdToken = async () => {
        const token = await currentUser?.getIdToken();
        try {
          const response = await fetch(`${process.env.REACT_APP_RAILS_API_ENDPOINT}/api/v1/users/${currentUserInfo.id}`, {
            method: 'PATCH',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user: {
              name: changedName
            } })
          });
          if (!response.ok) {
            throw new Error('データの送信に失敗しました');
          };
          // const data = await response.json();
          // console.log('保存成功:', data);
          setEditing(false);
          getUserInfo();
        } catch (error) {
          console.error('エラー:', error);
        };
      };
      verifyIdToken();
    };
    createLike();
  };

  return (
    <>
      <Box sx={{textAlign: "center", height: "100vh"}} bgcolor={"primary.dark"} >
        <HeaderAppBar />
        <Stack sx={{mt: 5, textAlign: "center", pb: 3, display: "flex", justifyContent: "center", flexDirection: "row"}}>
          { currentUserInfo && (
            !editing ? (
              <>
                <Avatar src={currentUserInfo.avatar} sx={{mr: 3, width: 56, height: 56}}></Avatar>
                <Typography variant="h4" component="h2" fontFamily={"Menlo"} fontWeight={"bold"} color={"primary.light"}>{currentUserInfo.name}</Typography>
                <IconButton color="white" sx={{pl: 3}} onClick={handleEdit} >
                  <EditIcon variant={"contained"} sx={{color: "primary.light"}} />
                </IconButton>
              </>
            ) : (
              <>
                <Avatar src={currentUserInfo.avatar} sx={{mr: 3, width: 56, height: 56}}></Avatar>
                <form onSubmit={handleSubmitName}>
                  <Box display={"flex"} flexDirection={"row"}>
                    <Box bgcolor={"white"}>
                      <TextField
                        variant="outlined"
                        color="info"
                        defaultValue={`${currentUserInfo.name}`}
                        sx={{width: "300px"}}
                        onChange={handleChangeName}
                      >
                      </TextField>
                    </Box>
                    <Button
                      type="submit"
                      color="success"
                      variant="contained"
                      sx={{mt: 2, ml: 1}}
                    >
                      保存
                    </Button>
                  </Box>
                </form>
              </>
            )
          )}
        </Stack>
        <UserInfoTab />
      </Box>
    </>
  );
};

export default GetCurrentUserInfo;