import React from "react";
import Image from "../../WeeklyMenu/MealRecipe/MealRecipeComponents/Images/Image";
import OrderCartDeliveryTime from "./OrderCartComponents/OrderCartDeliveryTime";
import OrderCartDeliveryDate from "./OrderCartComponents/OrderCartDeliveryDate";
import OrderCartCustomizeIt from "./OrderCartComponents/OrderCartCustomizeIt";
import {useHistory} from 'react-router-dom';

const OrderCart = (props) => {
    console.log(props.cardInfo.menuCardIndex)
    let removeItem = () => {
        props.removeHandler(props.cardInfo.cardIndex);
    }

    let mealFromTheWeekOf = () => {
        let mondayDate = props.cardInfo.mealMenuDate.split("-");
        let startDate = new Date(parseInt(mondayDate[2]), (mondayDate[0] - 1), parseInt(mondayDate[1]));
        let endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 6);
        const startMonth = startDate.toLocaleString('default', {month: 'long'});
        const endMonth = endDate.toLocaleString('default', {month: 'long'});
        startDate = startMonth + " " + startDate.getDate() + ", " + startDate.getFullYear();
        endDate = endMonth + " " + endDate.getDate() + ", " + endDate.getFullYear()
        return [startDate, endDate];
    }

    let weekDates = mealFromTheWeekOf();

    let deliveryDateHandler = (event) => {
        props.deliveryDateOnChangeHandler(event, props.cardInfo.cardIndex);

    }

    let deliveryTimeHandler = (event) => {
        props.deliveryTimeOnChangeHandler(event, props.cardInfo.cardIndex);
    }

    const populateMealNameInLocalStorage = (mealName, mealMenuDate) => {
        let obj = {
            mealName: mealName,
            mealMenuDate: mealMenuDate,
            cardIdNumber: props.cardInfo.menuCardIndex
        }
        localStorage.setItem("mealInfo", JSON.stringify(obj));
    }

    let history = useHistory();

    let redirectToURL = () => {
        let mealName = props.cardInfo.mealName;
        let mealMenuDate = props.cardInfo.mealMenuDate;
        populateMealNameInLocalStorage(mealName, mealMenuDate)
        history.push("/meals/" + props.cardInfo.mealName);
        // window.open("/meals/" + props.cardInfo.mealName, "_blank").focus();
    }

    return (

        <div className="card">

            <div className="shopping-cart-card-img">

                <Image
                    img={props.img}
                />

            </div>


            <div className="shopping-cart-card-body mx-1">

                <div className="shopping-cart-mealname">
                    <p>Meal Name:</p>
                    <p className="text-color-green pl-2 text-center">{props.cardInfo.mealName}</p>
                </div>

                <div className="shopping-cart-meal-week">
                    <p>Meal From the Week of:</p>
                    <p className="text-color-green pl-2 text-center">{weekDates[0]} - {weekDates[1]}</p>
                </div>

                <div className="shopping-cart-customize-it mt-1">

                    <p>Customize It:</p>

                    <OrderCartCustomizeIt
                        customizeItValue={props.customizeItOption}
                    />

                </div>

                <div className="shopping-cart-customize-it-recipe d-flex mt-1">

                    <label>View the recipe:</label>

                    <div className="text-center">

                        <button type="button" className="btn-shopping-cart-view-recipe "
                                onClick={redirectToURL}>
                            Click Here
                        </button>

                    </div>

                </div>

            </div>


            <div className="shopping-cart-card-info">

                <div className="shopping-cart-serving-price">
                    <p className="text-right pr-3">Price:</p>
                    <p>${props.cardInfo.price}</p>
                </div>

                <div className="shopping-cart-servings">
                    <label>Servings:</label>

                    <button type="button" className="btn-shopping-cart-serving shopping-cart-serving-minus"
                            name={"decrease-serving-" + props.cardInfo.cardIndex}
                            onClick={props.cardHandler}
                    >
                        -
                    </button>

                    <input type="number"
                           min="0"
                           value={props.cardInfo.servings}
                           name={"serving-field-" + props.cardInfo.cardIndex}
                           className="text-center shopping-cart-serving-value"
                           onChange={props.servingOnChangeHandler}
                    />

                    <button type="button" className="btn-shopping-cart-serving shopping-cart-serving-plus"
                            name={"increase-serving-" + props.cardInfo.cardIndex}
                            onClick={props.cardHandler}
                    >
                        +
                    </button>

                </div>

                <div className="shopping-cart-delivery">

                    <div className="shopping-cart-delivery-date">

                        <label>Delivery Date:</label>

                        <OrderCartDeliveryDate
                            mealMenuDate={props.cardInfo.mealMenuDate}
                            deliveryDateName="delivery-date"
                            deliveryDateId={"delivery-date-" + props.cardInfo.cardIndex}
                            deliveryDateOnChangeHandler={deliveryDateHandler}
                            deliveryDateValue={props.deliveryDateValue}
                        />

                    </div>

                    <div className="shopping-cart-delivery-time mt-1">

                        <label>Delivery Time:</label>

                        <OrderCartDeliveryTime
                            mealMenuDate={props.cardInfo.mealMenuDate}
                            deliveryTimeName="delivery-time"
                            deliveryTimeId={"delivery-time-" + props.cardInfo.cardIndex}
                            deliveryTimeOnChangeHandler={deliveryTimeHandler}
                            deliveryTimeValue={props.deliveryTimeValue}
                        />

                    </div>

                </div>

                <div className="shopping-cart-remove">

                    <button
                        type="button" className="btn-remove-item" name="remove-item-from-cart"
                        onClick={removeItem}
                    >
                        Remove
                    </button>

                </div>

            </div>


        </div>

    )


}

export default OrderCart;