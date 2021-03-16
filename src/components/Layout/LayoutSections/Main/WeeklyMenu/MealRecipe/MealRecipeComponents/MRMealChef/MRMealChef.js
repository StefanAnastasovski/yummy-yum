import React from "react";

import './MRMealChef.css';

import Aux from "../../../../../../../../hoc/Auxilliary";
import Image from "../Images/Image";
import IMG from "../../../../../../../../images/MealRecipe/Image from iOS.jpg"
const MRMealChef = (props) => {

        return (

            <Aux>

                <div className="mr-ms d-flex py-5 align-items-baseline">

                    <div className="mr-ms-chef-info col-2">

                        <div className="mr-ms-ci-img">
                            <Image
                                // img = {props.images}
                                img={IMG}
                            />
                        </div>

                        <p className="pl-3">
                            <span className="d-block font-size-1 pt-1">Chef</span>

                            <span className="pl-2 d-block font-size-1">
                                {props.mealChef.fullName}
                            </span>
                        </p>
                        <hr className="m-0 mt-2 w-75"/>

                    </div>

                    <div className="col-10 pl-2">
                        <p>
                            {props.mealChef.chefMealDescription}
                        </p>
                    </div>


                </div>


            </Aux>

        )

}

export default MRMealChef;