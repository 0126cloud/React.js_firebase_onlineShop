import React from "react";
import FormInput from "../../FormInput/FormInput";
import "./checkoutDataPage.styles.scss";
import CustomButton from "../../CustomButton/CustomButton";
import { checkValidity, updateObject } from "../../utility/utility"


class CheckoutDataPage extends React.Component {
    constructor(){
        super();
        this.state = {
            checkoutData: {
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: "宅配", displayValue: "宅配"},
                            {value: "7-11取貨", displayValue: "7-11取貨"}
                        ]
                    },
                    value: '宅配',
                    validation: {},
                    valid: true
                },
                billingMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: "線上付款", displayValue: "線上付款"},
                            {value: "ATM付款", displayValue: "ATM付款"},
                            {value: "貨到付款", displayValue: "貨到付款"}
                        ]
                    },
                    value: "線上付款",
                    validation: {},
                    valid: true
                },
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: '收件人'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                phone: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: '手機號碼'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 10,
                        maxLength: 10,
                        isNumeric: true
                    },
                    valid: false,
                    touched: false
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'E-mail'
                    },
                    value: '',
                    validation: {
                        required: true,
                        isEmail: true
                    },
                    valid: false,
                    touched: false
                },
                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: '郵遞區號'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 3,
                        maxLength: 3,
                        isNumeric: true
                    },
                    valid: false,
                    touched: false
                },
                district: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: '收件地址'
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

    handleSubmit = event => {
        event.preventDefault();
        const customCheckoutData = {};
        for (let dataElement in this.state.checkoutData) {
            customCheckoutData[dataElement] = this.state.checkoutData[dataElement].value;
        }
        const customOrderData = {
            orderdata: customCheckoutData
        }
    }

    handleChange = (event, dataElement) => {
        const updatedCheckoutDataElement = updateObject(this.state.checkoutData[dataElement], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.checkoutData[dataElement].validation),
            touched: true
        });
        const updatedCheckoutData = updateObject(this.state.checkoutData, {
            [dataElement]: updatedCheckoutDataElement
        });
        
        let formIsValid = true;
        for (let dataElement in updatedCheckoutData) {
            formIsValid = updatedCheckoutData[dataElement].valid && formIsValid;
        }
        this.setState({checkoutData: updatedCheckoutData, formIsValid: formIsValid});
    };      

    render(){
        const checkoutDataArray = [];
        for (let key in this.state.checkoutData) {
            checkoutDataArray.push({
                id: key,
                config: this.state.checkoutData[key]
            });
        }
    return(
        <div className="checkout-data">
        <form onSubmit={this.handleSubmit}>
         {checkoutDataArray.map(dataElement => (
          <FormInput
              className="checkout-data-input"
              key={dataElement.id}
              elementType={dataElement.config.elementType}
              elementConfig={dataElement.config.elementConfig}
              value={dataElement.config.value}
              invalid={!dataElement.config.valid}
              shouldValidate={dataElement.config.validation}
              touched={dataElement.config.touched}
              handleChange={(event) => this.handleChange(event, dataElement.id)} />
         ))}
         <div className="btn-right">
            <CustomButton type="submit" value="comfirm" />
            </div>
        </form>
        </div>
    )}
}

export default CheckoutDataPage;


