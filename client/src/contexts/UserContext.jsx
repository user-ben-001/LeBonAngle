import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

import { setAccessToken } from "../interceptors/Auth.interceptor.js";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState();

  const login = async (email, password) => {
    if (email && password != "") {
      const user = {
        email: email,
        password: password,
      };
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      //   console.log(response);

      if (!response.ok) {
        alert(response.status);
      }

      const data = await response.json();

      await setAccessToken(data.accessToken);

      const decoded = jwtDecode(data.accessToken);

      const addUser = {
        id: decoded.id,
        email: decoded.username,
      };
      setUserInfo(addUser);
    }
  };

  const register = async (name, email, password) => {
    if (name && email && password != "") {
      const newUser = {
        username: name,
        email: email,
        password: password,
      };
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
    }
  };

  const logout = async () => {
    const response = await fetch("http://localhost:3000/auth/logout", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    setAccessToken(null);
    setUserInfo(null);
  };
  return (
    <UserContext.Provider value={{ userInfo, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(UserContext);
};
