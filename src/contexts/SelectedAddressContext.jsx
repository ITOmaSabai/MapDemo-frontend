import React, { createContext, useState } from 'react';

const SelectedAddressContext = createContext();

export const SelectedAddressProvider = ({ children }) => {
  const [selectedAddress, setSelectedAddress] = useState([]);

  return (
    <SelectedAddressContext.Provider value={{ selectedAddress, setSelectedAddress }}>
      {children}
    </SelectedAddressContext.Provider>
  );
};

export default SelectedAddressContext;