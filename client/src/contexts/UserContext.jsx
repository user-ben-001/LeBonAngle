import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [refreshToken, setRefreshToken] = useState();
  return (
    <UserContext.Provider value={{ refreshToken, setRefreshToken }}>
      {children}
    </UserContext.Provider>
  );
};
