import React, { createContext, useState } from 'react';

const IsTopInfoVisibleContext = createContext();

export const IsTopInfoVisibleProvider = ({ children }) => {
  const [isTopInfoVisible, setIsTopInfoVisible] = useState(true);

  return (
    <IsTopInfoVisibleContext.Provider value={{ isTopInfoVisible, setIsTopInfoVisible }}>
      {children}
    </IsTopInfoVisibleContext.Provider>
  );
};

export default IsTopInfoVisibleContext;