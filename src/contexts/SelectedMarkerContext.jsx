import React, { createContext, useState } from 'react';

const SelectedMarkerContext = createContext();

export const SelectedMarkerProvider = ({ children }) => {
  const [selectedMarkers, setSelectedMarkers] = useState(null);

  return (
    <SelectedMarkerContext.Provider value={{ selectedMarkers, setSelectedMarkers }}>
      {children}
    </SelectedMarkerContext.Provider>
  );
};

export default SelectedMarkerContext;