import * as React from 'react';
import { Button, Typography } from '@mui/material';
import ClickedFavoriteIcon from './ClickedFavoriteIcon';
import SelectedMarkerContext from '../contexts/SelectedMarkerContext';

const LikeButton = ({selectedSpotInfomation}) => {
  const [ on, setOn ] = React.useState(false);
  const { selectedMarker } = React.useContext(SelectedMarkerContext);
  const [ likeId, setLikeId ] = React.useState();
  const [ likedCount, setLikedCount] = React.useState(0);

  // スポットにlikeが存在すれば、ボタンをいいね済み状態にする
  React.useEffect(() => {
    if (selectedSpotInfomation && selectedSpotInfomation.likes.length > 0) {
      setOn(true);
      const likeId  = selectedSpotInfomation.likes.find(like => like.user_id === 1)
      setLikeId(likeId.id);
      // console.log(selectedSpotInfomation)
    } else {
      setOn(false);
      console.log(selectedSpotInfomation)

    }

    return () => {
      setOn(false);
    }
  }, [selectedSpotInfomation]);

  // いいねボタンをクリックした際、onの状態に応じていいねする、またはいいねを削除する
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

  React.useEffect(() => {
    fetch(`http://localhost:3000/api/v1/likes?map_id=${selectedMarker}`)
      .then(response => {
        response.json()
      })
      .then(data => {
        setLikedCount(data)
        console.log(data)
      }
      )
      .catch(error => console.error('Error:', error));
  }, [selectedMarker]);
  console.log(likedCount);

  return (
    <>
      <Button onClick={handleLikeButtonClick} sx={{height: "30px", width: "10px", pl: 4}} disableRipple>
        <ClickedFavoriteIcon on={on}/>
      </Button>
      <Typography color={"white"}>
        {likedCount}
      </Typography>
    </>
  );
}

export default LikeButton;