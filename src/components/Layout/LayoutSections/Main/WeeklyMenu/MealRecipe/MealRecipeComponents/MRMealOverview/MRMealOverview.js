import React from "react";

import './MRMealOverview.css';

import Aux from "../../../../../../../../hoc/Auxilliary";

const MRMealOverview = (props) => {

    let dfArray = [<li key="dl-1">
        <span className={"difficulty-lvl-item mr-2 "}/></li>,
        <li key="d-l2"><span className={"difficulty-lvl-item mr-2 "}/></li>,
        <li key="dl-3"><span className={"difficulty-lvl-item mr-2 "}/></li>
    ];

    let slArray = [<li key="sl-1">
        <span className={"difficulty-lvl-item mr-2 "}/></li>,
        <li key="sl-2"><span className={"difficulty-lvl-item mr-2 "}/></li>,
        <li key="sl-3"><span className={"difficulty-lvl-item mr-2 "}/></li>];

    let dfLevel = ["Easy", "Intermediate", "Expert"];
    let spLevel = ["Not Spicy", "Mild", "Medium", "Spicy"];

    let classNameShowLevel = "d-lvl-true";

    dfArray = dfArray.map((item, index) => {

        let span;
        if (index < props.mealOverview.difficultyLevel) {
            span = <li key={"dl-" + index} className={"difficulty-lvl-item mr-2 " + classNameShowLevel + " " + "sdf" + index + " "}>
            </li>
        } else {
            span = <li key={"dl-" + index} className={"difficulty-lvl-item mr-2 " + " " + "sdf" + index + " "}>
            </li>;
        }
        return span;
    })

    slArray = slArray.map((item, index) => {

        let span;
        if (index < props.mealOverview.spiceLevel) {
            span = <li key={"sl-" + index} className={"difficulty-lvl-item mr-2 " + classNameShowLevel + " " + "ssl" + index + " "}>
            </li>
        } else {
            span = <li key={"sl-" + index} className={"difficulty-lvl-item mr-2 " + " " + "ssl" + index + " "}>
            </li>
        }
        return span;
    })

    return (

        <Aux>

            <div className="row">

                <div className="mr-mo-item col">
                    <p>Prep & Cook Time: {props.mealOverview.prepCookTime}</p>
                </div>

                <div className="mr-mo-item col">
                    <p>Cook Within: {props.mealOverview.cookWithin} days</p>
                </div>

            </div>

            <div className="row">

                <div className="mr-mo-item col">

                    <p>Difficulty Level:</p>
                    <div className="d-flex ml-5">

                        <p>{dfLevel[props.mealOverview.difficultyLevel]}</p>

                        <ul className="list-unstyled meal-indicator ml-3 w-auto h-auto d-flex align-items-center">
                            {dfArray}
                        </ul>

                    </div>

                </div>

                <div className="mr-mo-item col">
                    <p>Spice Level: </p>
                    <div className="d-flex ml-5">

                        <p>{spLevel[props.mealOverview.spiceLevel]}</p>

                        <ul className="list-unstyled meal-indicator ml-3 w-auto h-auto d-flex align-items-center">
                            {slArray}
                        </ul>

                    </div>

                </div>

            </div>

        </Aux>

    )

}

export default MRMealOverview;