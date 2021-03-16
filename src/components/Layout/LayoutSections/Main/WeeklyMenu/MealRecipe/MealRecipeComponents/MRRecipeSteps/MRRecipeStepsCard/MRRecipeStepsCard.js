import React from "react";
import Image from "../../Images/Image";


const MRRecipeStepsCard = (props) => {

    return (

        <div className={"col card meal-steps-card " + props.margin}>

            <div className="card-img">

                <Image
                    img = {props.img}
                />

            </div>

            <div className="card-body">

                <h5>{props.stepNumber}. {props.stepTitle}</h5>

                <p className="py-2 text-color-green">
                    {props.stepDescription}
                </p>


            </div>

        </div>


    )

}

export default MRRecipeStepsCard;