import { Button, Typography } from "@mui/material";
import useFirebaseAuth from "../Hooks/useFirebasAuth";
import LoginIcon from '@mui/icons-material/Login';

const SignInButton = ({variant, color}) => {
  const { loginWithGoogle } = useFirebaseAuth();

  const handleGoogleLogin = () => {
    const verifyIdToken = async () => {
      const user = await loginWithGoogle();
      const token = await user?.getIdToken();

      const config = {
        headers: { 'Authorization': `Bearer ${token}` },
      };

      fetch(`${process.env.REACT_APP_RAILS_API_ENDPOINT}/api/v1/authentication`, {
        method: 'POST',
        headers: config.headers,
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        window.location.href = '/';
        return response.json();
      })
      .then(data => console.log(data))
      .catch(err => {
        console.error('Error:', err);
      });
    }

  verifyIdToken();
  };

  return (
    <Button onClick={handleGoogleLogin} variant={variant} color={color} size="large" >
      <LoginIcon sx={{mr: 1}}/>
      <Typography fontWeight={"bold"} >
        ログイン
      </Typography>
    </Button>
  );
};

export default SignInButton;
