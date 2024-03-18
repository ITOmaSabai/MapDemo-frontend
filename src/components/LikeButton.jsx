import * as React from 'react';
import { Button } from '@mui/material';
import ClickedFavoriteIcon from './ClickedFavoriteIcon';

const LikeButton = () => {
  const [on, setOn] = React.useState(false);

  const handleLikeButtonClick = () => {
    setOn(!on);
  };

  return (
    <Button onClick={handleLikeButtonClick} sx={{height: "30px", width: "10px"}} disableRipple>
      <ClickedFavoriteIcon on={on}/>
    </Button>
  );
}

export default LikeButton;