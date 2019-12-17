import React from "react";
import "./formInput.styles.scss";

const FromInput = props => {
  return (
    <div className="group">
      <input
        className="form-input"
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.handleChange}
        required
      />
      {props.label ? (
        <label
          className={`${props.value.length ? "shrink" : ""} form-input-label`}
        >{props.label}</label>
      ) : null}
    </div>
  );
};

export default FromInput;