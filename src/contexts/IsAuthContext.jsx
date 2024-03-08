import React, { createContext, useState } from 'react';

const IsAuthContext = createContext();

export const IsAuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);

  return (
    <IsAuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </IsAuthContext.Provider>
  );
};

export default IsAuthContext;