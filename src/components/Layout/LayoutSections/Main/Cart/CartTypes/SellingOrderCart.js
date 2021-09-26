import Image from "../../WeeklyMenu/MealRecipe/MealRecipeComponents/Images/Image";
import OrderCartCustomizeIt from "../Order Cart/OrderCartComponents/OrderCartCustomizeIt";
import OrderCartDeliveryDate from "../Order Cart/OrderCartComponents/OrderCartDeliveryDate";
import OrderCartDeliveryTime from "../Order Cart/OrderCartComponents/OrderCartDeliveryTime";
import React from "react";
import Aux from "../../../../../../hoc/Auxilliary";


const SellingOrderCart = (props) => {

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
                        customizeItValue={props.cardInfo.customizeItOption || props.cardInfo.customizeIt}
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
                     <p className="text-color-green">${props.cardInfo.price}</p>
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
export default SellingOrderCart;