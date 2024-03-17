import { Button, Typography } from '@mui/material';
import React, { useState, useEffect, useContext } from 'react';
import SpotContext from '../contexts/SpotContext';
import ReverseGeocodedAddressContext from '../contexts/ReverseGeocodedAddressContext';

const ReverseGeocodingComponent = () => {
  const { reverseGeocodedAddress, setReverseGeocodedAddress } = useContext(ReverseGeocodedAddressContext);
  const { markers, setMarkers } = useContext(SpotContext);

  return (
    <div>
        {reverseGeocodedAddress && (
          <Typography>
            住所: {reverseGeocodedAddress.formatted_address}
          </Typography>
        )}
    </div>
  );
};

export default ReverseGeocodingComponent;

export const ReverseGeocodeLatLng = async (markers) => {
  try {
    const geocoder = new window.google.maps.Geocoder();
    const response = await geocoder.geocode({ location: { lat: markers.lat, lng: markers.lng } });
    const resultAddress = response.results[0];
    return resultAddress
  } catch (error) {
    console.error('Reverse Geocode was not successful for the following reason: ' + error);
    return Promise.reject(error);
  }
};