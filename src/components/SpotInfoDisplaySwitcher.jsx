import React, { useContext } from "react";
import SpotInfo from "./SpotInfo";
import PostSpotForm from "./PostSpotForm";
import IsNewMarkerSelectedContext from "../contexts/IsNewMarkerSelectedContext";
import IsSavedMarkerSelectedContext from "../contexts/IsSavedMarkerSelectedContext";
import SearchVideo from "./SearchVideo";

const SpotInfoDisplaySwitcher = () => {
  const { isNewMarkerSelected } = useContext(IsNewMarkerSelectedContext);
  const { isSavedMarkerSelected } = useContext(IsSavedMarkerSelectedContext);

  return (
    <>
      {isSavedMarkerSelected && <SpotInfo /> }
      {isNewMarkerSelected && <SearchVideo /> }
    </>
  );
};

export default SpotInfoDisplaySwitcher;