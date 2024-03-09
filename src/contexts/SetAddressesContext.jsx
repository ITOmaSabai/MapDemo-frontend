import React, { createContext, useState } from 'react';

const SetAddressesContext = createContext();

export const SetAddressesProvider = ({ children }) => {
  const [addresses, setAddresses] = useState(false);

  return (
    <SetAddressesContext.Provider value={{ addresses, setAddresses }}>
      {children}
    </SetAddressesContext.Provider>
  );
};

export default SetAddressesContext;