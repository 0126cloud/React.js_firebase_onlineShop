import React from "react";
import { connect } from "react-redux";
import { googleSigninStart, emailSigninStart } from "../../redux/user/userAction";
import FormInput from "../FormInput/FormInput";
import CustomButton from "../CustomButton/CustomButton";
import "./signIn.styles.scss";

class SignIn extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: ""
    };
  }

  handleSubmit = async event => {
    event.preventDefault();

    const {email, password} = this.state;
    this.props.emailSigninStart(email, password);

  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div className="sign-in">
        <h2 className="title">I already have a account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={this.state.email}
            handleChange={this.handleChange}
            label="Email"
            required
          />
          <FormInput
            type="password"
            name="password"
            value={this.state.password}
            handleChange={this.handleChange}
            label="Password"
            required
          />
          <div className="buttons">
            <CustomButton type="submit" value="SIGN IN" />
            <CustomButton
              type="button"
              onClick={this.props.googleSigninStart}
              value="SIGN IN WITH GOOGLE"
              isGoogleSignIn
            />
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  googleSigninStart: () => dispatch(googleSigninStart()),
  emailSigninStart: (email, password) => dispatch(emailSigninStart({email, password}))
}) 

export default connect(null, mapDispatchToProps)(SignIn);
