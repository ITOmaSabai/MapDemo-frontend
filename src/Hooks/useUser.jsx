import { useAuthContext } from "../context/AuthContext";

export function useUser() {
  const { currentUser } = useAuthContext();

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
    const res = await fetch(
      `${process.env.REACT_APP_RAILS_API_ENDPOINT}/api/v1/user`,
      config,
      // `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user`,
      // config
    )
    console.log(res.data.json);
    return res.data.user;
  };

  return {
    getUserInfo,
  };
}