import { Box, Button, Paper, TextField, Typography } from "@mui/material"
import SendIcon from '@mui/icons-material/Send';
import HoverRating from "./HoverRating"
import { useEffect, useState } from "react";

export const Feedback = () => {
  const [ usabilityRating, setUsabilityRating ] = useState();
  const [ designRating, setDesignRating ] = useState();
  const [ opinionBody, setOpinionBody ] = useState();
  const [ isSubmitDisabled, setIsSubmitDisabled ] = useState(true);

  const style = {
    mx: 1,
    px: 2,
    mb: 5,
    display: 'flex',
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  };

  useEffect(() => {
    if (usabilityRating && designRating && opinionBody && opinionBody !== "") {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [usabilityRating, designRating, opinionBody]);

  const handleChangeOpinion = (e) => setOpinionBody(e.target.value);

  const handlePostFeedback = async(e) => {
    e.preventDefault();
    setIsSubmitDisabled(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_RAILS_API_ENDPOINT}/api/v1/maps`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ opinion: {
          usability_rating: usabilityRating,
          design_rating: designRating,
          body: opinionBody
        } }),
      });
      if (!response.ok) {
        throw new Error('データの送信に失敗しました');
      }
      const data = await response.json();
      console.log('保存成功:', data);
      // formの値を空にする
    } catch (error) {
      console.error('エラー:', error);
      setIsSubmitDisabled(false);
    }
  };

  return (
    <Paper
      square
      sx={{
        bgcolor: "#F0F0F0",
        maxHeight: "90vh",
        minHeight: "90vh",
        width:"360px",
        m: 0,
        pt: 7
      }}
      elevation={0}
    >
      <form onSubmit={handlePostFeedback} >
        <Box sx={style} >
          <Typography>アプリの使いやすさ、操作性は</Typography>
          <Typography sx={{pb: 2}}>どうでしたか？</Typography>
          <HoverRating setAction={setUsabilityRating} />
        </Box>
        <Box sx={style} >
          <Typography>アプリのデザイン(色使い、見た目)は</Typography>
          <Typography sx={{pb: 2}}>どうでしたか？</Typography>
          <HoverRating setAction={setDesignRating} />
        </Box>
        <Box sx={style} >
          <TextField
            fullWidth="true"
            color="info"
            label="ご意見"
            placeholder="こうすればもっと良くなる！という点を教えてください！"
            multiline="true"
            rows={3}
            minHeight="300"
            maxHeight="300"
            size="medium"
            onChange={handleChangeOpinion}
          ></TextField>
        </Box>
        <Box
          sx={{
            px: 8,
            display: 'flex',
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            type="submit"
            fullWidth
            size="large"
            variant="contained"
            color="info"
            endIcon={<SendIcon />}
            disabled={isSubmitDisabled}
          >
            送信 🙌
          </Button>
          <Typography sx={{pt: 1}} fontSize={14}>(名前は送信されません)</Typography>
        </Box>
      </form>
    </Paper>
  )
}

