import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ReactComponent as Logo } from "../../asset/crown.svg";
import CartIcon from "../CartIcon/CartIcon"; 
import CartDropdown from "../CartDropdown/CartDropdown";
import { selectCartHidden } from "../../redux/cart/cartSelector";
import { selectCurrentUser } from "../../redux/user/userSelector";
import { signoutStart } from "../../redux/user/userAction";

import "./header.styles.scss";

const Header = props => {
  return (
    <div className="header">
      <Link to="/" className="logo-container">
        <Logo />
      </Link>
      <div className="options">
        <Link to="/shop" className="option">
          SHOP
        </Link>
        {props.currentUser ? (
          <Link to="/order" className="option">
            ORDER
          </Link>
        ) : ""}
        {props.currentUser ? (
          <div className="option" onClick={props.signoutStart}>
            SIGN OUT
          </div>
        ) : (
          <Link to="/signin" className="option">
            SIGN IN
          </Link>
        )}
        <CartIcon />
      </div>
      {props.hidden ? null : <CartDropdown />}
    </div>
  );
};

const mapStateToProps = state => ({
  currentUser: selectCurrentUser(state),
  hidden: selectCartHidden(state)
});

const mapDispatchToProps = dispatch => ({
  signoutStart: () => dispatch(signoutStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);
