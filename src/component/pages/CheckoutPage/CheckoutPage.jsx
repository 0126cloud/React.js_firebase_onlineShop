import React from "react";
import { connect } from "react-redux";
import { selectCartItems, selectCartTotalPrice } from "../../../redux/cart/cartSelector";
import CheckoutItem from "../../CheckoutItem/CheckoutItem";
import StripeButton from "../../StripeButton/StripeButton";

import "./checkout.styles.scss";

const CheckoutPage = props => {

    return (
        <div className="checkout-page">
            <div className="checkout-header">
                <div className="header-block">
                    <span>Product</span>
                </div>
                <div className="header-block">
                    <span>Discription</span>
                </div>
                <div className="header-block">
                    <span>Quantity</span>
                </div>
                <div className="header-block">
                    <span>Price</span>
                </div>
                <div className="header-block">
                    <span>Remove</span>
                </div>
            </div>
                {props.cartItems.map(cartItem => <CheckoutItem 
                className="checkout-item"
                key={cartItem.id}
                item={cartItem}
                />)}
            <div className="total">
                <span>TOTAL: ${props.totalPrice}</span>
            </div>
            <div className="test-warning">
                *Please use the following test credit card for payments.*
                <br/>
                 4242 4242 4242 4242 - Exp: 01/20 - CVC: 123    
            </div>
            <StripeButton price={props.totalPrice} />
        </div>
    )
}

const mapStateToProps = state => ({
    cartItems: selectCartItems(state),
    totalPrice: selectCartTotalPrice(state)
})

export default connect(mapStateToProps)(CheckoutPage);