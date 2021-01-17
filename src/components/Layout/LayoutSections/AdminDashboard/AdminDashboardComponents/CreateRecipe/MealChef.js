import React from "react";

const MealChef = (props) => {

    return (

        <div className="row">

            <div className="col d-flex flex-column">

                <h4 className="text-center py-2">Chef Info & Instruction</h4>

                <div className="col d-flex flex-row">

                    <div className="col-4"><label>Full Name:</label></div>
                    <div className="col-8"><input required
                                                  placeholder="Stefan Anastasovski"
                                                  className="w-50 px-1"
                                                  type="text" onChange={props.onChangeChefFullName}/></div>

                </div>

                <div className="col d-flex flex-row">

                    <div className="col-4"><label>Chef's Meal Description:</label></div>
                    <div className="col-8">
                        <textarea required
                                  placeholder="The perfect sauce to enrobe this delicate flakey salmon."
                                  className="w-75 px-1"
                                  rows="4"
                                  type="text" onChange={props.onChangeChefDescription}/></div>

                </div>


            </div>

        </div>

    )

}

export default MealChef;