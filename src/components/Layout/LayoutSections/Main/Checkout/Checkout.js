import React, {Component} from "react";
import {Redirect} from 'react-router-dom';

import './Checkout.css';

class Checkout extends Component {

    state = {
        orderSummary: [],
        orderItems: [],
        loading: true,
        redirect: false
    };


    async componentDidMount() {
        await this.populateBillInfo();
    }

    populateBillInfo = async () => {

        let orderSummary = JSON.parse(localStorage.getItem("orderSummary"));
        let itemList = [];

        orderSummary.items.forEach((item, index) => {
            itemList.push({
                mealName: ["Meal: ", item.mealName],
                deliveryDate: ["Delivery Date: ", item.deliveryDate],
                deliveryTime: ["Delivery Time: ", item.deliveryTime],
                servings: ["Servings:", item.servings]
            })
        })

        this.setState({
            orderSummary: orderSummary,
            orderItems: itemList,
            loading: false
        })

    }

    onClickRedirect = () => {
        this.setState({
            redirect: true
        })
    }


    render() {

        // if (this.state.redirect) {
        //     return <Redirect from="/cart/checkout" to="/cart/pay-now"/>
        // }

        return (

            <div className="checkout-wrapper">

                <div className="checkout-container container">

                    <div className="checkout">

                        <h3 className="text-center">Order Summary</h3>

                        <div className="row checkout-meals">

                            <div className="col">
                                <p>Meals Per Week</p>
                                <p className="text-color-green">{this.state.orderSummary.meals}</p>
                            </div>

                            <div className="col">
                                <p>Servings Per Meal</p>
                                <p className="text-color-green">{this.state.orderSummary.servings}</p>
                            </div>

                        </div>

                        <hr/>

                        <div className="row checkout-delivery-time">

                            <ul className="list-unstyled">

                                {!this.state.loading && this.state.orderItems.map((item, index) => {
                                    console.log(item)
                                    return <li key={"co-info-" + index + 1}>

                                        <div className="col mt-2">
                                            <p>{item.mealName[0]} #{index + 1}</p>
                                            <p className="text-color-green">{item.mealName[1]}</p>
                                        </div>

                                        <div className="col">
                                            <p>{item.servings[0]}</p>
                                            <p className="text-color-green">{item.servings[1]}</p>
                                        </div>

                                        <div className="col">
                                            <p>{item.deliveryDate[0]}</p>
                                            <p className="text-color-green">{item.deliveryDate[1]}</p>
                                        </div>

                                        <div className="col mb-2">
                                            <p>{item.deliveryTime[0]}</p>
                                            <p className="text-color-green">{item.deliveryTime[1]}</p>
                                        </div>

                                    </li>
                                })}

                            </ul>


                        </div>

                        <hr/>

                        <div className="row checkout-bill">

                            <div className="col">
                                <p>Subtotal</p>
                                <p className="text-color-green">${this.state.orderSummary.subtotal}</p>
                            </div>

                            <div className="col">
                                <p>Shipping</p>
                                <p className="text-color-green">${this.state.orderSummary.shipping}</p>
                            </div>

                            <div className="col mt-1">
                                <h4>Total</h4>
                                <p className="text-color-green font-size-1">${this.state.orderSummary.total}</p>
                            </div>

                        </div>

                        <div className="row checkout-payment">

                            <div className="col">
                                <a href="/cart/pay-now" className="btn-checkout-payment">
                                    Pay Now
                                </a>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        )

    }

}

export default Checkout;