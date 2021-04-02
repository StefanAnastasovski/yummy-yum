import React from "react";
import Image from "../../WeeklyMenu/MealRecipe/MealRecipeComponents/Images/Image";


const OrderCart = (props) => {


    return (

        <div className="card">

            <div className="shopping-cart-card-img">

                <Image
                    img={props.img}
                />

            </div>


            <div className="shopping-cart-card-body">
                <div className="shopping-cart-mealname">
                    <p>Meal Name:</p>
                    <p className="text-color-green pl-2">{props.cardInfo.mealName}</p>
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

                    <input type="number" defaultValue={props.cardInfo.servings}
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

            </div>


        </div>

    )


}

export default OrderCart;