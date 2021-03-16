import React from "react";

import './MRSlider.css';

import Aux from "../../../../../../../../hoc/Auxilliary";

import PreviousIcon from "../../../WeekIcons/PreviousIcon";
import NextIcon from "../../../WeekIcons/NextIcon";
import Image from "../Images/Image";


const MRSlider = (props) => {

    return (

        <Aux>

            <div className="mr-slider-img d-flex justify-content-center align-items-center">

                <div className="mr-icon" onClick={props.previousImg}><PreviousIcon/></div>

                <Image
                    img={props.images}
                />

                <div className="mr-icon" onClick={props.nextImg}><NextIcon/></div>

            </div>

        </Aux>

    )

}

export default MRSlider;