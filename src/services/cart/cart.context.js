import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthenticationContext } from "../../services/authentication/authentication.context";
export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const [cart, setCart] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [sum, setSum] = useState(0);

  const add = (item, fromRestaurant) => {
    if (!restaurant || restaurant.placeId !== fromRestaurant.placeId) {
      setRestaurant(fromRestaurant);
      setCart([item]);
    } else {
      setCart([...cart, item]);
    }
  };

  const clear = () => {
    setCart([]);
    setRestaurant(null);
  };

  useEffect(() => {
    if (!cart.length) {
      setSum(0);
    } else {
      setSum(
        cart.reduce((acc, { price }) => {
          return acc + price;
        }, 0)
      );
    }
  }, [cart]);

  const saveCart = async (rst, crt, uid) => {
    try {
      const cartKey = "@cart-" + uid;
      const jsonValue = JSON.stringify({ restaurant: rst, cart: crt });
      await AsyncStorage.setItem(cartKey, jsonValue);
    } catch (e) {
      console.log("error storing", e);
    }
  };

  const loadCart = async (uid) => {
    try {
      const cartKey = "@cart-" + uid;
      const value = await AsyncStorage.getItem(cartKey);
      if (value !== null) {
        const { restaurant: rst, cart: crt } = JSON.parse(value);
        if (rst != null && crt != null) {
          setRestaurant(rst);
          setCart(crt);
        }
      }
    } catch (e) {
      console.log("error loading", e);
    }
  };

  useEffect(() => {
    if (user && user.uid) {
      loadCart(user.uid);
    }
  }, [user]);

  useEffect(() => {
    if (user && user.uid) {
      saveCart(restaurant, cart, user.uid);
    }
  }, [restaurant, cart, user]);

  return (
    <CartContext.Provider
      value={{
        cart,
        restaurant,
        sum,
        addToCart: add,
        clearCart: clear,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
