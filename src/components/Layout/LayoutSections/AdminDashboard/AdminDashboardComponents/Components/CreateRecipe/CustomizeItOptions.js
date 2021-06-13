import React from "react";

const CustomizeItOptions = (props) => {

    return (

        <div className="row">

            <div className="col d-flex flex-column">

                <h4 className="text-center p-4">Customize It Options</h4>
                <ul className="list-unstyled">
                    {props.mealCustomizeOptionsBlocks}
                </ul>

                <div className="d-flex py-2 align-items-baseline">

                    <p className="font-size-2 pr-2">Add Customize Option</p>
                    <button type="button" id="btn-new-customize-instruction" className="btn-new-customize-instruction"
                            onClick={props.addCustomizeOptions()}
                            value="new-customize-instruction">
                        +
                    </button>

                </div>

            </div>

        </div>

    )


}

export default CustomizeItOptions;