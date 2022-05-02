import React, { createContext, useState, useEffect } from "react";
import * as firebase from "firebase/compat";

import { loginRequest } from "./authentication.service";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const onLogin = (email, password) => {
    setIsLoading(true);
    loginRequest(email, password)
      .then((u) => {
        setUser(u);
        console.log("logins success: " + email + " --- " + password);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(email + " --- " + password);
        setError(e.toString());
      });
  };

  const onRegister = (email, password, repeatedPassword) => {
    setIsLoading(true);
    if (password !== repeatedPassword) {
      setError("Error: Passwords do not match");
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((u) => {
        setUser(u);
        console.log("register success: " + email + " --- " + password);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(email + " --- " + password);
        setError(e.toString());
      });
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
