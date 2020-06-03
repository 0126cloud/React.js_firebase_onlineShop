import React from "react";
import "./formInput.styles.scss";

const FromInput = props => {
    let inputElement = null;
    // const inputClasses = [classes.InputElement];

    // if (props.invalid && props.shouldValidate && props.touched) {
    //     inputClasses.push(classes.Invalid);
    // }

    switch ( props.elementType ) {
        case ( 'input' ):
            inputElement = <input
                {...props.elementConfig}
                 className={`${props.invalid && props.shouldValidate && props.touched ? "invalid": ""} form-input`}
                value={props.value}
                onChange={props.handleChange}
                autoComplete="new-password"
                />;
            break;
        case ( 'select' ):
            inputElement = (
                <select
                    className="form-input"
                    value={props.value}
                    onChange={props.handleChange}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input
            {...props.elementConfig}
             className="form-input"
            value={props.value}
            onChange={props.handleChange}
                  />;
    }

  return (
    <div className="group">
      {inputElement}
      {props.label ? (
        <label
          className={`${props.value.length ? "shrink" : ""} form-input-label`}
        >{props.label}</label>
      ) : null}
    </div>
  );
};

export default FromInput;