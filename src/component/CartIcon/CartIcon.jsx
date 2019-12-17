import React from "react";
import { ReactComponent as SoppingBagIcon } from "../../asset/shopping-bag.svg";
import { connect } from "react-redux";
import { toggleCartHidden } from "../../redux/cart/cartAction";
import { selectCartItemsCount } from "../../redux/cart/cartSelector";
import "./cartIcon.styles.scss";

const CartIcon = (props) => {



    return (
        <div className="cart-icon" onClick={props.toggleCartHidden}>
            <SoppingBagIcon className="shopping-icon" />
            <span className="item-count">{props.itemsCount}</span>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
})

const mapStateToProps = state => ({
    itemsCount: selectCartItemsCount(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);