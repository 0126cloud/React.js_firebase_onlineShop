import React from "react";
import StripeCheckout from "react-stripe-checkout";


const StripeButton = props => {

    const priceForStripe = props.price * 100;
    const publishableKey = "pk_test_Qs1zYdSoRY7UFoLWqbc3dcCK00NvIhtic9";

    const onToken = token => {
        console.log(token);
        alert("Successfully checkout!")
    }

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
    )
}

export default StripeButton;