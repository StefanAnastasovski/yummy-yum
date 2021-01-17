import React from "react";

const RecipeSteps = (props) => {

    return (

        <div className="row">

            <div className="col d-flex flex-column">

                <h4 className="text-center py-2">Recipe Steps</h4>

                <div className="d-flex align-items-baseline py-2">

                    <p className="font-size-2 pr-2">Add New Utensil in List 1</p>

                    <button type="button" className="btn-new-utensil"
                            onClick={props.addRecipeStep} value="btn-utensils-1">
                        +
                    </button>

                </div>

                <div className="col d-flex flex-row">

                    <div className="col-3">Meal Utensils List 1:</div>

                    <ul className="list-unstyled">
                        {props.recipeStepList1}
                    </ul>

                </div>

                <div className="d-flex align-items-baseline py-2">

                    <p className="font-size-2 pr-2">Add New Utensil in List 2</p>

                    <button type="button" className="btn-new-utensil"
                            onClick={props.addRecipeStep} value="btn-utensils-2">
                        +
                    </button>

                </div>

                <div className="col d-flex flex-row">

                    <div className="col-3"><label>Meal Utensils List 2:</label></div>

                    <ul className="list-unstyled">
                        {props.recipeStepList2}
                    </ul>

                </div>

            </div>

        </div>
    )

}

export default RecipeSteps;