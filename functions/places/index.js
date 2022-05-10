const functions = require("firebase-functions");
const { places: placesMock, addMockImage } = require("./mock");
const url = require("url");

const addGoogleImage = (restaurant) => {
  const ref = restaurant.photos[0].photo_reference;

  const isDevelopment =
    process.env.FIREBASE_DEBUG_MODE === "true" &&
    (process.env.LOGONSERVER.indexOf("MUSTI") > -1 ||
      JSON.stringify(process.env).indexOf("Windows") > -1);

  if (!ref || isDevelopment) {
    restaurant.photos = [
      "https://s.tmimgcdn.com/scr/800x500/212900/spoon-and-fork-restaurant-logo_212966-original.png",
    ];
    return restaurant;
  }
  restaurant.photos = [
    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=${
      functions.config().google.key
    }`,
  ];
  return restaurant;
};

module.exports.placesRequest = (request, response, client) => {
  const { location, mock } = url.parse(request.url, true).query;
  if (mock === "true") {
    const restaurantsMock = placesMock[location];
    if (restaurantsMock) {
      restaurantsMock.results = restaurantsMock.results.map(addMockImage);
    }

    return response.json(restaurantsMock);
  }

  client
    .placesNearby({
      params: {
        location: location,
        radius: 1500,
        type: "restaurant",
        key: functions.config().google.key,
      },
      timeout: 1000,
    })
    .then((res) => {
      res.data.results = res.data.results.map(addGoogleImage);
      return response.json(res.data);
    })
    .catch((e) => {
      response.status(400);
      return response.send(e.response.data.error_message);
    });
};
