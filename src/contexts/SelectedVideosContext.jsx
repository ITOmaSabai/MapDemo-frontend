import React, { createContext, useState } from 'react';

const SelectedVideosContext = createContext();

export const SelectedVideosProvider = ({ children }) => {
  const [SelectedVideoss, setSelectedVideos] = useState([]);

  return (
    <SelectedVideosContext.Provider value={{ SelectedVideoss, setSelectedVideos }}>
      {children}
    </SelectedVideosContext.Provider>
  );
};

export default SelectedVideosContext;