import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

const CheckoutStack = createStackNavigator();

import { CheckoutScreen } from "../../features/checkout/screens/checkout.screen";
import { CheckoutErrorScreen } from "../../features/checkout/screens/checkout-error.screen";
import { CheckoutSuccessScreen } from "../../features/checkout/screens/checkout-success.screen";

export const CheckoutNavigator = () => (
  <CheckoutStack.Navigator>
    <CheckoutStack.Screen
      name="CheckoutMain"
      options={{ headerShown: false }}
      component={CheckoutScreen}
    />
    <CheckoutStack.Screen
      name="CheckoutSuccess"
      options={{ headerShown: false }}
      component={CheckoutSuccessScreen}
    />
    <CheckoutStack.Screen
      name="CheckoutError"
      options={{ headerShown: false }}
      component={CheckoutErrorScreen}
    />
  </CheckoutStack.Navigator>
);
