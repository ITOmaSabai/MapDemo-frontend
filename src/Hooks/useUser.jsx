import { useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import useFirebaseAuth from "./useFirebasAuth";

export function useUser() {
  // const { currentUser } = useAuthContext();
  const { currentUser } = useFirebaseAuth();

  // ログイン中のユーザーがいれば、tokenを取得しヘッダーに含める
  const setIdToken = async () => {
    const token = await currentUser?.getIdToken();
    if (!token) {
      throw new Error('No token found');
    }
    const config = {
      headers: { authorization: `Bearer ${token}` },
    };
    return config;
  };

  const getUserInfo = async () => {
    const config = await setIdToken();
    const res = await fetch(`${process.env.REACT_APP_RAILS_API_ENDPOINT}/api/v1/users`, {
      method: 'GET',
        headers: {
          config,
          'Content-Type': 'application/json',
        },
      }
    )
    return res.data.user;
  };

  return {
    getUserInfo,
  };
}