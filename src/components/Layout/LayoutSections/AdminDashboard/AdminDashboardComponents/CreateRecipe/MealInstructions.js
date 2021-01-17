import React from "react";

const MealInstructions = (props) => {


    return (

        <div className="row d-flex flex-column">

            <div className="row text-center">

                <div className="col py-3">
                    <h4 className="text-center py-2">Meal Instructions</h4>
                </div>


            </div>

            <div className="col d-flex flex-column">

                <ul className="list-unstyled">
                    {props.mealInstructionCustomizeInstructions}
                </ul>

                <div className="d-flex py-2 align-items-baseline">

                    <p className="font-size-2 pr-2">Add Customize Instruction</p>
                    <button type="button" id="btn-new-customize-instruction" className="btn-new-customize-instruction"
                            onClick={props.addMealInstruction()}
                            value="new-customize-instruction">
                        +
                    </button>

                </div>

            </div>

            <div className="col d-flex flex-row align-items-center pt-2">

                <div className="col d-flex flex-column">

                    <ul className="list-unstyled">
                        {props.mealInstructionCookSteps}
                    </ul>


                    <div className="d-flex py-2 align-items-baseline">

                        <p className="font-size-2 pr-2">Add Cook Step</p>
                        <button type="button" id="btn-new-cook-step" className="btn-new-cook-step"
                                onClick={props.addMealInstruction()}
                                value="new-cook-step">
                            +
                        </button>

                    </div>

                </div>

                <div className="col d-flex flex-column">

                    <ul className="list-unstyled">
                        {props.mealInstructionGuidelines}
                    </ul>

                    <div className="d-flex py-2 align-items-baseline">

                        <p className="font-size-2 pr-2 border-bottom">Add Guideline</p>
                        <button type="button" id="btn-new-guideline"
                                onClick={props.addMealInstruction()}
                                value="new-guideline">
                            +
                        </button>

                    </div>

                </div>

            </div>

        </div>

    )

}

export default MealInstructions;