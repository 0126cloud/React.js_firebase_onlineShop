import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { selectCurrentUser } from "./redux/user/userSelector";
import { checkUserSession } from "./redux/user/userAction"
import Homepage from "./component/pages/Homepage/Homepage";
import ShopPage from "./component/pages/ShopPage/ShopPage";
import SignInAndSignUpPage from "./component/pages/SignInAndSignUpPage/SignInAndSignUpPage";
import Header from "./component/Header/Header";
import CheckoutPage from "./component/pages/CheckoutPage/CheckoutPage";
import "./app.css";

class App extends React.Component {

  unsubscribe = null

  componentDidMount(){
    this.props.checkUserSession();
  }

  componentWillUnmount(){
    this.unsubscribe();
  }  

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/signin" render={() => this.props.currentUser ? (<Redirect to="/" />) : (<SignInAndSignUpPage />)} />
          <Route path="/checkout" component={CheckoutPage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: selectCurrentUser(state),
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
