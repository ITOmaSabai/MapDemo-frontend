import * as React from 'react';
import { useState } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/material';

const ClickableAndDeletableChips = ({chips, setChips}) => {

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  const handleDelete = (chipkey) => {
    setChips((chips) => chips.filter(chip => chip.key !== chipkey));
    // console.info('You clicked the delete icon.');
  };

  return (
    <Box sx={{p: "10px"}}>
      <Stack direction="row" spacing={1} useFlexGap flexWrap={"wrap"}>
        {chips.map(chip => (
            <Chip
              label={chip.label}
              variant="filled"
              color="primary"
              onClick={handleClick}
              onDelete={() => handleDelete(chip.key)}
              size='small'
            />
        ))}
      </Stack>
    </Box>

  );
}

export default ClickableAndDeletableChips;