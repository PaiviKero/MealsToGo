import { Platform } from "react-native";

const isAndroid = Platform.OS === "android";

const liveHost = "https://us-central1-mealstogo-8e200.cloudfunctions.net";
const localHost = isAndroid
  ? "http://10.0.2.2:5001/mealstogo-8e200/us-central1"
  : "http://localhost:5001/mealstogo-8e200/us-central1";

console.log("isAndroid: " + isAndroid);
console.log("localhost: " + localHost);

export const isDevelopment = process.env.NODE_ENV === "development";
export const isMock = isDevelopment ? true : false;
export const host = isDevelopment ? localHost : liveHost;
