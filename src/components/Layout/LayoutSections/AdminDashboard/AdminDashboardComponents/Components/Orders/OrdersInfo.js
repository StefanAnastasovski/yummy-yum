import React from "react";

const OrdersInfo = (props) => {

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
                <p className="py-2 text-color-green">
                    {props.isSubscription ? "YES" : "NO"}
                </p>
            </div>
            <div className="col orders-info-col d-flex justify-content-center align-items-center">
                <p className="py-2 text-color-green">
                    {props.orderDate}
                </p>
            </div>
            <div className="col orders-info-col d-flex justify-content-center align-items-center">
                <a href={"/dashboard/admin/orders/order-details/order-id=" + props.orderId}
                   className="text-decoration-none "
                >
                    <p className="py-2 text-danger cursor-pointer">
                        Order Details
                    </p>
                </a>
            </div>
        </div>

    )

}

export default OrdersInfo;