import { Button, Typography } from "@mui/material";
import useFirebaseAuth from "../Hooks/useFirebasAuth";

const SignInButton = () => {
  const { loginWithGoogle } = useFirebaseAuth();

  const handleGoogleLogin = () => {
    const verifyIdToken = async () => {
      const user = await loginWithGoogle();
      const token = await user?.getIdToken();

      const config = {
        headers: { 'Authorization': `Bearer ${token}` },
      };

      console.log(config.headers);

      fetch(`${process.env.REACT_APP_RAILS_API_ENDPOINT}/api/v1/authentication`, {
        method: 'POST',
        headers: config.headers,
        // headers: {
        //   'Authorization': `Bearer ${token}`,
          // 'Content-Type': 'application/json'
      // } ,
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
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
    <Button onClick={handleGoogleLogin} >
      <Typography fontWeight={"bold"} >
        サインイン
      </Typography>
    </Button>
  );
};

export default SignInButton;
