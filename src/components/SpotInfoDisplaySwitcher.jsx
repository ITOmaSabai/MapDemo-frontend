import React, { useContext, useState, useEffect } from "react";
import SpotInfo from "./SpotInfo";
import PostSpotForm from "./PostSpotForm";
import IsNewMarkerSelectedContext from "../contexts/IsNewMarkerSelectedContext";
import IsSavedMarkerSelectedContext from "../contexts/IsSavedMarkerSelectedContext";
import SearchVideo from "./SearchVideo";
import TopInfo from "./TopInfo";
import IsTopInfoVisibleContext from "../contexts/IsTopInfoVisibleContext";

const SpotInfoDisplaySwitcher = () => {
  const { isNewMarkerSelected, setIsNewMarkerSelected } = useContext(IsNewMarkerSelectedContext);
  const { isSavedMarkerSelected, setIsSavedMarkerSelected } = useContext(IsSavedMarkerSelectedContext);
  const { isTopInfoVisible, setIsTopInfoVisible } = useContext(IsTopInfoVisibleContext);

  useEffect(() => {
    setIsTopInfoVisible(true);
    setIsNewMarkerSelected(false);
    setIsSavedMarkerSelected(false);
  }, []);

  return (
    <>
      {isTopInfoVisible && <TopInfo />}
      {isSavedMarkerSelected && <SpotInfo /> }
      {isNewMarkerSelected && <SearchVideo /> }
    </>
  );
};

export default SpotInfoDisplaySwitcher;