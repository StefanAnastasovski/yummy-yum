import React from "react";

const MealInfo = (props) => {

    return (

        <div className="row">

            <div className="col d-flex flex-column">

                <h4 className="text-center py-2">Meal Information</h4>

                <div className="col d-flex flex-row">

                    <div className="col-4"><label>Meal Name:</label></div>
                    <div className="col-8"><input required
                                                  placeholder="Honey-Ginger Salmon"
                                                  className="w-50 px-1"
                                                  type="text" onChange={props.onChangeHandleMealName}/></div>

                </div>

                <div className="col d-flex flex-row">

                    <div className="col-4"><label>Meal Description:</label></div>
                    <div className="col-8"><input required
                                                  placeholder="with roasted sweet potatoes and bok choy"
                                                  className="w-75 px-1"
                                                  type="text" onChange={props.onChangeHandleMealDescription}/></div>

                </div>

                <div className="col d-flex flex-row">

                    <div className="col-4"><label>Meal Ingredient Tag:</label></div>
                    <div className="col-8"><input required
                                                  placeholder="Eggs, Fish, Soy"
                                                  className="w-75 px-1"
                                                  type="text" onChange={props.onChangeHandleMealIngredientTag}/></div>

                </div>

                <div className="col d-flex flex-row">

                    <div className="col-4"><label>Meal Time Tag:</label></div>
                    <div className="col-8"><input required
                                                  placeholder="30-40 min."
                                                  className="w-75 px-1"
                                                  type="text" onChange={props.onChangeHandleMealTimeTag}/></div>

                </div>

                <div className="col d-flex flex-row">

                    <div className="col-4"><label>Meal Price($):</label></div>
                    <div className="col-8"><input required
                                                  defaultValue="6.99"
                                                  className="w-25 text-center" type="number" min="0"
                                                  onChange={props.onChangeHandleMealPrice}/>
                    </div>

                </div>

            </div>

        </div>

    )

}

export default MealInfo;