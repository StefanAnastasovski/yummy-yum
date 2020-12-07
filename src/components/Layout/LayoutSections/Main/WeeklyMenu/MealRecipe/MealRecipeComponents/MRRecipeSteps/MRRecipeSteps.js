import React from "react";

import './MRRecipeSteps.css';

import Aux from "../../../../../../../../hoc/Auxilliary";
import MRRecipeStepsCard from "./MRRecipeStepsCard/MRRecipeStepsCard";

const MRRecipeSteps = () => {


    return (

        <Aux>

            <div className="mr-rs py-5">

                <div className="container d-flex flex-column">

                    <h3>Recipe Steps</h3>

                    <span>
                        <hr className="w-75 float-left clearfix"/>
                    </span>

                    <div className="mr-rs-s1 py-3">

                        <h5 className="font-size-1">You Will Need </h5>

                        <ul className="mr-rs-meal-utensils1 mr-rs-meal-utensils d-flex py-2 justify-content-between list-unstyled w-75 ">
                            <li>Olive Oil</li>
                            <li>Salt</li>
                            <li>Pepper</li>
                            <li>Cooking Spray</li>
                        </ul>

                        <ul className="mr-rs-meal-utensils2 mr-rs-meal-utensils d-flex py-2 justify-content-between list-unstyled w-75 ">
                            <li>1 Medium Non-Stick Pan</li>
                            <li>1 Baking Sheet</li>
                            <li>2 Mixing Bowls</li>
                            <li>1 Large Non-Stick Pan</li>
                        </ul>

                    </div>

                    <div className="mr-rs-s2 py-4">

                        <h5 className="font-size-1">Before You Cook: </h5>

                        <ul className="mr-rs-meal-steps-before-cook py-2 list-unstyled w-75 text-color-green">
                            <li>
                                <input type="checkbox" className="mr-3"/>
                                <span className="mr-rs-checked">Preheat oven to 425 degrees</span>
                            </li>
                            <li>
                                <input type="checkbox" className="mr-3"/>
                                <span
                                    className="mr-rs-checked">If using any fresh produce, thoroughly rinse and pat dry</span>
                            </li>
                            <li>
                                <input type="checkbox" className="mr-3"/>
                                <span
                                    className="mr-rs-checked">Prepare a baking sheet with foil and cooking spray</span>
                            </li>
                        </ul>


                    </div>

                    <div className="mr-rs-s3 ">

                        <h5 className="font-size-1">Cooking Guidelines</h5>

                        <p className="text-color-green pt-3">
                            To ensure food safety, the FDA recommends the following as minimum internal cooking
                            temperatures:
                        </p>

                        <ul className="mr-rs-cooking-guidelines mt-3 list-unstyled">
                            <li>Steak and Pork 145° F (rest cooked meat, 3 minutes)</li>
                            <li>Seafood 145° F</li>
                            <li>Chicken 165° F</li>
                            <li>Ground Beef 160° F</li>
                            <li>Ground Turkey 165° F</li>
                            <li>Ground Pork 160° F</li>
                        </ul>

                    </div>

                    <div className="mr-rs-s4 my-5">

                        <h5>Customize It Instructions</h5>

                        <ul className="list-unstyled mr-rs-customize-it-instructions text-color-green mt-3">

                            <li>
                                <p className="py-2">If using <strong>chicken breasts</strong>, pat dry and
                                    season both sides with a pinch
                                    of <strong>salt</strong> and <strong>pepper</strong>. Follow same instructions as
                                    salmon
                                    in Step 3, cooking until chicken reaches minimum internal temperature, 5-7 minutes
                                    per
                                    side.
                                </p>
                            </li>

                            <li>
                                <p className="py-2">If using <strong>sirloin steaks</strong>, pat dry
                                    and season
                                    both sides with a pinch of
                                    salt and pepper. Follow same instructions as salmon in Step 3, cooking until steak
                                    reaches minimum internal temperature, 4-6 minutes per side.
                                </p>
                            </li>

                            <li>
                                <p className="py-2">If using <strong>filet mignon</strong>, pat dry and
                                    season
                                    both sides with a pinch of
                                    salt and pepper. Follow same instructions as salmon in Step 3, cooking until filets
                                    reach minimum internal temperature, 5-8 minutes per side.
                                </p>
                            </li>

                        </ul>

                    </div>


                    <div className="mr-rs-s5 my5">

                        <div className="row mb-5">

                            <MRRecipeStepsCard/>
                            <MRRecipeStepsCard/>


                        </div>

                        <div className="row mb-5">

                            <MRRecipeStepsCard/>
                            <MRRecipeStepsCard/>

                        </div>

                        <div className="row mb-5">

                            <MRRecipeStepsCard/>
                            <MRRecipeStepsCard/>

                        </div>

                    </div>


                </div>

            </div>

        </Aux>

    )

}

export default MRRecipeSteps;