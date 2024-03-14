import React, { createContext, useState } from 'react';

const ReverseGeocodedAddressContext = createContext();

export const ReverseGeocodedAddressProvider = ({ children }) => {
  const [reverseGeocodedAddress, setReverseGeocodedAddress] = useState({});

  return (
    <ReverseGeocodedAddressContext.Provider value={{ reverseGeocodedAddress, setReverseGeocodedAddress }}>
      {children}
    </ReverseGeocodedAddressContext.Provider>
  );
};

export default ReverseGeocodedAddressContext;