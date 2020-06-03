import React from "react";
import { withRouter } from "react-router-dom"; 
import "./orderPage.styles.scss";


const OrderPage = props => {

    return(
        <div className="order-page">
            <div className="order-header">
                <div className="header-block">
                    <span>Date</span>
                </div>
                <div className="header-block">
                    <span>Number</span>
                </div>
                <div className="header-block">
                    <span>Price</span>
                </div>
                <div className="header-block">
                    <span>State</span>
                </div>
            </div>
        </div>
    )
}

export default withRouter(OrderPage); 