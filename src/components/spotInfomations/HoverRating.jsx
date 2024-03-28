import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { Typography } from '@mui/material';

const labels = {
  1: '改善して 😡',
  2: '微妙だね 🤔',
  3: '普通 😇',
  4: 'いい感じ 🥳',
  5: '最高 🎉',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function HoverRating({setAction}) {
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);

  return (
    <Box
      sx={{
        width: 400,
        // height: 400,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      <Rating
        name="hover-feedback"
        value={value}
        precision={1}
        sx={{mb: 1, fontSize: 40}}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
          setAction(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2, height: "1.5rem" }}>
          <Typography  fontSize="14px">
            {labels[hover !== -1 ? hover : value]}
          </Typography>
        </Box>
      )}
    </Box>
  );
}