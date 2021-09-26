import React from "react";

const UserBillingInformation = (props) => {

    const getBillingInformation = () => {
        let billingInfo;
        let localStorageBillingInfo = JSON.parse(localStorage.getItem("userInformation")).billingInformation;
        if (localStorageBillingInfo) {
            billingInfo = localStorageBillingInfo;
        } else if (props.info && props.info.nameOnCard.length > 0) {
            billingInfo = {
                nameOnCard: props.info.nameOnCard,
                cardNumber: props.info.cardNumber,
                expirationDateMonth: props.info.expirationDateMonth,
                expirationDateYear: props.info.expirationDateYear,
                isActive: props.info.isActive
            }
        }
        return billingInfo;
    }

    const billingInformation = getBillingInformation();

    return (

        <div className="user-menu-body-main col">

            <div className="container">

                <div className="user-info row d-flex flex-column">

                    <div className="col d-flex py-3">
                        <p className="col-3">
                            Name On Card:
                        </p>
                        <p className="col text-color-green">
                            {
                                billingInformation ? billingInformation.nameOnCard :
                                    <input type="text" placeholder="Name On Card" name="name-on-card"
                                           className="px-1"
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
                                billingInformation ? "*" + billingInformation.cardNumber.slice(-4) :
                                    <input type="text"
                                           className="px-1"
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
                                billingInformation ? billingInformation.expirationDateMonth :
                                    <input type="text" placeholder="Expiration Date (Month)"
                                           className="px-1"
                                           maxLength="2"
                                           minLength="2"
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
                                billingInformation ? billingInformation.expirationDateYear :
                                    <input type="text" placeholder="Expiration Date (Year)"
                                           className="px-1"
                                           maxLength="4"
                                           minLength="4"
                                           name="expiration-date-year"
                                           required
                                           onChange={props.onChangeBillingInformationHandler}/>
                            }
                        </p>
                    </div>

                    {
                        billingInformation && <div className="col d-flex py-3">
                            <p className="col-3">
                                Status:
                            </p>
                            <p className="col text-color-green">
                                {billingInformation.isActive ? "Active" : "Inactive"}
                            </p>
                        </div>
                    }

                    {
                        !billingInformation ? <div className="col d-flex py-3">
                                <button type="button" className=" btn-save-user-information"
                                        name="save-billing-information"
                                        onClick={props.onSubmitSave}>
                                    Save
                                </button>
                            </div> :
                            null
                    }

                </div>

            </div>

        </div>

    )

}

export default UserBillingInformation;