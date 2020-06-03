import React from "react";
import { connect } from "react-redux";
import { googleSigninStart, emailSigninStart } from "../../redux/user/userAction";
import FormInput from "../FormInput/FormInput";
import CustomButton from "../CustomButton/CustomButton";
import "./signIn.styles.scss";
import { updateObject, checkValidity } from "../utility/utility"

class SignIn extends React.Component {
  constructor() {
    super();

    this.state = {
      signinData: {
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'E-Mail'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
          elementType: 'input',
          elementConfig: {
              type: 'password',
              placeholder: 'Password'
          },
          value: '',
          validation: {
              required: true
          },
          valid: false,
          touched: false
      }
    },
    formIsValid: false
  }
  }

  handleSubmit = async event => {
    event.preventDefault();

    const {signinData} = this.state;
    const {email, password} = signinData;
    this.props.emailSigninStart(email.value, password.value);

  };

  handleChange = (event, dataElement) => {
    const updatedSigninDataElement = updateObject(this.state.signinData[dataElement], {
      value: event.target.value,
      valid: checkValidity(event.target.value, this.state.signinData[dataElement].validation),
      touched: true
  });
  const updatedSigninData = updateObject(this.state.signinData, {
      [dataElement]: updatedSigninDataElement
  });
  
  let formIsValid = true;
  for (let dataElement in updatedSigninData) {
      formIsValid = updatedSigninData[dataElement].valid && formIsValid;
  }
  this.setState({signinData: updatedSigninData, formIsValid: formIsValid});
  };

  render() {

    const signinDataArray = [];
        for (let key in this.state.signinData) {
            signinDataArray.push({
                id: key,
                config: this.state.signinData[key]
            });
        }

    return (
      <div className="sign-in">
        <h2 className="title">I already have a account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={this.handleSubmit}>
         {signinDataArray.map(dataElement => (
          <FormInput 
              key={dataElement.id}
              elementType={dataElement.config.elementType}
              elementConfig={dataElement.config.elementConfig}
              value={dataElement.config.value}
              invalid={!dataElement.config.valid}
              shouldValidate={dataElement.config.validation}
              touched={dataElement.config.touched}
              handleChange={(event) => this.handleChange(event, dataElement.id)} />
         ))}
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
