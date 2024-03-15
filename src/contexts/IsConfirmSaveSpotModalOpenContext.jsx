import React, { createContext, useState } from 'react';

const IsConfirmSaveSpotModalOpenContextContext = createContext();

export const IsConfirmSaveSpotModalOpenContextProvider = ({ children }) => {
  const [isConfirmSaveSpotModalOpenContext, setIsConfirmSaveSpotModalOpenContext] = useState(false);

  return (
    <IsConfirmSaveSpotModalOpenContextContext.Provider value={{ isConfirmSaveSpotModalOpenContext, setIsConfirmSaveSpotModalOpenContext }}>
      {children}
    </IsConfirmSaveSpotModalOpenContextContext.Provider>
  );
};

export default IsConfirmSaveSpotModalOpenContextContext;