import React, { createContext, useState } from 'react';

const SpotContext = createContext();

export const SpotProvider = ({ children }) => {
  const [markers, setMarkers] = useState();

  return (
    <SpotContext.Provider value={{ markers, setMarkers }}>
      {children}
    </SpotContext.Provider>
  );
};

export default SpotContext;