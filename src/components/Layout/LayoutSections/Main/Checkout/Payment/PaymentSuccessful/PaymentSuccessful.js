import React, {Component} from "react";

import '../Payment.css';

import SuccessfulIcon from "./Icons/SuccessfulIcon";

const PaymentSuccessful = (props) => {

    let total = JSON.parse(localStorage.getItem("orderSummary")).total;

    return (

        <div className="payment-successful-wrapper">

            <div className="payment-successful-container container">

                <div className="ps-icon">
                    <SuccessfulIcon/>
                </div>

                <div className="ps-info">
                    <h3>Payment successful!</h3>
                    <hr/>
                    <h5 className="text-uppercase">Amount paid</h5>
                    <p className="text-color-green">
                        ${total}
                    </p>
                </div>

                <div className="ps-dashboard">
                    <a href="/dashboard" className="ps-go-to-dashboard font-size-1">Go To Dashboard</a>
                </div>

            </div>

        </div>

    )

}

export default PaymentSuccessful;