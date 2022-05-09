import camelize from "camelize";

export const locationRequest = (searchTerm) => {
  return fetch(
    `http://10.0.2.2:5001/mealstogo-8e200/us-central1/geocode?city=${searchTerm}`
  )
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log("error fetching city data " + err);
    });
};

export const locationTransform = (result) => {
  const formattedResponse = camelize(result);
  const { geometry = {} } = formattedResponse.results[0];
  const { lat, lng } = geometry.location;

  return { lat, lng, viewPort: geometry.viewport };
};
