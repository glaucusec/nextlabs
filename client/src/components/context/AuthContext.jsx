import React, { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";

export const AuthContext = createContext({});

export default function AuthContextProvider(props) {
  const [name, setName] = useState("");
  const [cookies, setCookies, removeCookies] = useCookies();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const context = cookies.context;

    if (context && context.isLoggedIn) {
      setName(context.name);
      setIsLoggedIn(true);
      setIsAdmin(context.isAdmin);
    }
  }, []);

  function setIsLoggedInHandler(name, isLogged, isAdmin) {
    setName(name);
    setIsLoggedIn(isLogged);
    setIsAdmin(isAdmin);
  }

  function setIsLoggedOutHandler() {
    setName("");
    setIsLoggedIn(false);
    setIsAdmin(false);
  }

  const authContext = {
    name: name,
    isLoggedIn: isLoggedIn,
    isAdmin: isAdmin,
    setIsLoggedInHandler: setIsLoggedInHandler,
    setIsLoggedOutHandler: setIsLoggedOutHandler,
  };
  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
}
