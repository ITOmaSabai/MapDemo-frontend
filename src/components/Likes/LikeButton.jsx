import * as React from 'react';
import { Box, Button, Typography } from '@mui/material';
import ClickedFavoriteIcon from './ClickedFavoriteIcon';
import SelectedMarkerContext from '../../contexts/SelectedMarkerContext';
import useFirebaseAuth from '../../Hooks/useFirebasAuth';
import MessageModal from '../Modals/MessageModal';

const LikeButton = ({disabled, likesCount}) => {
  const [ on, setOn ] = React.useState(false);
  const { selectedMarker } = React.useContext(SelectedMarkerContext);
  const [ likeId, setLikeId ] = React.useState();
  const [ likedCount, setLikedCount] = React.useState(0);
  const { currentUser } = useFirebaseAuth();
  const [ open, setOpen ] = React.useState(false);

  const title = "ログインすると「いいね」ができます！";
  const body = "投稿者に気持ちを伝えましょう！"
  const icon = "😘 ❤️";

  // いいねボタンをクリックした際、onの状態に応じていいねする、またはいいねを削除する
  const handleLikeButtonClick = async () => {
    if (currentUser) {
      if (!on) {
        await createLike();
      } else {
        await destroyLike();
      }
    } else {
      setOpen(true);
    }
  };

  // いいねボタンを押した際、いいねする
  const createLike = async () => {
    const verifyIdToken = async () => {
      const token = await currentUser?.getIdToken();
      try {
        const response = await fetch(`${process.env.REACT_APP_RAILS_API_ENDPOINT}/api/v1/likes`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ like: {
            map_id: selectedMarker,
            uid: currentUser.uid
          } })
        });
        if (!response.ok) {
          throw new Error('データの送信に失敗しました');
        };
        const data = await response.json();
        setLikeId(data.id);
        setOn(true);
        // console.log('保存成功:', data);
      } catch (error) {
        console.error('エラー:', error);
      };
    };
    verifyIdToken();
  };

  // いいねボタンを押した際、いいねを削除する
  const destroyLike = async () => {
    const verifyIdToken = async () => {
      const token = await currentUser?.getIdToken();
      try {
        const response = await fetch(`${process.env.REACT_APP_RAILS_API_ENDPOINT}/api/v1/likes/${likeId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ like: {
            map_id: selectedMarker
          } })
        });
        // console.log('削除成功');
        setOn(false);
      } catch (error) {
        console.error('エラー:', error);
      };
    };
    verifyIdToken();
  };

  // 1.現在のいいね数、2.ログインしているユーザーからのいいねのid の2つを取得する
  React.useEffect(() => {
    fetch(`${process.env.REACT_APP_RAILS_API_ENDPOINT}/api/v1/likes?map_id=${selectedMarker}`)
      .then(response => response.json())
      .then(data => {
        // 現在のいいね数を保持
        setLikedCount(data.length);
        //いいねの配列から、現在のユーザーがつけたいいねのidを取得
        if (currentUser) {
          const likeByCurrentUser = data.find(like => like.uid === currentUser.uid);
          if (likeByCurrentUser && likeByCurrentUser !== null) {
            setLikeId(likeByCurrentUser.id);
            setOn(true);
          } else {
            setOn(false);
          }
        } else {
          setOn(false);
        }
      })
      .catch(error => console.error('Error:', error));
  }, [selectedMarker, handleLikeButtonClick, currentUser]);

  return (
    <>
      <MessageModal open={open} setOpen={setOpen} title={title} body={body} icon={icon} button={"login"}/>
      <Box display={"flex"} flexDirection={"column"}>
        <Button onClick={handleLikeButtonClick} sx={{height: "30px", width: "10px", pl: 4}} disabled={disabled} disableRipple>
          <ClickedFavoriteIcon on={on}/>
        </Button>
        <Typography color={"white"} sx={{pl: 4.75}} display={"flex"} justifyContent={"left"}>
          {likesCount && likesCount !== null ? likesCount : likedCount}
        </Typography>
      </Box>
    </>
  );
}

export default LikeButton;