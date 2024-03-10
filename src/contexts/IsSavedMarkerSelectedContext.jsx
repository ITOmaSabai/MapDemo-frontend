import React, { createContext, useState } from 'react';

const IsSavedMarkerSelectedContext = createContext();

export const IsSavedMarkerSelectedProvider = ({ children }) => {
  const [isSavedMarkerSelected, setIsSavedMarkerSelected] = useState(false);

  return (
    <IsSavedMarkerSelectedContext.Provider value={{ isSavedMarkerSelected, setIsSavedMarkerSelected }}>
      {children}
    </IsSavedMarkerSelectedContext.Provider>
  );
};

export default IsSavedMarkerSelectedContext;