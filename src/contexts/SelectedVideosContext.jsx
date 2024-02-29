import React, { createContext, useState } from 'react';

const SelectedVideosContext = createContext();

export const SelectedVideosProvider = ({ children }) => {
  const [SelectedVideoss, setSelectedVideoss] = useState([]);

  return (
    <SelectedVideosContext.Provider value={{ SelectedVideoss, setSelectedVideoss }}>
      {children}
    </SelectedVideosContext.Provider>
  );
};

export default SelectedVideosContext;