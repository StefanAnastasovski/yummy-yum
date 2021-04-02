import React, {Component} from "react";

import "./Cart.css";
import Image from "../WeeklyMenu/MealRecipe/MealRecipeComponents/Images/Image";
import OrderCart from "./Order Cart/OrderCart";
import OrderSummary from "./Order Summary/OrderSummary";
import {parse} from "@fortawesome/fontawesome-svg-core";


class Cart extends Component {

    state = {
        items: [
            {
                cardIndex: 1,
                img: "https://homechef.imgix.net/https%3A%2F%2Fasset.homechef.com" +
                    "%2Fuploads%2Fmeal%2Fplated%2F5152%2F5152BBQTeriyakiandWasabiSlawBurgersReshoot" +
                    "__1_of_1_-c3e05e47403944539aa528a1579db1db-c3e05e47403944539aa528a1579db1db.jpg?" +
                    "ixlib=rails-1.1.0&w=850&auto=format&s=882bb21ade9f5fce4e3996f3dfe761f8",
                mealName: "Full Meal Name Here",
                servings: 1,
                pricePerUnit: 6.99,
                price: 6.99
            }
        ],

    }

    increaseServingHandler = (index) => {
        let array = [...this.state.items];
        array[index].servings = array[index].servings + 1;
        array[index].price = parseFloat((array[index].servings * array[index].pricePerUnit).toFixed(2));
        this.setState({
            items: array
        })
    }

    decreaseServingHandler = (index) => {
        let array = [...this.state.items];
        if (array[index].servings > 1) {
            array[index].servings = array[index].servings - 1;
            array[index].price = parseFloat((array[index].servings * array[index].pricePerUnit).toFixed(2));
            this.setState({
                items: array
            })
        }

    }

    servingOnChangeHandler = (event) => {
        let splitName = event.target.name.split("-");
        let index = parseInt(splitName[2]) - 1;
        let array = [...this.state.items];
        array[index].servings = parseInt(event.target.value);
        array[index].price = parseFloat((array[index].servings * array[index].pricePerUnit).toFixed(2));
        this.setState({
            items: array
        })
    }

    cardHandler = (event) => {
        let patternIncrease = new RegExp("increase-serving");
        let patternDecrease = new RegExp("decrease-serving");

        let splitName = event.target.name.split("-");
        let index = parseInt(splitName[2]) - 1;

        if (patternIncrease.test(event.target.name)) {
            this.increaseServingHandler(index)
        } else if (patternDecrease.test(event.target.name)) {
            this.decreaseServingHandler(index)
        }

    }

    render() {

        return (

            <div className="cart-wrapper">

                <div className="shopping-cart-title">

                    <h2 className="container">Shopping Cart</h2>

                </div>

                <div className="shopping-cart-wrapper">

                    <div className="container">

                        <div className="row d-flex flex-wrap">

                            <div className="col-9 shopping-cart-cards">

                                <OrderCart
                                    img={this.state.items[0].img}
                                    cardInfo={this.state.items[0]}
                                    cardHandler={this.cardHandler}
                                    servingOnChangeHandler={this.servingOnChangeHandler.bind(this)}
                                />

                            </div>

                            <div className="col-3 shopping-cart-checkout">

                                <OrderSummary/>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        )

    }


}

export default Cart;