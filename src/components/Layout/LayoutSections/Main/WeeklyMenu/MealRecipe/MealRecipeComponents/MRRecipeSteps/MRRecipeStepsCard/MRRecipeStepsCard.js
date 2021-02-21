import React from "react";


const MRRecipeStepsCard = (props) => {

    return (

        <div className={"col card meal-steps-card " + props.margin}>

            <div className="card-img">

                <img className={""}
                     src='https://i.ibb.co/6gZcZ6q/meal1.jpg'
                     alt="chef-img"
                     width="100%"
                     height="100%"
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