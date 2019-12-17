import React from "react";
import CollectionItem from "../CollectionItem/CollectionItem";

import "./collectionPreview.styles.scss";

const CollectionPreview = props => {
  return (
    <div className="collection-preview">
      <div className="title">{props.title}</div>
      <div className="preview">
        {props.items
          .filter((item, index) => index < 4)
          .map(item => (
            <CollectionItem
              key={item.id}
              name={item.name}
              price={item.price}
              imageUrl={item.imageUrl}
              item={item}
            />
          ))}
      </div>
    </div>
  );
};

export default CollectionPreview;
