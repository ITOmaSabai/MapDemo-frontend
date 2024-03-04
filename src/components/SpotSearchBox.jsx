import React, { useContext } from 'react';
import AutocompleteComponent from './AutoCompleteComponent';
import SavedMarkerContext from '../contexts/SavedMarkerContext';
import ClickableAndDeletableChips from './ClickableAndDeletableChips';

const SpotSearchBox = () => {
  const {savedMarkers} = useContext(SavedMarkerContext);

  const savedMarkerList = savedMarkers.map(savedMarker => ({
    label: savedMarker.name,
    id: savedMarker.id
  }));

  return (
    <div style={{padding: "10px"}}>
      スポット名を検索
      <AutocompleteComponent options={savedMarkerList}/>
      <ClickableAndDeletableChips/>
    </div>
  )
}

export default SpotSearchBox;