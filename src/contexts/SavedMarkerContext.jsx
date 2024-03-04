import React, { createContext, useState } from 'react';

const SavedMarkerContext = createContext();

export const SavedMarkerProvider = ({ children }) => {
  const [savedMarkers, setSavedMarkers] = useState([]);

  return (
    <SavedMarkerContext.Provider value={{ savedMarkers, setSavedMarkers }}>
      {children}
    </SavedMarkerContext.Provider>
  );
};

export default SavedMarkerContext;