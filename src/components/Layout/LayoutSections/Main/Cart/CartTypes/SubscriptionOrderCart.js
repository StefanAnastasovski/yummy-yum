import Image from "../../WeeklyMenu/MealRecipe/MealRecipeComponents/Images/Image";
import OrderCartCustomizeIt from "../Order Cart/OrderCartComponents/OrderCartCustomizeIt";
import OrderCartDeliveryDate from "../Order Cart/OrderCartComponents/OrderCartDeliveryDate";
import OrderCartDeliveryTime from "../Order Cart/OrderCartComponents/OrderCartDeliveryTime";
import React from "react";
import Aux from "../../../../../../hoc/Auxilliary";

const SubscriptionOrderCart = (props) => {

    return (
        <Aux>

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
                    <p className="text-color-green pl-2 text-center">{props.weekDates[0]} - {props.weekDates[1]}</p>
                </div>

                <div className="shopping-cart-customize-it mt-1">

                    <p>Customize It:</p>

                    <OrderCartCustomizeIt
                        customizeItValue={props.cardInfo.customizeItOption}
                    />

                </div>

                <div className="shopping-cart-customize-it-recipe d-flex mt-1">

                    <label>View the recipe:</label>

                    <div className="text-center">

                        <button type="button" className="btn-shopping-cart-view-recipe "
                                onClick={props.redirectToURL}>
                            Click Here
                        </button>

                    </div>

                </div>

            </div>


            <div className="shopping-cart-card-info">


                <div className="shopping-cart-serving-price">
                    <p className="text-right pr-3">Price:</p>
                    <p className="text-color-green">FREE</p>
                </div>

                <div className="shopping-cart-servings">
                    <label>Servings:</label>

                    <input type="number"
                           min="0"
                           value={props.cardInfo.servings}
                           name={"serving-field-" + props.cardInfo.cardIndex}
                           disabled
                           className="text-center shopping-cart-serving-value  ml-3"
                           onChange={props.servingOnChangeHandler}
                    />

                </div>

                <div className="shopping-cart-delivery">

                    <div className="shopping-cart-delivery-date">

                        <label>Delivery Date:</label>

                        <OrderCartDeliveryDate
                            mealMenuDate={props.cardInfo.mealMenuDate}
                            deliveryDateName="delivery-date"
                            deliveryDateId={"delivery-date-" + props.cardInfo.cardIndex}
                            setCorrectDeliveryDate={props.setCorrectDeliveryDate}
                            deliveryDateOnChangeHandler={props.deliveryDateHandler}
                            deliveryDateValue={props.deliveryDateValue}
                        />

                    </div>

                    <div className="shopping-cart-delivery-time mt-1">

                        <label>Delivery Time:</label>

                        <OrderCartDeliveryTime
                            mealMenuDate={props.cardInfo.mealMenuDate}
                            deliveryTimeName="delivery-time"
                            deliveryTimeId={"delivery-time-" + props.cardInfo.cardIndex}
                            deliveryTimeOnChangeHandler={props.deliveryTimeHandler}
                            deliveryTimeValue={props.deliveryTimeValue}
                        />

                    </div>

                </div>

                <div className="shopping-cart-remove d-flex flex-column align-self-end">

                    <button
                        type="button" className="btn-shopping-cart-schedule" name="schedule-a-meal"
                        onClick={props.allowToContinueSchedule}
                    >
                        Schedule
                    </button>


                </div>

                <div className="shopping-cart-remove">

                    <button
                        type="button" className="btn-remove-item" name="remove-item-from-cart"
                        onClick={props.removeItem}
                    >
                        Remove
                    </button>

                </div>

            </div>

        </Aux>
    )
}

export default SubscriptionOrderCart;