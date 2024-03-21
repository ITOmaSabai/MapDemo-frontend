import { Box, Typography } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useContext } from "react";
import SelectedMarkerContext from "../../contexts/SelectedMarkerContext";

const MapDeleteButton = () => {
  const { selectedMarker } = useContext(SelectedMarkerContext);

  const handleSpotDelete = () => {
    console.log("削除ボタンが押されました")
    deleteSpotData();
  };

  const deleteSpotData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_RAILS_API_ENDPOINT}/api/v1/maps/${selectedMarker}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('データの送信に失敗しました');
      }
      console.log('削除成功');
    } catch (error) {
      console.error('エラー:', error);
    }
  };

  return (
    <Box sx={{p: 0, m: 0}} display={"flex"} flexDirection={"row"} color={"red"} onClick={handleSpotDelete} >
      <DeleteForeverIcon fontSize="small" sx={{mr: 1}} />
      <Typography >
        削除
      </Typography>
    </Box>
  )
};

export default MapDeleteButton;