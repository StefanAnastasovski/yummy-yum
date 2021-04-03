import React from "react";


const OrderSummarySubscribe = (props) => {


    return (

        <div className="card">
            <h3 className="pb-3">Order Summary</h3>
            <div className="py-2">
                <p>Meals Per Week: </p>
                <p>Servings Per Meal:</p>
            </div>

            <div className="py-2">
                <p>Weekly Delivery Day:</p>
                <p>First Delivery:</p>
            </div>

            <div className="py-2">
                <p>Subtotal:</p>
                <p>Shipping:</p>
            </div>

            <div className="py-2">
                <p>Total</p>
            </div>


        </div>

    )


}

export default OrderSummarySubscribe;