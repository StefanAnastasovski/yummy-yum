import React from "react";

import './MRMealOverview.css';

import Aux from "../../../../../../../../hoc/Auxilliary";

const MRMealOverview = () => {


    return (

        <Aux>

            <div className="row">

                <div className="mr-mo-item col">
                    <p>Prep & Cook Time: 35-45 min.</p>
                </div>

                <div className="mr-mo-item col">
                    <p>Cook Within: 7 days</p>
                </div>

            </div>

            <div className="row">

                <div className="mr-mo-item col">

                    <p>Difficulty Level:</p>
                    <div className="d-flex ml-5">

                        <p>Intermediate</p>
                        <div className="meal-indicator ml-3 w-auto h-auto d-flex align-items-center">
                            <span className="difficulty-lvl-item mr-2 d-lvl-true" />
                            <span className="difficulty-lvl-item mr-2 d-lvl-true" />
                            <span className="difficulty-lvl-item " />
                        </div>
                    </div>

                </div>

                <div className="mr-mo-item col">
                    <p>Spice Level: </p>
                    <div className="d-flex ml-5">

                        <p>Mild</p>
                        <div className="meal-indicator ml-3 w-auto h-auto d-flex align-items-center">
                            <span className="difficulty-lvl-item mr-2 d-lvl-true" />
                            <span className="difficulty-lvl-item mr-2 d-lvl-true" />
                            <span className="difficulty-lvl-item " />
                        </div>
                    </div>
                </div>

            </div>

        </Aux>

    )

}

export default MRMealOverview;