import React from "react";



import Aux from "../../../../../../../hoc/Auxilliary";
import Image from "../../../WeeklyMenu/MealRecipe/MealRecipeComponents/Images/Image";

const TopMenu = (props) => {

    return (

        <Aux>

            {/*menu card #1*/}
            <ul className="top-meals list-unstyled d-flex">
                {
                    props.menuInfo.meals.map((item, index) => {

                        return <li key={(index + 1)} className={"col mx-1 py-1 cursor-pointer"}
                                   onClick={props.onClick.bind(this, item.mealName)}
                        >

                            <a href={"/meals/" + item.mealName}>
                                <div className={"card card-" + (index + 1)}>

                                    <div className="card-body">

                                        <div className="card-img-top">

                                            <Image className={"top-meal-" + (index + 1)}
                                                   img={item.image}
                                            />

                                        </div>

                                        <div className="card-text text-left">

                        <span className="text-center card-title py-2 m-0 text-color-green d-block font-size-1">
                            {item.mealName}
                        </span>

                                            {item.mealDescription}

                                        </div>

                                    </div>

                                </div>
                            </a>

                        </li>

                    })

                }

            </ul>


        </Aux>
    )

};

export default TopMenu;

