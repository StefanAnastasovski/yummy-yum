import React, {Component} from "react";

import './Payment.css';

import passwordHash from 'password-hash';

class Payment extends Component {

    state = {};


    handleSubmit = async (event) => {
        event.preventDefault();


    };

    validateForm = () => {

    }


    render() {

        return (

            <div className="payment-wrapper">

                <div className="payment-container container">

                    <div className="payment-card d-flex justify-content-center py-5">

                        <div className="card p-5">

                            <div>

                                <form onSubmit={this.handleSubmit}>

                                    <div className="pt-5 pb-3 d-flex align-items-center flex-column">

                                        <div className="pnb-fields">

                                            <div className="row mb-3">

                                                <div className="col-9 pr-1">
                                                    <label className="m-0 text-color-green">Shipping Address: </label>

                                                    <input type="text" required
                                                        // onChange={this.onChange}
                                                           name="pnb-shipping-address"
                                                           className="payment-delivery-address-field"
                                                           placeholder="Shipping Address"/>
                                                </div>

                                                <div className="col-3 pl-1">
                                                    <label className="m-0 text-color-green">Zip/Postal Code: </label>
                                                    <input type="number" required
                                                        // onChange={this.onChange}
                                                           name="pnb-email"
                                                           className="payment-zip-code-field"
                                                           placeholder="Zip/Postal Code"/>
                                                </div>

                                            </div>

                                            <div className="row mb-3 flex-column">
                                                <div className="col">
                                                    <label className="m-0 text-color-green">Name on Card: </label>
                                                    <input type="text" required
                                                           name="pnb-name-on-card"
                                                           className="payment-name-of-card-field"
                                                           placeholder="John Doe"/>
                                                </div>
                                                <div className="col mt-1">
                                                    <label className="m-0 text-color-green">Card Number: </label>
                                                    <input type="number" required
                                                           name="pnb-card-number"
                                                           className="payment-card-number-field"
                                                           placeholder="XXXX XXXX XXXX XXXX"/>
                                                </div>
                                            </div>

                                            <div className="row mb-3">

                                                <div className="col pr-1">
                                                    <label className="m-0 text-color-green">Expiration Date: </label>
                                                    <input type="text" required
                                                        // onChange={this.onChange}
                                                           name="pnb-expiration-date"
                                                           className="payment-card-expiration-date-field"
                                                           placeholder="MM / YY"/>
                                                </div>

                                                <div className="col pl-1">
                                                    <label className="m-0 text-color-green">Security Code: </label>
                                                    <input type="number" required
                                                        // onChange={this.onChange}
                                                           name="pnb-security-date"
                                                           className="payment-card-security-code-field"
                                                           placeholder="CVV"/>
                                                </div>

                                            </div>

                                        </div>


                                        <a href="/cart/payment-successful" className="btn-pay-now-submit">
                                            Pay Now
                                        </a>

                                    </div>

                                </form>

                                <hr/>


                                <div className="">

                                    <div className="text-center">

                                        <p className="font-size-3 d-inline text-color-green">
                                            By continuing,
                                            I accept the <span className="font-weight-bolder">YummyYum</span>
                                            <a href="/terms" className="text-decoration-none"> Terms </a>
                                            and
                                            <a href="/privacy-policy" className="text-decoration-none"> Privacy
                                                Policy</a> .
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        )

    }

}

export default Payment;