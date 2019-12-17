import React from "react";
import { connect } from "react-redux";
import { clearItem, addItem, removeItem } from "../../redux/cart/cartAction";
import "./checkoutItem.styles.scss";

const CheckoutItem = props => {
  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={props.item.imageUrl} alt={props.item.name} />
      </div>
      <span className="name">{props.item.name}</span>
      <span className="quantity">
        <div className="arrow" onClick={() => props.removeItem(props.item)}>&#10094;</div>
        <span className="value">{props.item.quantity}</span>
        <div className="arrow" onClick={() => props.addItem(props.item)}>&#10095;</div>
      </span>
      <span className="price">${props.item.price}</span>
      <div
        className="remove-button"
        onClick={() => props.clearItem(props.item)}
      >
        &#10005;
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  clearItem: item => dispatch(clearItem(item)),
  addItem: item => dispatch(addItem(item)),
  removeItem: item => dispatch(removeItem(item))
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
