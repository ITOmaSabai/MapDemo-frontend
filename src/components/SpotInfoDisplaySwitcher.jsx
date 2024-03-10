import React, { useContext } from "react";
import SpotInfo from "./SpotInfo";
import PostSpotForm from "./PostSpotForm";

const SpotInfoDisplaySwitcher = () => {
  const { isSavedMarkerSelected, SetIsSavedMarkerSelected } = useContext(false);
  const { isNewMarkerSelected, setIsNewMarkerSelected } = useContext(true);


  return (
    <>
      {isSavedMarkerSelected && <SpotInfo /> }
      {isNewMarkerSelected && <PostSpotForm /> }
    </>
  );
};

export default SpotInfoDisplaySwitcher;