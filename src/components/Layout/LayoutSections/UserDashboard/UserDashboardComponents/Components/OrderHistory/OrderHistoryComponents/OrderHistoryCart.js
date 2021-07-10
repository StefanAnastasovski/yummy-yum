import React from "react";

const OrderHistoryCart = (props) => {

    console.log(props)
    return (

        <div className="col my-2 py-2 bg-white">

            <div className="d-flex flex-row justify-content-between">
                <p>Meal:</p>
                <p>{props.item.mealName}</p>
            </div>

            <div className="d-flex flex-row justify-content-between">
                <p>DeliveryDate:</p>
                <p className="text-color-darkgreen">{props.item.deliveryDate}</p>
            </div>

            <div className="d-flex flex-row justify-content-between">
                <p>Delivery Time:</p>
                <p className="text-color-darkgreen">{props.item.deliveryTime}</p>
            </div>

            <div className="d-flex flex-row justify-content-between">
                <p>Servings:</p>
                <p className="text-color-darkgreen">{props.item.servings}</p>
            </div>

            <div className="d-flex flex-row justify-content-between">
                <p>Price:</p>
                <p className="text-color-darkgreen">{props.item.price}</p>
            </div>

            <div className="d-flex flex-row justify-content-between">
                <p>Customize Option:</p>
                <p className="text-color-darkgreen">{props.item.customizeIt}</p>
            </div>
            <div className="d-flex flex-row justify-content-between">
                <p>Menu:</p>
                <p className="text-color-darkgreen">{props.item.menuName}</p>
            </div>

        </div>

    )

}

export default OrderHistoryCart;