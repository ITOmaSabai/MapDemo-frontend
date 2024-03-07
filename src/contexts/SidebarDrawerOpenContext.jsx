import React, { createContext, useState } from 'react';

const SidebarDrawerOpenContext = createContext();

export const SidebarDrawerOpenProvider = ({ children }) => {
  const [sidebarDrawerOpen, setSidebarDrawerOpen] = useState(false);

  return (
    <SidebarDrawerOpenContext.Provider value={{ sidebarDrawerOpen, setSidebarDrawerOpen }}>
      {children}
    </SidebarDrawerOpenContext.Provider>
  );
};

export default SidebarDrawerOpenContext;