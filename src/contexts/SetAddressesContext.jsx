import React, { createContext, useState } from 'react';

const SetAddressesContext = createContext();

export const SetAddressesProvider = ({ children }) => {
  const [setAddresses, setSetAddresses] = useState(false);

  return (
    <SetAddressesContext.Provider value={{ setAddresses, setSetAddresses }}>
      {children}
    </SetAddressesContext.Provider>
  );
};

export default SetAddressesContext;