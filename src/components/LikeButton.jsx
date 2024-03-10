import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box, IconButton, ToggleButton, Typography } from '@mui/material';

const LikeButton = () => {
  const [value, setValue] = React.useState('recents');
  const [count, setCoutnt] = React.useState(0);
  const [selected, setSelected] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLikeButtonClick = () => {
    setCoutnt(count + 1);
  };

  return (
    <Box>
    {/* <BottomNavigation sx={{ width: 100 }} value={value} onChange={handleChange}> */}
      <ToggleButton
        aria-label="like"
        color="warning"
        onClick={handleLikeButtonClick}
        selected={selected}
        onChange={() => setSelected(!selected)}
      >
        <FavoriteIcon />
        {/* label="Favorites"
        value="favorites"
        icon={<FavoriteIcon />}
        color="info.main" */}
      </ToggleButton>
      <Typography fontSize={10} color={"primary.light"}>
        {count}
      </Typography>
      </Box>
    // </BottomNavigation>
  );
}

export default LikeButton;