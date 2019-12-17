import React from "react";
import CollectionItem from "../../CollectionItem/CollectionItem";
import { connect } from "react-redux";
import { selectEachCollection } from "../../../redux/shop/shopSelector";
import "./collectionPage.styles.scss";

const CollectionPage = props => {
  console.log(props.eachCollection);

  return (
    <div className="collection-page">
      <div className="title">{props.eachCollection.title}</div>
      <div className="items">
        {props.eachCollection.items.map(item => (
          <CollectionItem
            key={item.id}
            imageUrl={item.imageUrl}
            name={item.name}
            price={item.price}
            item={item}
          />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  eachCollection: selectEachCollection(ownProps.match.params.collectionName)(
    state
  )
});

export default connect(mapStateToProps)(CollectionPage);
