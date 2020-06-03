import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const StripeButton = props => {
  const priceForStripe = props.price * 100;
  const publishableKey = "pk_test_Qs1zYdSoRY7UFoLWqbc3dcCK00NvIhtic9";

  const onToken = token => {
    axios({
      url: "payment",
      method: "post",

      data: {
        amount: priceForStripe,
        token: token
      }
    })
      .then(response => {
        alert("succesful payment");
      })
      .catch(error => {
        console.log("Payment Error: ", JSON.parse(error));
        alert(
          "There was an issue with your payment! Please make sure you use the provided credit card."
        );
      });
  };

  return (
    <StripeCheckout
      label="Pay by Credit Card"
      name="Crwn Clothing Ltd."
      shippingAddress
      billingAddress
      image="https://sendeyo.com/up/d/f3eb2117da"
      description={`Your total price is $${props.price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeButton;
