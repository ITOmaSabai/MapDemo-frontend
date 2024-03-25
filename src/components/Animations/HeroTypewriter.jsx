import { Backpack, Close, Language, Laptop, LaptopMac } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import { grey } from '@mui/material/colors';

const HeroTypewriter = () => {

  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.setItem('animationWatched', true);

    const timer = setTimeout(() => {
      window.location.redirect('/')
    }, 4500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Box sx={{height: "100vh", pl: 10}} bgcolor={grey[800]} textAlign={"center"} display={"flex"} alignItems={"center"} justifyContent={"space-between"} >
      <Box sx={{pr: 0}} display={"flex"} flexDirection={"row"}>
        <LaptopMac sx={{color: "#F0F0F0", fontSize: 110}} ></LaptopMac>
        <Close sx={{color: "#F0F0F0", fontSize: 110}} ></Close>
        <Backpack sx={{color: "#F0F0F0", fontSize: 110}} ></Backpack>
        <Close sx={{color: "#F0F0F0", fontSize: 110}} ></Close>
        <Language sx={{color: "#F0F0F0", fontSize: 110}} ></Language>
      </Box>
      <Typography variant='h1' fontSize={"100px"} fontFamily={'Menlo'} color={"#F0F0F0"} sx={{pr: 10}}>
        <Typewriter
          options={{
            autoStart: true,
            loop: false,
            delay: 70,
            strings: ["BackHacker."],
            pauseFor: 10000,
            cursor: "",
            deleteSpeed: 'natural'
          }}
        >
        </Typewriter>
      </Typography>
    </Box>
  )
};

export default HeroTypewriter;