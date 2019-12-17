import { connect } from "react-redux";
import { compose } from "redux";
import { selectCollectionsIsFetching } from "../../redux/shop/shopSelector";
import WithSpinner from "../WithSpinner/WithSpinner";
import CollectionOverview from "./CollectionOverview";

const mapStateToProps = state => ({
    isLoading: selectCollectionsIsFetching(state)
})

const CollectionOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionOverview)

export default CollectionOverviewContainer;