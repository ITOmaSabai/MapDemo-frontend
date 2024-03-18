import * as React from 'react';
import { Button } from '@mui/material';
import ClickedFavoriteIcon from './ClickedFavoriteIcon';
import SelectedAddressContext from '../contexts/SelectedAddressContext';

const LikeButton = () => {
  const [on, setOn] = React.useState(false);
  const { selectedMarker } = React.useContext(SelectedAddressContext);

  const handleLikeButtonClick = () => {
    setOn(!on);
  };

  const createLike = async () => {
    try {
      const response = await fetch("", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ like: {
          user_id: 1,
          map_id: selectedMarker
        } })
      });
      if (!response.ok) {
        throw new Error('データの送信に失敗しました');
      };
      const data = await response.json();
      console.log('保存成功:', data);
    } catch (error) {
      console.error('エラー:', error);
    };
  };

  const destroyLike = async (likeId) => {
    try {
      const response = await fetch(`${process.env.RAILS_API_ENDPOINT}/api/v1/likes`, {
        method: 'DESTROY',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ like: {
          map_id: selectedMarker
        } })
      });
      console.log('保存成功:');
    } catch (error) {
      console.error('エラー:', error);
    };
  };

  return (
    <Button onClick={handleLikeButtonClick} sx={{height: "30px", width: "10px"}} disableRipple>
      <ClickedFavoriteIcon on={on}/>
    </Button>
  );
}

export default LikeButton;