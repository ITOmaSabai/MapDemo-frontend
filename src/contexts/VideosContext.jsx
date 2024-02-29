import React, { createContext, useState } from 'react';

const VideosContext = createContext();

export const VideosProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);

  return (
    <VideosContext.Provider value={{ videos, setVideos }}>
      {children}
    </VideosContext.Provider>
  );
};

export default VideosContext;