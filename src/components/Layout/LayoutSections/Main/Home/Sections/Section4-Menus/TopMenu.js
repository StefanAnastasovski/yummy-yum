import React from "react";


import Aux from "../../../../../../../hoc/Auxilliary";
import Image from "../../../WeeklyMenu/MealRecipe/MealRecipeComponents/Images/Image";

const TopMenu = (props) => {

    return (

        <Aux>

            {/*menu card #1*/}
            {
                props.menuInfo !== undefined ?
                    <div className="col">

                        <ul className="top-meals list-unstyled d-flex">
                            {
                                props.menuInfo.meals.map((item, index) => {
                                    let keyIndex = "0";

                                    let menuDate = props.menuDate.split("-");
                                    menuDate = [...menuDate].splice(1,).join("")
                                    let id = keyIndex + index.toString();
                                    menuDate = props.menuName[0] + menuDate + id;
                                    return <li key={props.menuName[0] + id.toString()}
                                               className={"col mx-1 py-1 cursor-pointer"}
                                               onClick={props.onClick.bind(this, item.mealName, menuDate)}
                                               onContextMenu={props.onClick.bind(this, item.mealName, menuDate)}
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

                                                        <h3 className="text-center card-title py-2 m-0 d-block font-size-1">
                                                            {item.mealName}
                                                        </h3>

                                                        <p className="text-color-green"> {item.mealDescription} </p>

                                                    </div>

                                                </div>

                                            </div>
                                        </a>

                                    </li>

                                })

                            }

                        </ul>
                    </div>
                    :
                    <div className="col">
                        <p className="text-danger font-size-1">Sorry!</p>
                        <p className="text-danger">
                            The menu is not available at
                            this moment.
                        </p>
                    </div>

            }


        </Aux>
    )

};

export default TopMenu;

