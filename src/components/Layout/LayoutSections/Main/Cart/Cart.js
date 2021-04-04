import React, {Component} from "react";

import "./Cart.css";
import OrderCart from "./Order Cart/OrderCart";
import OrderSummary from "./Order Summary/OrderSummary";


class Cart extends Component {

    state = {
        items: [],
        orderSummary: {
            "meals": 0,
            "servings": 0,
            "deliveryDays": ["/"],
            "subtotal": 0.00,
            "shipping": 0.00,
            "total": 0.00,
            "items": []
        },
        loading: true,
        loadingReceipt: true,
        isSomethingChanged: false,
    }

    async componentDidMount() {
        await this.populateItems();

        if (this.state.items.length !== 0)
            await this.populateReceipt();
    }

    calculateShipping = (servings) => {
        if (servings > 0 && servings <= 2) {
            return 5.99;
        } else if (servings > 2 && servings <= 10) {
            return servings * 3.99;
        } else if (servings > 10) {
            return servings * 2.55;
        }
    }

    populateReceipt = async () => {
        let array = JSON.parse(localStorage.getItem("shoppingCartItems"));
        let orderSummary
        if (array.length > 0) {
            let meals = 0;
            let servings = 0;
            let deliveryDays = [];
            let subtotal = 0;

            array.forEach((item) => {
                meals++;
                servings += parseInt(item.servings);
                deliveryDays.push(item.deliveryDate + " / " + item.deliveryTime)
                subtotal += item.price;
            });

            let shipping = await this.calculateShipping(servings);

            orderSummary = {
                "meals": meals,
                "servings": servings,
                "deliveryDays": deliveryDays,
                "subtotal": parseFloat(subtotal.toFixed(2)),
                "shipping": parseFloat(shipping.toFixed(2)),
                "total": parseFloat((subtotal + shipping).toFixed(2)),
                "items": array

            }

        } else {
            orderSummary = {
                "meals": 0,
                "servings": 0,
                "deliveryDays": ["/"],
                "subtotal": 0.00,
                "shipping": 0.00,
                "total": 0.00,
                "items": []
            }
        }
        localStorage.setItem("orderSummary", JSON.stringify(orderSummary))
        this.setState({
            isSomethingChanged: false,
            orderSummary: orderSummary,
            loadingReceipt: false
        })

    }

    populateItems = () => {
        let items = JSON.parse(localStorage.getItem("shoppingCartItems"));
        items = items.map((item, index) => {
            let mealMenuDate = item.mealMenuDate;
            return {
                "img": {
                    "url": item.img.url,
                    "alt": item.img.alt,
                    "cookingStep": item.img.cookingStep,
                    "isChefImg": item.img.isChefImg,
                    "isMainRecipeImg": item.img.isMainRecipeImg
                },
                "mealName": item.mealName,
                "price": parseFloat(item.price),
                "mealMenuDate": mealMenuDate,
                "pricePerUnit": parseFloat(item.pricePerUnit),
                "cardIndex": index,
                "menuCardIndex": item.menuCardIndex,
                "servings": parseInt(item.servings),
                "deliveryDate": item.deliveryDate,
                "deliveryTime": item.deliveryTime
            }
        })
        this.setState({
            items: items,
            loading: false,
        })
        this.populateReceipt();
    }

    increaseServingHandler = (index) => {
        let array = [...this.state.items];
        array[index].servings = array[index].servings + 1;
        array[index].price = parseFloat((array[index].servings * array[index].pricePerUnit).toFixed(2));
        localStorage.setItem("shoppingCartItems", JSON.stringify(array))
        this.setState({
            items: array,
        })
        this.populateReceipt();
    }

    decreaseServingHandler = (index) => {
        let array = [...this.state.items];
        if (array[index].servings > 1) {
            array[index].servings = array[index].servings - 1;
            array[index].price = parseFloat((array[index].servings * array[index].pricePerUnit).toFixed(2));
        }
        localStorage.setItem("shoppingCartItems", JSON.stringify(array))
        this.setState({
            items: array,
        })
        this.populateReceipt();
    }

    servingOnChangeHandler = (event) => {
        let splitName = event.target.name.split("-");
        let index = parseInt(splitName[2]) - 1;
        let array = [...this.state.items];
        array[index].servings = parseInt(event.target.value);
        array[index].price = parseFloat((array[index].servings * array[index].pricePerUnit).toFixed(2));
        this.setState({
            items: array,
        })

        this.populateReceipt();
    }

    cardHandler = (event) => {
        let patternIncrease = new RegExp("increase-serving");
        let patternDecrease = new RegExp("decrease-serving");

        let splitName = event.target.name.split("-");
        let index = parseInt(splitName[2]);

        if (patternIncrease.test(event.target.name)) {
            this.increaseServingHandler(index)
        } else if (patternDecrease.test(event.target.name)) {
            this.decreaseServingHandler(index)
        }

    }

    removeHandler = async (index) => {
        let shoppingCartItems = JSON.parse(localStorage.getItem("shoppingCartItems"));
        shoppingCartItems.splice(index, 1)
        localStorage.setItem("shoppingCartItems", JSON.stringify(shoppingCartItems))
        this.setState({
            isSomethingChanged: true
        })
        await this.populateItems();
    }

    deliveryDateOnChangeHandler = async (event, index) => {
        let shoppingCartItems = JSON.parse(localStorage.getItem("shoppingCartItems"));
        shoppingCartItems[index].deliveryDate = event.target.value;
        localStorage.setItem("shoppingCartItems", JSON.stringify(shoppingCartItems));
        this.setState({
            isSomethingChanged: true
        })
        await this.populateItems();
    }

    deliveryTimeOnChangeHandler = async (event, index) => {
        let shoppingCartItems = JSON.parse(localStorage.getItem("shoppingCartItems"));
        shoppingCartItems[index].deliveryTime = event.target.value;
        localStorage.setItem("shoppingCartItems", JSON.stringify(shoppingCartItems));
        this.setState({
            isSomethingChanged: true
        })
        await this.populateItems();
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

                                <ul className="list-unstyled">

                                    {

                                        !this.state.loading && this.state.items.length > 0 ? this.state.items.map((item, index) => {
                                                return <li key={index}>
                                                    <OrderCart
                                                        img={item.img}
                                                        cardInfo={item}
                                                        cardHandler={this.cardHandler}
                                                        servingOnChangeHandler={this.servingOnChangeHandler.bind(this)}
                                                        removeHandler={this.removeHandler.bind(this)}
                                                        deliveryDateOnChangeHandler={(e) => {
                                                            this.deliveryDateOnChangeHandler(e, index).then(r => null)
                                                        }}
                                                        deliveryTimeOnChangeHandler={(e) => {
                                                            this.deliveryTimeOnChangeHandler(e, index).then(r => null)
                                                        }}
                                                        deliveryDateValue={item.deliveryDate}
                                                        deliveryTimeValue={item.deliveryTime}
                                                    />
                                                </li>
                                            }) :
                                            <li><h2 className="text-center text-danger">Your Cart is empty</h2></li>

                                    }


                                </ul>

                            </div>

                            <div className="col-3 shopping-cart-checkout">

                                {!this.state.loadingReceipt && <OrderSummary
                                    orderSummary={this.state.orderSummary}
                                />
                                }

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        )

    }


}

export default Cart;