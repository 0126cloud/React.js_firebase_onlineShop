import React from "react";
import { connect } from "react-redux";
import { selectCollectionsReturnArray } from "../../redux/shop/shopSelector";
import CollectionPreview from "../CollectionPreview/CollectionPreview";
import "./collectionOverview.styles.scss";

const CollectionOverview = props => {

    return (
      <div className="collection-overview">
        {props.collections.map(collection => (
          <CollectionPreview
            key={collection.id}
            title={collection.title}
            items={collection.items}
          />
        ))}
      </div>
    );
  }

  const mapStateToProps = state => ({
    collections: selectCollectionsReturnArray(state)
  })

export default connect(mapStateToProps)(CollectionOverview);
