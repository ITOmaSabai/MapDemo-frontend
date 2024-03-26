import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
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
        <Box sx={{ p: 5, display: "flex", justifyContent: "center" }}>
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
    <Box sx={{ width: '100%', minHeight: "75%" }} bgcolor={"#F0F0F0"} display={"flex"} flexDirection={"column"} alignItems={"center"} >
      <Box sx={{ borderBottom: "none", borderColor: 'devider', width: '40%', display: "flex", justifyContent: "center" }} >
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
          <Tab label="投稿したスポット" {...a11yProps(0)} color='"primary.light'/>
          <Tab label="いいねしたスポット" {...a11yProps(1)} color='"primary.light'/>
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Box display={"flex"} flexDirection={"column"} justifyContent={'space-between'} alignItems={"center"} >
          <SpotInfoCard />
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <Box>
          <LikedSpotInfoCard />
        </Box>
      </CustomTabPanel>
    </Box>
  );
}