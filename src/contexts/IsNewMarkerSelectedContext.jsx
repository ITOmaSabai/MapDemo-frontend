import React, { createContext, useState } from 'react';

const IsNewMarkerSelectedContext = createContext();

export const IsNewMarkerSelectedProvider = ({ children }) => {
  const [isNewMarkerSelected, setIsNewMarkerSelected] = useState(true);

  return (
    <IsNewMarkerSelectedContext.Provider value={{ isNewMarkerSelected, setIsNewMarkerSelected }}>
      {children}
    </IsNewMarkerSelectedContext.Provider>
  );
};

export default IsNewMarkerSelectedContext;