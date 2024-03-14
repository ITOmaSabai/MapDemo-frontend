import { Button, Typography } from '@mui/material';
import React, { useState, useEffect, useContext } from 'react';
import SpotContext from '../contexts/SpotContext';
import { reverseGeocodeLatLng } from './reverseGeocodingFunctions';

const ReverseGeocodingComponent = (
  {
    // onSetAddressComponentsChange,
    // onSetFormattedAddressChange,
    // setAddressToSearchVideo
   }
  ) => {
  const [reverseGeocodedAddress, setReverseGeocodedAddress] = useState('');
  const { markers, setMarkers } = useContext(SpotContext);

  const handleReverseGeicide = () => {
    if (markers) {
      reverseGeocodeLatLng();
    }
  };

  return (
    <div>
      {markers ? (
        <Button
          variant="contained"
          color="info"
          type="submit"
          size='large'
          onClick={handleReverseGeicide}
        >
          動画を取得
        </Button>
       ) : (
        <Button
        variant="contained"
        color="info"
        type="submit"
        size='large'
        disable
        >
          動画を取得
        </Button>
      )
    }
              {reverseGeocodedAddress && (
        <Typography>
          住所: {reverseGeocodedAddress.formatted_address}
        </Typography>
      )}
    </div>
  );
};

export default ReverseGeocodingComponent;

export const reverseGeocodeLatLng = async (setReverseGeocodedAddress) => {
  try {
    const geocoder = new window.google.maps.Geocoder();
    const response = await geocoder.geocode({ location: { lat: markers.lat, lng: markers.lng } });
    setReverseGeocodedAddress(response.results[0]);
    // setAddressToSearchVideo(response.results[0])
    // onSetAddressComponentsChange(response.results[0].address_components);
    // onSetFormattedAddressChange(response.results[0].formatted_address);
  } catch (error) {
    console.error('Reverse Geocode was not successful for the following reason: ' + error);
  }
};