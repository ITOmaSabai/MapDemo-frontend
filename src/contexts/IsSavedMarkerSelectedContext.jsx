import React, { createContext, useState } from 'react';

const IsSavedMarkerSelectedContext = createContext();

export const IsSavedMarkerSelectedProvider = ({ children }) => {
  const [isSavedMarkerSelecteds, setIsSavedMarkerSelecteds] = useState(false);

  return (
    <IsSavedMarkerSelectedContext.Provider value={{ isSavedMarkerSelecteds, setIsSavedMarkerSelecteds }}>
      {children}
    </IsSavedMarkerSelectedContext.Provider>
  );
};

export default IsSavedMarkerSelectedContext;