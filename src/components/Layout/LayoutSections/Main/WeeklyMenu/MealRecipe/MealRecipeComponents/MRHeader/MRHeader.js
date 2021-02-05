import React from "react";

import './MRHeader.css';

import Aux from "../../../../../../../../hoc/Auxilliary";

const MRHeader = (props) => {


    return (

        <Aux>

            <div className="row d-flex flex-column">

                <div className="col">
                    <h1 className="">{props.mealInfo.mealName}</h1>
                    <h4 className="text-color-green">{props.mealInfo.mealDescription}</h4>
                </div>

                <div className="w-75">
                    <hr/>
                </div>

                <div className="col d-flex justify-content-between">

                        <div className="col">

                            <h4 className="">
                                Category:
                                <span className="text-color-green ml-5 border-bottom">
                                    {props.mealInfo.mealCategory}
                                </span>
                            </h4>

                            <h4 className="mt-3">
                                Price:
                                <span className="text-color-green ml-5 border-bottom">
                                    {props.mealInfo.price} $
                                </span>
                            </h4>

                        </div>

                        <div className="col d-flex justify-content-end">
                            <button type="button" className="btn-add-to-cart" value="Add to Cart">
                                Add to Cart
                            </button>
                        </div>

                    </div>

            </div>


        </Aux>

    )

}

export default MRHeader;