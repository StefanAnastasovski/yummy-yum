import React from "react";

import './MRSlider.css';

import Aux from "../../../../../../../../hoc/Auxilliary";

import PreviousIcon from "../../../WeekIcons/PreviousIcon";
import NextIcon from "../../../WeekIcons/NextIcon";
import MRSliderController from "./MRSliderController/MRSliderCOntroller";


const MRSlider = (props) => {

    let images = [];
    let img;

    return (

        <Aux>

            <div className="mr-slider-img d-flex justify-content-center align-items-center">

                <div className="mr-icon" onClick={props.previousImg}><PreviousIcon/></div>

                <MRSliderController />

                <div className="mr-icon" onClick={props.nextImg}><NextIcon/></div>

            </div>

        </Aux>

    )

}

export default MRSlider;