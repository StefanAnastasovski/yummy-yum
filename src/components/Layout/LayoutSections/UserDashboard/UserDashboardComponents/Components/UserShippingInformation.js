import React from "react";

const UserShippingInformation = (props) => {


    const getShippingInformation = () => {
        let shippingInfo;
        let localStorageShippingInfo = JSON.parse(localStorage.getItem("userInformation")).shippingInformation;
        if (localStorageShippingInfo) {
            shippingInfo = localStorageShippingInfo;
        } else if (props.info && props.info.address.length > 0) {
            shippingInfo = {
                address: props.info.address,
                zipCode: props.info.zipCode,
            }
        }
        return shippingInfo;
    }

    const shippingInformation = getShippingInformation();

    return (

        <div className="user-menu-body-main col">
            <div className="container">
                <div className="row d-flex flex-column">
                    <div className="col d-flex py-3">
                        <p className="col-3">
                            Address:
                        </p>
                        <p className="col text-color-green">
                            {
                                shippingInformation ? shippingInformation.address :
                                    <input type="text" placeholder="Address"
                                           name="shipping-address"
                                           required
                                           onChange={props.onChangeShippingInformationHandler}
                                    />
                            }
                        </p>
                    </div>
                    <div className="col d-flex py-3">
                        <p className="col-3">
                            Zip Code:
                        </p>
                        <p className="col text-color-green">
                            {
                                shippingInformation ? shippingInformation.zipCode :
                                    <input type="text" placeholder="Zip Code"
                                           name="shipping-zip-code"
                                           required
                                           onChange={props.onChangeShippingInformationHandler}
                                    />
                            }
                        </p>
                    </div>
                    {
                        !shippingInformation ? <div className="col d-flex py-3">
                                <button type="button" className=" btn-save-user-information"
                                        name="save-shipping-information"
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

export default UserShippingInformation;