import * as React from 'react';
import { useContext } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import SavedMarkerContext from '../contexts/SavedMarkerContext';

const AutocompleteComponent = () => {
  const {savedMarkers} = useContext(SavedMarkerContext);
  const savedMarkerList = savedMarkers.map(savedMarker => ({
    label: savedMarker.name
  }));

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={savedMarkerList}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} name="Place" />}
    />
  );
}

export default AutocompleteComponent;
