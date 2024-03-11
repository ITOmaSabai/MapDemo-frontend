import React, { createContext, useState } from 'react';

const SpotContext = createContext();

// マップをクリックした際に座標lat, lngを格納する
export const SpotProvider = ({ children }) => {
  const [markers, setMarkers] = useState();

  return (
    <SpotContext.Provider value={{ markers, setMarkers }}>
      {children}
    </SpotContext.Provider>
  );
};

export default SpotContext;