import React from "react";

import Image from "../MealRecipe/MealRecipeComponents/Images/Image";


const WeeklyMenuCard = (props) => {
    let mealIngredientTags = props.meal.mealIngredientTag.split(", ");
    console.log(props)
    return (


        <div className="card" id={props.id}>

            <a href={"/meals/" + props.meal.mealName} className="text-decoration-none ">
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

            <div className="card-customize-it-btn row border-top">
                <div className="col-10">
                    <button type="button" className="btn-customize-it w-100 text-left pl-1">Customize It</button>
                </div>
                <div className="col-2 d-flex justify-content-center">
                    <p className="align-self-center">></p>
                </div>
            </div>

            <div className="">
                <button type="button" className="btn-add-meal-to-cart w-100 ">Add to Cart</button>
                {/*<button type="button" className="btn-go-to-cart w-100 ">Go to Cart</button>*/}
            </div>

        </div>

    )
}

export default WeeklyMenuCard;