import React, {Component} from "react";

import './MRMealBox.css';

import Aux from "../../../../../../../../hoc/Auxilliary";


class MRMealBox extends Component {

    state = {
        serveNumber: "2"
    }

    render() {

        return (

            <Aux>

                <div className="mr-mb py-2 d-flex">

                    <div className="mr-mb-left col-8">

                        <h3 className="mr-mb-title d-inline">
                            In Your Box
                        </h3>
                        <span> <h5
                            className="d-inline text-color-green font-italic">(Serve {this.state.serveNumber}) </h5> </span>

                        <hr/>

                        <ul className="mr-mb-items w-75">

                            <li className="d-flex justify-content-between">

                                <li>
                                    8 oz. Crabmeat
                                </li>

                                <li>
                                    8 oz. Broccoli Florets
                                </li>

                            </li>

                            <li className="d-flex justify-content-between">

                                <li>
                                    3 oz. Sour Cream
                                </li>

                                <li>
                                    1 tsp. Chesapeake Seasoning
                                </li>

                            </li>

                            <li className="d-flex justify-content-between">

                                <li>
                                    ¼ oz. Parsley
                                </li>

                                <li>
                                    4 Saltine Crackers
                                </li>

                            </li>

                            <li className="d-flex justify-content-between">

                                <li>
                                    1 Lemon
                                </li>

                                <li>
                                    1½ tsp. Garlic Pepper
                                </li>

                            </li>

                            <li className="d-flex justify-content-between">

                                <li>
                                    1 oz. Shredded Parmesan Cheese
                                </li>

                                <li>
                                    12 oz. Red Potatoes
                                </li>

                            </li>

                        </ul>

                        <p className="mr-mb-note font-size-3 text-color-green pt-2">

                            *** Due to our just-in-time sourcing model,
                            we may have to send you a substitute ingredient.
                            Not to worry! We make sure every ingredient sent
                            to you meets our high quality standards.
                            We’ll keep you informed should a switch occur,
                            so please check the ingredient labels in your meal bag. ***

                        </p>

                    </div>

                    <div className="mr-mb-right col-4">

                        <ul className="mr-mb-meal-nutrition d-flex justify-content-center flex-column m-4">

                            <li className="mr-mb-mn-title pb-4">
                                <h4>Nutrition (per serving)</h4>
                            </li>

                            <li>

                                <p>
                                    <span>Calories</span>
                                    <span>519</span>
                                </p>

                            </li>

                            <li>

                                <p>
                                    <span>Carbohydrates</span>
                                    <span>51g</span>
                                </p>

                            </li>

                            <li>

                                <p>
                                    <span>Fat</span>
                                    <span>24g</span>
                                </p>

                            </li>

                            <li>

                                <p>
                                    <span>Protein</span>
                                    <span>34g</span>
                                </p>

                            </li>

                            <li>

                                <p>
                                    <span>Sodium</span>
                                    <span>1695mg</span>
                                </p>

                            </li>

                        </ul>

                    </div>

                </div>

            </Aux>

        )

    }

}

export default MRMealBox;