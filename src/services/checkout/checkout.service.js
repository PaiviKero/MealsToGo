import createStripe from "stripe-client";
import { host } from "../../utils/env";

const stripe = createStripe(
  "pk_test_51KyCWPIWqW9LuHNMUB0MAAunWy2c7OdItZQH2CojSsnSkAXNw5X50M3ngQYhAvI7WonZnWgUodOD2pp0RGhx7yBi00eMjiFjsc"
);

export const cardTokenRequest = (card) => stripe.createToken(card);

export const payRequest = (token, amount, name) => {
  return fetch(`${host}/pay`, {
    body: JSON.stringify({
      token,
      name,
      amount,
    }),
    method: "POST",
  }).then((res) => {
    if (res.status > 200) {
      return Promise.reject("something went wrong processing your payment");
    }
    return res.JSON;
  });
};
