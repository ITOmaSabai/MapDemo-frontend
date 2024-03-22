import { Box, Typography } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useContext, useState } from "react";
import SelectedMarkerContext from "../../contexts/SelectedMarkerContext";
import ConfirmationModal from "./ConfirmationModal";
import IsNewMarkerSelectedContext from "../../contexts/IsNewMarkerSelectedContext";
import IsSavedMarkerSelectedContext from "../../contexts/IsSavedMarkerSelectedContext";
import IsTopInfoVisibleContext from "../../contexts/IsTopInfoVisibleContext";
import SpotContext from "../../contexts/SpotContext";
import SavedMarkerContext from "../../contexts/SavedMarkerContext";

const MapDeleteButton = () => {
  const { selectedMarker } = useContext(SelectedMarkerContext);
  const [open, setOpen] = useState(false);
  const { setIsNewMarkerSelected } = useContext(IsNewMarkerSelectedContext);
  const { setIsSavedMarkerSelected } = useContext(IsSavedMarkerSelectedContext);
  const { setIsTopInfoVisible } = useContext(IsTopInfoVisibleContext);
  const { setMarkers } = useContext(SpotContext);
  const { savedMarkers, setSavedMarkers } = useContext(SavedMarkerContext)

  const modalAction = "delete";

  const handleSpotDelete = () => {
    console.log("削除ボタンが押されました")
    deleteSpotData();

    setOpen(true);
    setIsTopInfoVisible(true);
    setIsNewMarkerSelected(false);
    setIsSavedMarkerSelected(false);
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
      const newMarkers = savedMarkers.filter(marker => marker.id !== selectedMarker);
      setSavedMarkers(newMarkers);
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
      {/* <ConfirmationModal modalAction={modalAction} open={open} setOpen={setOpen} deleteSpotData={deleteSpotData} /> */}
    </Box>
  )
};

export default MapDeleteButton;