import React from "react";
import { connect } from "react-redux";
import { signupStart } from "../../redux/user/userAction";
import FormInput from "../../component/FormInput/FormInput";
import CustomButton from "../../component/CustomButton/CustomButton";
import { updateObject,checkValidity } from "../utility/utility";
import "./signUp.styles.scss";

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      signupData: {
        displayName: {
          elementType: 'input',
          elementConfig: {
              type: 'text',
              placeholder: 'Display Name'
          },
          value: '',
          validation: {
              required: true,
          },
          valid: false,
          touched: false
      },
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
      },
      confirmPassword: {
        elementType: 'input',
        elementConfig: {
            type: 'password',
            placeholder: 'Confirm Password'
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

    const { signupData } = this.state;
    const displayName = signupData.displayName.value;
    const email = signupData.email.value;
    const password = signupData.password.value;
    const confirmPassword = signupData.confirmPassword.value;

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    this.props.signupStart({displayName, email, password});

  };

  handleChange = (event, dataElement) => {
    const updatedSignupDataElement = updateObject(this.state.signupData[dataElement], {
      value: event.target.value,
      valid: checkValidity(event.target.value, this.state.signupData[dataElement].validation),
      touched: true
  });
  const updatedSignupData = updateObject(this.state.signupData, {
      [dataElement]: updatedSignupDataElement
  });
  
  let formIsValid = true;
  for (let dataElement in updatedSignupData) {
      formIsValid = updatedSignupData[dataElement].valid && formIsValid;
  }
  this.setState({signupData: updatedSignupData, formIsValid: formIsValid});
  };

  render() {

    const signupDataArray = [];
    for (let key in this.state.signupData) {
        signupDataArray.push({
            id: key,
            config: this.state.signupData[key]
        });
    }

    return (
      <div className="sign-up">
        <h2 className="title">I do not have a account</h2>
        <span>Sign up with your email and password</span>
        <form onSubmit={this.handleSubmit}>
        {signupDataArray.map(dataElement => (
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
          <CustomButton type="submit" value="SIGN UP" />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signupStart: userData => dispatch(signupStart(userData)) 
})

export default connect(null,mapDispatchToProps)(SignUp);
