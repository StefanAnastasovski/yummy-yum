import React from "react";


const OrderSummary = (props) => {

    return (

        <div className="card">
            <h3 className="pb-3">Order Summary</h3>
            <div className="py-2">
                <div className="order-summary-meals">
                    <p>Meals:</p>
                    <p className="text-color-green">{props.orderSummary.meals}</p>
                </div>
                <div className="order-summary-servings">
                    <p>Servings:</p>
                    <p className="text-color-green">{props.orderSummary.servings}</p>
                </div>
            </div>

            <div className="py-2">
                <div className="order-summary-delivery-days">
                    <p>Weekly Delivery Days:</p>
                    <ul className="list-unstyled">
                        {props.orderSummary.deliveryDays.map((item, index) => {
                            return <li className="text-color-green" key={index}>
                                >>> {item}
                            </li>
                        })}
                    </ul>
                </div>
            </div>

            <div className="py-2">
                <div className="order-summary-subtotal">
                    <p>Subtotal:</p>
                    <p className="text-color-green">$ {props.orderSummary.subtotal}</p>
                </div>
                <div className="order-summary-shipping">
                    <p>Shipping:</p>
                    <p className="text-color-green">$ {props.orderSummary.shipping}</p>
                </div>
            </div>

            <div className="py-2">
                <div className="order-summary-total">
                    <p>Total:</p>
                    <p className="text-color-green bg-light">$ {props.orderSummary.total}</p>
                </div>
            </div>


            <a href="/cart/checkout" >
                <button type="button" className="btn-shopping-cart-checkout">
                    Checkout
                </button>
            </a>

        </div>

    )


}

export default OrderSummary;