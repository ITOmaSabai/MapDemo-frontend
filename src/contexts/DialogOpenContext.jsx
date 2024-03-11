import React, { createContext, useState } from 'react';

const DialogOpenContext = createContext();

export const DialogOpenProvider = ({ children }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <DialogOpenContext.Provider value={{ isDialogOpen, setIsDialogOpen }}>
      {children}
    </DialogOpenContext.Provider>
  );
};

export default DialogOpenContext;