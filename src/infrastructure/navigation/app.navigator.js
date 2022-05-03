import React from "react";
import { Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeArea } from "../../components/utility/safe-area.component";
import { RestaurantsNavigator } from "./restaurants.navigator";
import { MapScreen } from "../../features/map/screens/map.screen";

const TAB_ICON = {
  Restaurant: "ios-restaurant",
  Map: "ios-map",
  Settings: "ios-settings",
};

const SettingsScreen = () => (
  <SafeArea>
    <Text>Settings!</Text>
  </SafeArea>
);

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
      <Tab.Navigator
        screenOptions={createScreenOptions}
        // tabBarOptions={{
        //   tabBarActiveTintColor: "tomato",
        //   tabBarInactiveTintColor: "gray",
        // }}
      >
        <Tab.Screen name="Restaurant" component={RestaurantsNavigator} />
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </>
  );
};
