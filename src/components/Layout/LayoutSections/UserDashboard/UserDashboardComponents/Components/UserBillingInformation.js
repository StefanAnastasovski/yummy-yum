import React from "react";

const UserBillingInformation = (props) => {

    let billingInfo = JSON.parse(localStorage.getItem("userInformation")).billingInformation;

    return (

        <div className="user-menu-body-main col">

            <div className="container">

                <div className="row d-flex flex-column">

                    <div className="col d-flex py-3">
                        <p className="col-3">
                            Name On Card:
                        </p>
                        <p className="col text-color-green">
                            {
                                billingInfo ? billingInfo.nameOnCard :
                                    <input type="text" placeholder="Name On Card" name="name-on-card"
                                           onChange={props.onChangeBillingInformationHandler}
                                           required/>
                            }
                        </p>
                    </div>

                    <div className="col d-flex py-3">
                        <p className="col-3">
                            Card Number:
                        </p>
                        <p className="col text-color-green">
                            {
                                billingInfo ? "*" + billingInfo.cardNumber.slice(-4) :
                                    <input type="text"
                                           maxLength="16" minLength="16"
                                           placeholder="Card Number" name="card-number"
                                           required
                                           onChange={props.onChangeBillingInformationHandler}/>
                            }
                        </p>
                    </div>

                    <div className="col d-flex py-3">
                        <p className="col-3">
                            Expiration Date (Month):
                        </p>
                        <p className="col text-color-green">
                            {
                                billingInfo ? billingInfo.expirationDateMonth :
                                    <input type="text" placeholder="Expiration Date (Month)"
                                           maxLength="2"
                                           name="expiration-date-month"
                                           required
                                           onChange={props.onChangeBillingInformationHandler}/>
                            }
                        </p>
                    </div>

                    <div className="col d-flex py-3">
                        <p className="col-3">
                            Expiration Date (Year):
                        </p>
                        <p className="col text-color-green w-75">
                            {
                                billingInfo ? billingInfo.expirationDateYear :
                                    <input type="text" placeholder="Expiration Date (Year)"
                                           maxLength="2"
                                           name="expiration-date-year"
                                           required
                                           onChange={props.onChangeBillingInformationHandler}/>
                            }
                        </p>
                    </div>

                    {
                        billingInfo && <div className="col d-flex py-3">
                            <p className="col-3">
                                Status:
                            </p>
                            <p className="col text-color-green">
                                {billingInfo.isActive ? "Active" : "Inactive"}
                            </p>
                        </div>
                    }

                    {
                        !billingInfo ? <div className="col d-flex py-3">
                                <button type="button" className=" btn-save-user-information"
                                        name="save-billing-information"
                                        onClick={props.onSubmitSave}>
                                    Save
                                </button>
                            </div> :
                            ""
                            // <div className="col d-flex py-3">
                            //     <button type="button" className=" btn-save-user-information"
                            //             name="save-billing-information"
                            //             onClick={props.onSubmitSave}>
                            //         Change
                            //     </button>
                            // </div>
                    }

                </div>

            </div>

        </div>

    )

}

export default UserBillingInformation;