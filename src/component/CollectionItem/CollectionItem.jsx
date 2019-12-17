import React from "react";
import CustomButton from "../CustomButton/CustomButton";
import { connect } from "react-redux";
import { addItem } from "../../redux/cart/cartAction";
import "./collectionItem.styles.scss";

const CollectionItem = props => {
  return (
    <div className="collection-item">
      <div
        className="image"
        style={{ backgroundImage: `url(${props.imageUrl})` }}
      />
      <div className="collection-footer">
        <span className="name">{props.name}</span>
        <span className="price">{props.price}</span>
      </div>
      <CustomButton className="custom-button" type="submit" value="ADD TO CART" onClick={() => props.addItem(props.item)} inverted />
    </div>
  );
};


const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item))
})

export default connect(null, mapDispatchToProps)(CollectionItem);