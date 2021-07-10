import React from "react";

import '../Payment.css';

import SuccessfulIcon from "./Icons/SuccessfulIcon";
import Aux from "../../../../../../../hoc/Auxilliary";

const PaymentSuccessful = (props) => {

    let config;
    let btnAction;
    let showPayment = false;

    if (!props.isSubscription) {
        showPayment = true;
        config = {
            title: "Payment Successful!",
            amountPaid: JSON.parse(localStorage.getItem("orderSummary")).total,
            location: "/dashboard/user/personal-information"
        }
    } else if (props.isSubscription && (JSON.parse(localStorage.getItem("scheduleCartItems")).length === 0)) {
        showPayment = true;
        config = {
            title: "Payment Successful!",
            amountPaid: JSON.parse(localStorage.getItem("subscriptionPayment")).totalAmount,
            location: "/dashboard/user/personal-information"
        }
    } else if (props.isSubscription) {
        let items = JSON.parse(localStorage.getItem("scheduleCartItems"))
        config = {
            title: "Your Meals Are Scheduled!",
            mealNames: [],
            mealDeliveryDates: [],
            mealDeliveryTimes: [],
            location: "/dashboard/user/personal-information"
        }
        items.forEach((item, index) => {
            config.mealNames.push(item.mealName)
            config.mealDeliveryDates.push(item.deliveryDate)
            config.mealDeliveryTimes.push(item.deliveryTime)
        });
        btnAction = () => {
            localStorage.setItem("scheduleCartItems", JSON.stringify([]))
        }
    }

    return (

        <div className="payment-successful-wrapper">

            <div className="payment-successful-container container">

                <div className="ps-icon">
                    <SuccessfulIcon/>
                </div>

                <div className="ps-info">
                    {
                        showPayment &&
                        <h3>{config.title}</h3>
                    }
                    <hr/>
                    {
                        showPayment &&
                        <Aux>
                            <h5 className="text-uppercase">Amount paid</h5>
                            <p className="text-color-green">
                                ${config.amountPaid}
                            </p>
                        </Aux>
                    }
                    {
                        props.isSubscription && !showPayment && <div>
                            <div className="row d-flex flex-column">
                                {
                                    config.mealNames.map((item, index) => {
                                        if (index < config.mealNames.length - 1) {
                                            return <div key={"scheduled-meal-id-" + index}
                                                        className="col d-flex flex-column pb-1 border-bottom border-info">
                                                <div className="col d-flex flex-row align-items-baseline">
                                                    <p className="font-size-1 text-color-black pr-1">Meal:</p>
                                                    <p className="font-size-1 text-color-darkgreen">{item}</p>
                                                </div>
                                                <div className="col d-flex flex-row align-items-baseline">
                                                    <p className="font-size-1 text-color-black pr-1">Date:</p>
                                                    <p className="font-size-1 text-color-darkgreen">{config.mealDeliveryDates[index]}</p>
                                                </div>
                                                <div className="col d-flex flex-row align-items-baseline">
                                                    <p className="font-size-1 text-color-black pr-1">Time:</p>
                                                    <p className="font-size-1 text-color-darkgreen">{config.mealDeliveryTimes[index]}</p>
                                                </div>
                                            </div>
                                        } else if (config.mealNames.length - 1 === index) {
                                            return <div key={"scheduled-meal-id-" + index}
                                                        className="col d-flex flex-column">
                                                <div className="col d-flex flex-row align-items-baseline">
                                                    <p className="font-size-1 text-color-black pr-1">Meal:</p>
                                                    <p className="font-size-1 text-color-darkgreen">{item}</p>
                                                </div>
                                                <div className="col d-flex flex-row align-items-baseline">
                                                    <p className="font-size-1 text-color-black pr-1">Date:</p>
                                                    <p className="font-size-1 text-color-darkgreen">{config.mealDeliveryDates[index]}</p>
                                                </div>
                                                <div className="col d-flex flex-row align-items-baseline">
                                                    <p className="font-size-1 text-color-black pr-1">Time:</p>
                                                    <p className="font-size-1 text-color-darkgreen">{config.mealDeliveryTimes[index]}</p>
                                                </div>
                                            </div>
                                        } else {
                                            return null;
                                        }
                                    })
                                }
                            </div>
                        </div>
                    }

                </div>

                {
                    !props.isSubscription ? <div className="ps-dashboard">
                        <a href={config.location} className="ps-go-to-dashboard font-size-1">Go To Dashboard</a>
                    </div> : <div className="ps-dashboard" onClick={btnAction}>
                        <a href={config.location} className="ps-go-to-dashboard font-size-1">Go To Dashboard</a>
                    </div>
                }

            </div>

        </div>

    )

}

export default PaymentSuccessful;