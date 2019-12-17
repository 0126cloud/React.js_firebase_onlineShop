import React from "react";
import "./cartItem.styles.scss";

const CartItem = props => {

    return (
        <div className="cart-item">
            <img src={props.item.imageUrl} alt={props.item.name} />
            <div className="item-details">
                <span className="name">{props.item.name}</span>
                <span>{props.item.quantity} x ${props.item.price}</span>
            </div>
        </div>
    )
}

export default CartItem;