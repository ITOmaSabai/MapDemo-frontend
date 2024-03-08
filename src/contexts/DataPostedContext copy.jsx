import React, { createContext, useContext, useState } from 'react';

const DataPostedContext = createContext();

export const DataPostedProvider = ({ children }) => {
  const [isDataPosted, setIsDataPosted] = useState(false);

  return (
    <DataPostedContext.Provider value={{ isDataPosted, setIsDataPosted }}>
      {children}
    </DataPostedContext.Provider>
  );
};

export const useDataPosted = () => useContext(DataPostedContext);