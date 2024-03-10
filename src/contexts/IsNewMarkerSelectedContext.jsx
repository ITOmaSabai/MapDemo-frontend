import React, { createContext, useState } from 'react';

const IsNewMarkerSelectedContext = createContext();

export const IsNewMarkerSelectedProvider = ({ children }) => {
  const [isNewMarkerSelecteds, setIsNewMarkerSelecteds] = useState(true);

  return (
    <IsNewMarkerSelectedContext.Provider value={{ isNewMarkerSelecteds, setIsNewMarkerSelecteds }}>
      {children}
    </IsNewMarkerSelectedContext.Provider>
  );
};

export default IsNewMarkerSelectedContext;