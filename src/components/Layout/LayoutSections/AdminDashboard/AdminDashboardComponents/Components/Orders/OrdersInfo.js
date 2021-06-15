import React from "react";

const OrdersInfo = (props) => {
    // let oldName = props.orderN-infoame;
    // let edit = () => {
    //     props.editCoupon(props, oldName);
    // }

    return (

        <div className="orders-info d-flex row" key={props.keyEl}>
            <div className="col orders-info-col d-flex justify-content-center align-items-center">
                <p className="py-2 text-color-green">
                    {props.fullName}
                </p>
            </div>
            <div className="col orders-info-col d-flex justify-content-center align-items-center">
                <p className="py-2 text-color-green">
                    {props.username}
                </p>
            </div>
            <div className="col orders-info-col d-flex justify-content-center align-items-center">
                <p className="py-2 text-color-green">
                    {props.mealQty}
                </p>
            </div>
            <div className="col orders-info-col d-flex justify-content-center align-items-center">
                <p className="py-2 text-color-green">
                    {props.servingsQty}
                </p>
            </div>
            <div className="col orders-info-col d-flex justify-content-center align-items-center">
                <p className="py-2 text-color-green">
                    {props.subtotal}
                </p>
            </div>
            <div className="col orders-info-col d-flex justify-content-center align-items-center">
                <p className="py-2 text-color-green">
                    {props.shipping}
                </p>
            </div>
            <div className="col orders-info-col d-flex justify-content-center align-items-center">
                <p className="py-2 text-color-green">
                    {props.total}
                </p>
            </div>

            <div className="col orders-info-col d-flex justify-content-center align-items-center">
                <p className="py-2 text-danger cursor-pointer"
                    // onClick={edit}
                >
                    Order Details
                </p>
            </div>
        </div>

    )

}

export default OrdersInfo;