import React from "react";
import { Ionicons } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RestaurantsNavigator } from "./restaurants.navigator";
import { MapScreen } from "../../features/map/screens/map.screen";
import { SettingsNavigator } from "./settings.navigator";

import { RestaurantsContextProvider } from "../../services/restaurants/restaurants.context";
import { LocationContextProvider } from "../../services/location/location.context";
import { FavouritesContextProvider } from "../../services/favourites/favourites.context";

const TAB_ICON = {
  Restaurant: "ios-restaurant",
  Map: "ios-map",
  Settings: "ios-settings",
};

const Tab = createBottomTabNavigator();

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ focused, size, color }) => {
      const iconNameFocusChecked = focused ? iconName : iconName + "-outline";
      return <Ionicons name={iconNameFocusChecked} size={size} color={color} />;
    },
  };
};

export const AppNavigator = () => {
  return (
    <>
      <FavouritesContextProvider>
        <LocationContextProvider>
          <RestaurantsContextProvider>
            <Tab.Navigator
              screenOptions={createScreenOptions}
              // tabBarOptions={{
              //   tabBarActiveTintColor: "tomato",
              //   tabBarInactiveTintColor: "gray",
              // }}
            >
              <Tab.Screen
                name="Restaurant"
                options={{ headerShown: false }}
                component={RestaurantsNavigator}
              />
              <Tab.Screen
                name="Map"
                options={{ headerShown: false }}
                component={MapScreen}
              />
              <Tab.Screen
                name="Settings"
                options={{ headerShown: false }}
                component={SettingsNavigator}
              />
            </Tab.Navigator>
          </RestaurantsContextProvider>
        </LocationContextProvider>
      </FavouritesContextProvider>
    </>
  );
};
