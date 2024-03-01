import React, { createContext, useState } from 'react';

const SelectedVideosContext = createContext();

export const SelectedVideosProvider = ({ children }) => {
  const [selectedVideos, setSelectedVideos] = useState([]);

  return (
    <SelectedVideosContext.Provider value={{ selectedVideos, setSelectedVideos }}>
      {children}
    </SelectedVideosContext.Provider>
  );
};

export default SelectedVideosContext;