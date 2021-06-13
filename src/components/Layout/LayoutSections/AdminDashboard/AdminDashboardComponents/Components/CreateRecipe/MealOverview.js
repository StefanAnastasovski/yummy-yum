import React from "react";

const MealOverview = (props) => {

    const options = [
        {
            label: "One",
            value: "ONE",
        },
        {
            label: "Two",
            value: "TWO",
        },
        {
            label: "Three",
            value: "THREE",
        },
    ];

    let i = 1;

    return (

        <div className="row">

            <div className="col d-flex flex-column">

                <h4 className="text-center py-2">Meal Overview</h4>

                <div className="col d-flex flex-row">

                    <div className="col-4"><label>Cook Within:</label></div>
                    <div className="col-8"><input type="text"
                                                  placeholder="6"
                                                  className="w-25 px-1 text-center"
                                                  onChange={props.onChangeCookWithinValue}/><span
                        className="pl-2">days</span></div>

                </div>

                <div className="col d-flex flex-row">

                    <div className="col-4"><label>Difficulty Level:</label></div>

                    <div className="col-8">

                        <div className="dl-container" onChange={props.onChangeDifficultyLevelValue}>

                            <ul className="list-unstyled d-flex flex-row ">

                                {options.map((option) => (
                                    <li key={i++} className="pl-3"><input required type="radio" value={option.value}
                                                                          className="cursor-pointer"
                                                                          name="difficulty-level"/>
                                        <span className="pl-1">{option.label}</span>
                                    </li>

                                ))}

                            </ul>

                        </div>

                    </div>

                </div>

                <div className="col d-flex flex-row">

                    <div className="col-4"><label>Prep Cook Time:</label></div>
                    <div className="col-8"><input required
                                                  placeholder="35-45 min."
                                                  className="w-25 px-1"
                                                  type="text" onChange={props.onChangePrepCookTimeValue}/></div>

                </div>

                <div className="col d-flex flex-row">

                    <div className="col-4"><label>Spice Level:</label></div>

                    <div className="col-8">

                        <div className="dl-container" onChange={props.onChangeSpiceLevelValue}>

                            <ul className="list-unstyled d-flex flex-row">

                                {options.map((option) => (
                                    <li key={i++} className="pl-3">
                                        <input required type="radio" value={option.value}
                                               className="cursor-pointer"
                                               name="spice-level"/>
                                        <span className="pl-1">{option.label}</span>
                                    </li>
                                ))}

                            </ul>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    )

}

export default MealOverview;