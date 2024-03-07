import React, { useContext } from 'react';
import AutocompleteComponent from './AutoCompleteComponent';
import SavedMarkerContext from '../contexts/SavedMarkerContext';
import ClickableAndDeletableChips from './ClickableAndDeletableChips';
import Box from '@mui/material/Box';

const SpotSearchBox = () => {
  const {savedMarkers} = useContext(SavedMarkerContext);

  const savedMarkerList = savedMarkers.map(savedMarker => ({
    label: savedMarker.name,
    id: savedMarker.id
  }));

  return (
    <Box>
      <AutocompleteComponent options={savedMarkerList}/>
      {/* <ClickableAndDeletableChips/> */}
    </Box>
  )
}

export default SpotSearchBox;