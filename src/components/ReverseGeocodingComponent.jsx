import { Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';

const ReverseGeocodingComponent = ({ lat, lng, onSetAddressComponentsChange, onSetFormattedAddressChange }) => {
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (lat && lng) {
      reverseGeocodeLatLng(lat, lng);
    }
  }, [lat, lng]);

  const reverseGeocodeLatLng = async (lat, lng) => {
    try {
      const geocoder = new window.google.maps.Geocoder();
      const response = await geocoder.geocode({ location: { lat, lng } });
      setAddress(response.results[0]);
      onSetAddressComponentsChange(response.results[0].address_components);
      onSetFormattedAddressChange(response.results[0].formatted_address);
    } catch (error) {
      console.error('Reverse Geocode was not successful for the following reason: ' + error);
    }
  };

  return (
    <div>
      {address && (
        <Typography>
          住所: {address.formatted_address}
        </Typography>
      )}
    </div>
  );
};

export default ReverseGeocodingComponent;
