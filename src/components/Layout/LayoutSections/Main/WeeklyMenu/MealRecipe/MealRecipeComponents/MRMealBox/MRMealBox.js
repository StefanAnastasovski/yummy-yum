import React from "react";

import './MRMealBox.css';

import Aux from "../../../../../../../../hoc/Auxilliary";


const MRMealBox = (props) => {


    let array;
    let elements = [];
    let ingredientsLength;

    if (props.mealBox.mealIngredients) {

        ingredientsLength = props.mealBox.mealIngredients[0].length - 1;

        if ([props.mealBox.mealIngredients.length > 0])

            array = props.mealBox.mealIngredients[0].map((item, index) => {

                elements.push(<p>{item}</p>);

                if (index === ingredientsLength) {
                    return <li key={"ing-" + index} className="d-flex justify-content-between">

                        <span>
                            {elements[0]}
                        </span>


                    </li>;
                }


                if ((index + 1) % 2 === 0) {

                    let pom = [...elements];
                    elements = [];

                    return <li key={"ing-" + index} className="d-flex justify-content-between">

                        <span>
                            {pom[0]}
                        </span>

                        <span>
                            {pom[1]}
                        </span>

                    </li>;
                }

                return null;

            });

        array = array.filter(item => {
            return item;
        })

    }
    return (

        <Aux>

            <div className="mr-mb py-5 d-flex">

                <div className="mr-mb-left col-8">

                    <h3 className="mr-mb-title d-inline">
                        In Your Box
                    </h3>

                    <span>

                            <h5
                                className="d-inline text-color-green font-italic"> (Serve {props.mealBox.serveQuantity})
                            </h5>

                        </span>

                    <hr/>
                    <ul className="mr-mb-items w-75">

                        {array}

                    </ul>

                    <p className="mr-mb-note font-size-3 text-color-green pt-2">

                        *** Due to our just-in-time sourcing model,
                        we may have to send you a substitute ingredient.
                        Not to worry! We make sure every ingredient sent
                        to you meets our high quality standards.
                        We’ll keep you informed should a switch occur,
                        so please check the ingredient labels in your meal bag. ***

                    </p>

                </div>

                <div className="mr-mb-right col-4">

                    <ul className="mr-mb-meal-nutrition d-flex justify-content-center flex-column m-4">

                        <li className="mr-mb-mn-title pb-4">
                            <h4>Nutrition (per serving)</h4>
                        </li>

                        <li>

                            <p>
                                <span>Calories</span>
                                <span>{props.mealBoxNutrition.calories} kcal</span>
                            </p>

                        </li>

                        <li>

                            <p>
                                <span>Carbohydrates</span>
                                <span>{props.mealBoxNutrition.carbohydrates} g</span>
                            </p>

                        </li>

                        <li>

                            <p>
                                <span>Fat</span>
                                <span>{props.mealBoxNutrition.fat} g</span>
                            </p>

                        </li>

                        <li>

                            <p>
                                <span>Protein</span>
                                <span>{props.mealBoxNutrition.protein} g</span>
                            </p>

                        </li>

                    </ul>

                </div>

            </div>

        </Aux>

    )

}

export default MRMealBox;