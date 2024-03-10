import React, { useContext } from "react";
import SpotInfo from "./SpotInfo";
import PostSpotForm from "./PostSpotForm";

const SpotInfoDisplaySwitcher = () => {
  const { isNewMarkerSelected, setIsNewMarkerSelected } = useContext(IsNewMarkerSelectedContext);
  const { isSavedMarkerSelected, SetIsSavedMarkerSelected } = useContext(IsSavedMarkerSelectedContext);


  return (
    <>
      {isSavedMarkerSelected && <SpotInfo /> }
      {isNewMarkerSelected && <PostSpotForm /> }
    </>
  );
};

export default SpotInfoDisplaySwitcher;