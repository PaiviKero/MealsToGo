import camelize from "camelize";

export const restaurantRequest = (location = "37.7749295,-122.4194155") => {
  return fetch(
    `http://10.0.2.2:5001/mealstogo-8e200/us-central1/placesNearby?location=${location}`
  )
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
