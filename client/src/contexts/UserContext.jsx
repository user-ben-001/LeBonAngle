import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [refreshToken, setRefreshToken] = useState();
  const [userId, setUserId] = useState();
  return (
    <UserContext.Provider
      value={{ refreshToken, userId, setRefreshToken, setUserId }}
    >
      {children}
    </UserContext.Provider>
  );
};
