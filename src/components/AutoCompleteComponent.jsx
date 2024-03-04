import * as React from 'react';
import { useContext } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import SavedMarkerContext from '../contexts/SavedMarkerContext';

const AutocompleteComponent = ({options}) => {
  console.log(options)
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={options}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} name="Place" />}
    />
  );
}

export default AutocompleteComponent;
