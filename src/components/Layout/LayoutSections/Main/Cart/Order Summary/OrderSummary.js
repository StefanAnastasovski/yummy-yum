import React from "react";
import Aux from "../../../../../../hoc/Auxilliary";


const OrderSummary = (props) => {

    let shouldShowScheduleBtn = JSON.parse(localStorage.getItem("scheduleCartItems"));
    let isLoggedIn = localStorage.getItem("isLoggedIn") === "YES";

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

            <div className="shopping-cart-checkout-field">

                <button type="button"
                        className="btn-shopping-cart-checkout"
                        onClick={props.redirectToCheckout}
                >
                    Checkout
                </button>

                {
                    isLoggedIn && props.redirectToCheckoutError.length > 0 ?
                        <p className="text-danger text-center font-size-1">{props.redirectToCheckoutError} </p> : null
                }

            </div>

            {

                isLoggedIn && shouldShowScheduleBtn.length > 0 &&

                <Aux>

                    <hr/>

                    <div className="shopping-cart-schedule-field">

                        <button type="button"
                                className="btn-shopping-cart-schedule"
                                onClick={props.allowToContinueSchedule}>
                            Schedule
                        </button>


                        {
                            isLoggedIn && props.scheduleMealError.length > 0 &&
                            <p className="text-danger text-center font-size-2">{props.scheduleMealError} </p>
                        }

                        {
                            isLoggedIn && props.scheduleMealMonthlyError.length > 0 &&
                            props.scheduleMealMonthlyError.map((item, index) => {

                                if (!(item.message.length === 0)) {
                                    if (!(index === props.scheduleMealMonthlyError.length - 1)) {
                                        return <div key={"schedule-meal-error-id-" + index}
                                                    className="d-flex flex-column pt-1 pb-1 border-bottom border-danger">
                                            <p className="text-center font-size-2">
                                                Week: {item.week}
                                            </p>
                                            <p className="text-danger text-center font-size-2">
                                                <span className="text-color-purple">Message:</span> {item.message}
                                            </p>
                                        </div>
                                    } else {
                                        return <div key={"schedule-meal-error-id-" + index}
                                                    className="d-flex flex-column">
                                            <p className="text-center font-size-2">
                                                Week: {item.week}
                                            </p>
                                            <p className="text-danger text-center font-size-2">
                                                <span className="text-color-purple">Message:</span> {item.message}
                                            </p>
                                        </div>
                                    }
                                } else {
                                    return null;
                                }

                            })

                        }

                    </div>

                </Aux>

            }

        </div>

    )


}

export default OrderSummary;