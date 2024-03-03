import React, { createContext, useContext, useState } from 'react';

const SavedMarkerContext = createContext();

export const SavedMarkerProvider = ({ children }) => {
  const [savedMarker, setSavedMarker] = useState([]);

  return (
    <SavedMarkerContext.Provider value={{ savedMarker, setSavedMarker }}>
      {children}
    </SavedMarkerContext.Provider>
  );
};

export const useDataPosted = () => useContext(SavedMarkerContext);