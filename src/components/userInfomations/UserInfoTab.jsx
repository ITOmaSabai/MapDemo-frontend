import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SpotCard from '../SpotCard';
import { Stack } from '@mui/material';
import SpotInfo from '../spotInfomations/SpotInfo';
import SpotInfoCard from './SpotInfoCard';
import LikedSpotInfoCard from './LikedSpotInfoCard';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function UserInfoTab() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', minHeight: "75%" }} bgcolor={"#F0F0F0"} >
      <Box sx={{ borderBottom: 1, borderColor: 'devider', width: '40%' }} display={"flex"} alignItems={"center"} justifyContent={'center'}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
          <Tab label="投稿したスポット" {...a11yProps(0)} color='"primary.light'/>
          <Tab label="いいねしたスポット" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Typography sx={{mb: 3}}>投稿したスポット</Typography>
        <Stack>
          <SpotInfoCard />
        </Stack>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <Typography sx={{mb: 3}}>いいねしたスポット</Typography>
      <Stack>
          <LikedSpotInfoCard />
        </Stack>
      </CustomTabPanel>
    </Box>
  );
}