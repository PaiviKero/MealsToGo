import camelize from "camelize";
import { host } from "../utils/env";

export const restaurantRequest = (location = "37.7749295,-122.4194155") => {
  return fetch(`${host}/placesNearby?location=${location}`)
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log("error fetching restaurant data " + err);
    });
};
export const restaurantTransform = ({ results = [] }) => {
  const mappedResults = results.map((restaurant) => {
    return {
      ...restaurant,
      isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
      isClosedTemporarily: restaurant.business_status === "CLOSED_TEMPORARILY",
      address: restaurant.vicinity,
      key: restaurant.place_id,
    };
  });
  //console.log(camelize(mappedResults));
  return camelize(mappedResults);
};
