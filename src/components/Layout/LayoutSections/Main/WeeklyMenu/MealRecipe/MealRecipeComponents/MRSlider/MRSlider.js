import React from "react";

import './MRSlider.css';

import Aux from "../../../../../../../../hoc/Auxilliary";

import IMG from "../../../../../../../../images/MealRecipe/meal1.jpg"
import PreviousIcon from "../../../WeekIcons/PreviousIcon";
import NextIcon from "../../../WeekIcons/NextIcon";

const MRSlider = () => {


    return (

        <Aux>

            <div className="mr-slider-img d-flex justify-content-center align-items-center">

                <div className="mr-icon"><PreviousIcon/></div>

                <img className={"mr-img"}
                     src={IMG}
                     alt="mr-slider"
                     width="100%"
                     height="100%"
                />

                <div className="mr-icon"><NextIcon/></div>

            </div>

        </Aux>

    )

}

export default MRSlider;