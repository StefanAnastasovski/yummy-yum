import React from "react";

const MealNutrition = (props) => {

    return (

        <div className="row">

            <div className="col d-flex flex-column">

                <h4 className="text-center py-2">Meal Nutrition</h4>

                <div className="col d-flex flex-row">

                    <div className="col-4"><label>Calories (kcal):</label></div>
                    <div className="col-8"><input required
                                                  className="w-25 text-center" type="number" min="0"
                                                  defaultValue="0"
                                                  onChange={props.onChangeCalories}/></div>

                </div>

                <div className="col d-flex flex-row">

                    <div className="col-4"><label>Carbohydrates(g):</label></div>
                    <div className="col-8"><input required
                                                  defaultValue="0"
                                                  className="w-25 text-center" type="number" min="0"
                                                  onChange={props.onChangeCarbohydrates}/></div>

                </div>

                <div className="col d-flex flex-row">

                    <div className="col-4"><label>Protein(g):</label></div>
                    <div className="col-8"><input required
                                                  defaultValue="0"
                                                  className="w-25 text-center" type="number" min="0"
                                                  onChange={props.onChangeProtein}/></div>

                </div>

                <div className="col d-flex flex-row">

                    <div className="col-4"><label>Fat(g):</label></div>
                    <div className="col-8"><input required
                                                  defaultValue="0"
                                                  className="w-25 text-center" type="number" min="0"
                                                  onChange={props.onChangeFat}/></div>

                </div>

            </div>

        </div>

    )

}

export default MealNutrition;