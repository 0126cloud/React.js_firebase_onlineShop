import { connect } from "react-redux";
import { compose } from "redux";
import { selectCollectionsIsLoaded } from "../../../redux/shop/shopSelector";
import WithSpinner from "../../WithSpinner/WithSpinner";
import CollectionPage from "./CollectionPage";

const mapStateToProps = state => ({
    isLoading: !selectCollectionsIsLoaded(state)
})

const CollectionPageContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionPage)

export default CollectionPageContainer;
