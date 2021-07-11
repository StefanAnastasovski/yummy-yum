import React from "react";

const OrderHistoryCart = (props) => {

    return (

        <div className="col my-2 p-2 bg-light-lemon-green">

            <div className="d-flex flex-row justify-content-between">
                <p>Meal:</p>
                <p className="text-color-black">{props.item.mealName}</p>
            </div>

            <div className="d-flex flex-row justify-content-between">
                <p>DeliveryDate:</p>
                <p className="text-color-black">{props.item.deliveryDate}</p>
            </div>

            <div className="d-flex flex-row justify-content-between">
                <p>Delivery Time:</p>
                <p className="text-color-black">{props.item.deliveryTime}</p>
            </div>

            <div className="d-flex flex-row justify-content-between">
                <p>Servings:</p>
                <p className="text-color-black">{props.item.servings}</p>
            </div>
            <div className="d-flex flex-row justify-content-between">
                <p>Subscription Used:</p>
                <p className="text-color-black">{props.item.isSubscription ? "YES" : "NO"}</p>
            </div>

            <div className="d-flex flex-row justify-content-between">
                <p>Price:</p>
                <p className="text-color-black">{props.item.price}</p>
            </div>

            <div className="d-flex flex-row justify-content-between">
                <p>Customize Option:</p>
                <p className="text-color-black">{props.item.customizeIt}</p>
            </div>
            <div className="d-flex flex-row justify-content-between">
                <p>Menu:</p>
                <p className="text-color-black">{props.item.menuName}</p>
            </div>

        </div>

    )

}

export default OrderHistoryCart;