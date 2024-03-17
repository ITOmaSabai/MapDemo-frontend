import { Button } from "@mui/material";
import useFirebaseAuth from "../Hooks/useFirebasAuth";

const SignInButton = () => {
  const { loginWithGoogle } = useFirebaseAuth();

  const handleGoogleLogin = () => {
    const verifyIdToken = async () => {
      const user = await loginWithGoogle();
      const token = await user?.getIdToken();

      const config = {
        headers: { "Authorization": `Bearer ${token}` },
      };

      fetch('http://localhost:3000/api/v1/authentication', {
        method: 'POST',
        headers: config,
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
    };

  verifyIdToken();
  };

  return (
    <Button onClick={handleGoogleLogin} >
      サインイン
    </Button>
  );
};

export default SignInButton;
