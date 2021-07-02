import React from "react";

import Image from "../MealRecipe/MealRecipeComponents/Images/Image";
import CustomizeItCard from "../CustomizeItCard/CustomizeItCard";
import Aux from "../../../../../../hoc/Auxilliary";
import RemoveIcon from "./Icons/RemoveIcon/RemoveIcon";
import MinusIcon from "./Icons/MinusIcon/MinusIcon";
import PlusIcon from "./Icons/PlusIcon/PlusIcon";


const WeeklyMenuCard = (props) => {

    // console.log(props);

    let mealIngredientTags = props.meal.mealIngredientTag.split(", ");

    let isLoggedIn = false;
    if (localStorage.getItem("isLoggedIn") === "YES") {
        isLoggedIn = true;
    }

    let clicked = () => {
        props.populateLocalStorageOnCustomizeIt()
        props.customizeCardClicked(props.cardIdNumber)
    }

    let addToCart = () => {
        props.addToCartHandler(props.cardIdNumber, props.meal, props.img)
    }

    let scheduleAMealHandler = () => {
        props.scheduleAMealHandler(props.cardIdNumber, props.meal, props.img)
    }

    let dateValues = props.mealMenuName.split("-");
    let cartDate = new Date(dateValues[1], dateValues[2] - 1, dateValues[3]);

    let cartItems = JSON.parse(localStorage.getItem("shoppingCartItems"));

    let showAddToCartBtn = true;
    let numberOfServings = 0;
    cartItems.forEach(item => {
        if (props.cardIdNumber === item.menuCardIndex) {
            showAddToCartBtn = false;
            numberOfServings = item.servings
        }
    })

    let showScheduleBtn = true;
    let scheduleCartItems = JSON.parse(localStorage.getItem('scheduleCartItems'));
    scheduleCartItems.forEach(item => {
        if (props.cardIdNumber === item.menuCardIndex) {
            showScheduleBtn = false;
        }
    })
    const removeItem = () => {
        props.removeItemFromCart(props.cardIdNumber);
    }

    const removeItemFromScheduleItems = () => {
        props.removeItemFromScheduleItems(props.cardIdNumber);
    }
    const increaseServings = () => {
        props.increaseServings(props.cardIdNumber);
    }

    const decreaseServings = () => {
        props.decreaseServings(props.cardIdNumber);
    }

    return (

        <div className="card h-100" id={props.id}>

            {
                props.showCard ?
                    <Aux>
                        <a href={"/meals/" + props.meal.mealName} className="text-decoration-none "
                        >
                            <div onClick={props.clicked}>
                                <Image
                                    img={props.img}
                                    menuName="Adventurous" imgNumber="1"/>

                                <div className="card-body">

                                    <h4 className="card-title">
                                        {props.meal.mealName}
                                    </h4>

                                    <p className="card-text text-color-green">
                                        {props.meal.mealDescription}
                                    </p>

                                </div>

                                <div className="card-footer d-flex align-items-center text-muted">

                                    <ul className="wm-tags">
                                        <li className="wm-tags-time">
                                            <small className="">
                                                {props.meal.mealTimeTag}
                                            </small>
                                        </li>
                                    </ul>

                                    <ul className="wm-tags-ingredients d-flex justify-content-between mr-1 ">

                                        {mealIngredientTags.map(item => {
                                            return <li key={item} className="">
                                                <small className="text-muted">{item}</small>
                                            </li>
                                        })
                                        }

                                    </ul>

                                </div>
                            </div>
                        </a>
                        <div className="card-customize-it-btn row border-top" onClick={clicked}>
                            <div className="col-10">
                                <button type="button"
                                        className="btn-customize-it w-100 text-left pl-1"
                                >
                                    Customize It
                                </button>
                            </div>
                            <div className="col-2 d-flex justify-content-center">
                                <p className="align-self-center">></p>
                            </div>
                        </div>

                        {
                            ((new Date().getTime() > cartDate.getTime()) &&
                                !(new Date().getDay() === 0 && new Date().getHours() > 6)) ||
                            ((new Date().getTime() < cartDate.getTime()))

                                ?

                                isLoggedIn && <div className="">
                                    {
                                        showAddToCartBtn ? <div className="wm-amtc-add-to-cart">

                                                <button
                                                    type="button" className="btn-add-meal-to-cart w-100 "
                                                    onClick={addToCart}
                                                >
                                                    Add to Cart
                                                </button>
                                            </div> :

                                            <div className="wm-amtc-wrapper">

                                                <div className="wm-amtc-remove-item"
                                                     onClick={removeItem}>
                                                    <RemoveIcon/>
                                                </div>

                                                <div className="wm-amtc-servings">

                                                    <div className="wm-amtc-reduce-servings"
                                                         onClick={decreaseServings}>
                                                        <MinusIcon/>
                                                    </div>

                                                    <div className="wm-amtc-servings-text font-size-1">
                                                        {numberOfServings} Servings
                                                    </div>

                                                    <div className="wm-amtc-increase-servings"
                                                         onClick={increaseServings}><
                                                        PlusIcon/>
                                                    </div>

                                                </div>

                                            </div>
                                    }
                                    {
                                        showScheduleBtn ? <div className="wm-amtc-add-to-cart">
                                            {
                                                props.isUserSubscribed && <button
                                                    type="button" className="btn-add-meal-to-cart w-100 "
                                                    onClick={scheduleAMealHandler}>
                                                    Schedule A Meal
                                                </button>
                                            }
                                        </div> : <div className="wm-amtc-wrapper">

                                            <div className="wm-amtc-remove-item w-100 justify-content-center"
                                                 onClick={removeItemFromScheduleItems}>
                                                <RemoveIcon/> <p className="wm-amtc-remove-item">Cancel</p>
                                            </div>

                                        </div>

                                    }

                                </div> :

                                <div>
                                    <p className="text-center bg-danger py-1 text-white">Sorry! You can't order this
                                        meal!</p>
                                </div>

                        }

                    </Aux>

                    :

                    <CustomizeItCard
                        cardIdNumber={props.cardIdNumber}
                        customizeItCardOnClickHandler={props.customizeItCardOnClickHandler}
                        closeCustomizeCard={props.customizeCardClicked}
                        mealCustomizeOptions={props.mealCustomizeOptions}
                        mealName={props.meal.mealName}
                        mealMenuName={props.mealMenuName}
                    />

            }

        </div>
    )

}

export default WeeklyMenuCard;