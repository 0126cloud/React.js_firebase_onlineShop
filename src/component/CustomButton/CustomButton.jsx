import React from "react";
import "./customButton.styles.scss";

const CustomButton = props => {
  return (
    <button
      className={`${props.inverted ? "inverted" : ""}
                ${props.isGoogleSignIn ? "google-sign-in" : ""} custom-button`}
      type={props.type}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
};

export default CustomButton;
