import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const AutocompleteComponent = ({options}) => {
  return (
    <Autocomplete
      key={options.id}
      disablePortal
      id="combo-box-demo"
      options={options}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} name="Place" />}
    />
  );
}

export default AutocompleteComponent;
