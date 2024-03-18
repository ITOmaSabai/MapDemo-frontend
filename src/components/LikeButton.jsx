import * as React from 'react';
import { Button } from '@mui/material';
import ClickedFavoriteIcon from './ClickedFavoriteIcon';
import SelectedMarkerContext from '../contexts/SelectedMarkerContext';

const LikeButton = () => {
  const [ on, setOn ] = React.useState(false);
  const { selectedMarker } = React.useContext(SelectedMarkerContext);
  const [ likeId, setLikeId ] = React.useState();

  const handleLikeButtonClick = async () => {
    setOn(!on);
    if (!on) {
      await createLike();
    } else {
      await destroyLike();
    }
  };

  const createLike = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_RAILS_API_ENDPOINT}/api/v1/likes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ like: {
          user_id: 1,
          map_id: selectedMarker,
        } })
      });
      if (!response.ok) {
        throw new Error('データの送信に失敗しました');
      };
      const data = await response.json();
      setLikeId(data.id);
      console.log('保存成功:', data);
    } catch (error) {
      console.error('エラー:', error);
    };
  };

  const destroyLike = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_RAILS_API_ENDPOINT}/api/v1/likes/${likeId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ like: {
          map_id: selectedMarker
        } })
      });
      console.log('削除成功');
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