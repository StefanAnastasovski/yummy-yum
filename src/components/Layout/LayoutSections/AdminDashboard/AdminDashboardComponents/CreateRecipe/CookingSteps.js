import React from "react";

const CookingSteps = (props) => {

    return (

        <div className="row">

            <div className="col d-flex flex-column">

                <h4 className="text-center py-2">Cooking Steps</h4>

                <ul className="list-unstyled">
                    {props.cookingStepBlocks}
                </ul>

                <div className="d-flex align-items-baseline ">

                    <p className="font-size-2 pr-2">Add Cooking Step</p>
                    
                    <button type="button" className="btn-new-cook-step"
                            onClick={props.addCookingStep}>
                        +
                    </button>

                </div>

            </div>

        </div>

    )

}

export default CookingSteps;