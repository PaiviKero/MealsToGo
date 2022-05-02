import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AppNavigator } from "./app.navigator";
import { AccountNavigator } from "./account.navigator";

import { AuthenticationContext } from "../../services/authentication/authentication.context";

export const Navigation = () => {
  const { isAuthenticted } = useContext(AuthenticationContext);
  return (
    <NavigationContainer>
      {isAuthenticted ? <AppNavigator /> : <AccountNavigator />}
    </NavigationContainer>
  );
};
