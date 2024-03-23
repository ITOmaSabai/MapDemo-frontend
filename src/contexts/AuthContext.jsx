import { createContext, useContext } from "react";
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'
import useFirebaseAuth from "../Hooks/useFirebasAuth";

// ログイン中のユーザーの情報を保持する
export const AuthContext = createContext('');

export const AuthContextProvider = ({ children }) => {
  const { currentUser, loading, loginWithGoogle, logout } = useFirebaseAuth();

  const context = {
    currentUser: currentUser,
    loading: loading,
    loginWithGoogle: loginWithGoogle,
    logout: logout,
  };

  return (
      <AuthContext.Provider value={context}>
        { children }
      </AuthContext.Provider>
  )
};

export const useAuthContext = () => useContext(AuthContext);