import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";

export default function useFirebaseAuth() {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    if (result) {
      const user = result.user;
      setCurrentUser(user);
      return user;
    }
  };

  const clear = () => {
    setCurrentUser(null);
    setLoading(false);
  };

  const logout = () => {
    signOut(auth).then(clear);
  };

  const nextOrObserver = async (user) => {
    if (!user) {
      setLoading(false);
      console.log("ユーザーがログアウトしました")
      return;
    }

    setLoading(true);
    setCurrentUser(user);
    setLoading(false);
  };

  // Firebaseのstateの状態変化を監視する
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, nextOrObserver);
    return unsubscribe;
  }, []);

  return {
    currentUser,
    loading,
    loginWithGoogle,
    logout,
  };
}