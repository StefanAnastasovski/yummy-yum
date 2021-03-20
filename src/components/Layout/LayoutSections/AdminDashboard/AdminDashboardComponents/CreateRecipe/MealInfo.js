import React from "react";

const MealInfo = (props) => {

    const options = [
        {
            label: "Adventurous",
            value: "Adventurous",
        },
        {
            label: "Quick and Simple",
            value: "Quick and Simple",
        },
        {
            label: "Low-Cal",
            value: "Low-Cal",
        },
        {
            label: "Carb-Conscious",
            value: "Carb-Conscious",
        },
        {
            label: "Vegetarian",
            value: "Vegetarian",
        },
    ];

    let i = 1;

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

                <div className="col d-flex meal-category-container py-3" onChange={props.onChangeMealCategory}>

                    <div className="col-4"><label>Meal Description:</label></div>
                    <ul className="col-8 list-unstyled d-flex flex-column ">

                        {options.map((option) => (
                            <li key={i++} className="pl-3"><input required
                                                                  type="radio" value={option.value}
                                                                  className="cursor-pointer"
                                                                  name="meal-category"/>
                                <span className="pl-3">{option.label}</span>
                            </li>


                        ))}

                    </ul>

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
                                                  id="mealPrice"
                                                  className="w-25 text-center" type="number" min="0"
                                                  defaultValue="6.99"
                                                  step="0.01"
                                                  onChange={props.onChangeHandleMealPrice}/>
                    </div>

                </div>

                <div className="col d-flex flex-row">

                    <ul className="list-unstyled flex-grow-1">
                        {props.mainRecipeImageElements}
                    </ul>

                </div>

                <div className="d-flex align-items-baseline ">

                    <p className="font-size-2 pr-2">Add Main Recipe Image</p>

                    <button type="button" className="btn-new-main-recipe-img"
                            onClick={props.addMainRecipeImageField}>
                        +
                    </button>

                </div>

            </div>

        </div>

    )

}

export default MealInfo;