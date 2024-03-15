import React, { createContext, useState } from 'react';

const IsConfirmSaveSpotModalOpenContext = createContext();

export const IsConfirmSaveSpotModalOpenProvider = ({ children }) => {
  const [isConfirmSaveSpotModalOpen, setIsConfirmSaveSpotModalOpen] = useState(false);

  return (
    <IsConfirmSaveSpotModalOpenContext.Provider value={{ isConfirmSaveSpotModalOpen, setIsConfirmSaveSpotModalOpen }}>
      {children}
    </IsConfirmSaveSpotModalOpenContext.Provider>
  );
};

export default IsConfirmSaveSpotModalOpenContext;