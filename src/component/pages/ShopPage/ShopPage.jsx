import React from "react";
import CollectionOverviewContainer from "../../CollectionOverview/CollectionOverviewContainer";
import CollectionPageContainer from "../CollectionPage/CollectionPageContainer";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchingCollectionsStart } from "../../../redux/shop/shopAction";


class ShopPage extends React.Component {

  componentDidMount(){
    this.props.fetchingCollectionsStart();    
  }

  render() {
    return (
      <div>
        <Route
          exact
          path={`${this.props.match.path}`}
          component={CollectionOverviewContainer} 
          />
        <Route
          path={`${this.props.match.path}/:collectionName`}
          component={CollectionPageContainer}
        />
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  fetchingCollectionsStart : () => dispatch(fetchingCollectionsStart())
})

export default connect(null, mapDispatchToProps)(ShopPage);
