import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import CustomButton from "../CustomButton/CustomButton";
import { toggleCartHidden } from "../../redux/cart/cartAction";
import { selectCartItems } from "../../redux/cart/cartSelector";
import CartItem from "../CartItem/CartItem";
import "./cartDropdown.styles.scss";

const CartDropdown = props => {
  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {props.cartItems.length ? (
          props.cartItems.map(cartItem => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <span className="empty-content">Your cart is empty</span>
        )}
      </div>
      <CustomButton value="GO TO CHECKOUT" onClick={() => {
          props.history.push("/checkout");
          props.dispatch(toggleCartHidden());
    }} />
    </div>
  );
};

const mapStateToProps = state => ({
  cartItems: selectCartItems(state)
});

export default withRouter(connect(mapStateToProps)(CartDropdown));
