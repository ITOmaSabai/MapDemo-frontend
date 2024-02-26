import React, { useState, useEffect } from 'react';

const ReverseGeocodingComponent = ({ lat, lng, onAddressComponentsChange }) => {
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
      onAddressComponentsChange(response.results[0].address_components);
    } catch (error) {
      console.error('Reverse Geocode was not successful for the following reason: ' + error);
    }
  };

  return (
    <div>
      {address && (
        <p>住所: {address.formatted_address}</p>
      )}
    </div>
  );
};

export default ReverseGeocodingComponent;
