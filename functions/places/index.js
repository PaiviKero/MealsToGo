const { places: placesMock, addMockImage } = require("./mock");
const url = require("url");

module.exports.placesRequest = (request, response) => {
  const { location } = url.parse(request.url, true).query;
  const restaurantsMock = placesMock[location];
  if (restaurantsMock) {
    restaurantsMock.results = restaurantsMock.results.map(addMockImage);
  }

  response.json(restaurantsMock);
};
