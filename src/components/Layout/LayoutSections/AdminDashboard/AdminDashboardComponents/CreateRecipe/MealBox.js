import React from "react";

const MealBox = (props) => {

    return (

        <div className="row">

            <div className="col d-flex flex-column">

                <h4 className="text-center py-2">Meal Box Information</h4>

                <div className="col d-flex flex-row">

                    <div className="col-4"><label>Serve Quantity:</label></div>
                    <div className="col-8"><input required
                                                  defaultValue={props.serveQuantity}
                                                  className="w-25 text-center" type="number"
                                                  min="1" max="8"
                                                  onChange={props.onChangeServeQuantity}/></div>

                </div>

                <ul className="list-unstyled">

                    {props.mealIngredients}

                </ul>

                <div className="d-flex align-items-baseline py-2">

                    <p className="font-size-2 pr-2">Add Meal Ingredient</p>

                    <button type="button" id="btn-new-ingredient"
                            onClick={props.addMealIngredient}>
                        +
                    </button>

                </div>

            </div>

        </div>

    )


}

export default MealBox;