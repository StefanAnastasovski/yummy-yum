import React from "react";

import './MRRecipeSteps.css';

import Aux from "../../../../../../../../hoc/Auxilliary";
import MRRecipeStepsCard from "./MRRecipeStepsCard/MRRecipeStepsCard";

const MRRecipeSteps = (props) => {

    let utensilsRow1;
    let utensilsRow2;
    let cookSteps;
    let guidelines;
    let recipeSteps;

    if (Object.keys(props.mealRecipeSteps).length > 0) {

        utensilsRow1 = props.mealRecipeSteps.mealUtensilsRow1[0].map((item, index) => {
            return <li key={"ur1-" + index}>{item}</li>
        })

        utensilsRow2 = props.mealRecipeSteps.mealUtensilsRow2[0].map((item, index) => {
            return <li key={"ur1-" + index}>{item}</li>
        })

        cookSteps = props.mealRecipeInstructions.cookSteps[0].map((item, index) => {
            return <li key={"cs-" + index}>
                <input type="checkbox" className="mr-3"/>
                <span className="mr-rs-checked">{item}</span>
            </li>
        })

        guidelines = props.mealRecipeInstructions.guidelines[0].map((item, index) => {
            return <li key={"gl-" + index}>- {item}</li>
        })

        let elements = [];
        let mealCookingSteps = props.mealCookingSteps.stepTitle[0].length - 1;

        recipeSteps = props.mealCookingSteps.stepTitle[0].map((item, index) => {

            let margin = "";

            if ((index + 1) % 2 === 0) {
                margin = "ml-4";
            } else {
                margin = "mr-4"
            }


            if (index === mealCookingSteps) {
                margin = "mr-5"

                return <li key={"cs-" + index} className="row mb-5 d-flex flex-row">

                    <MRRecipeStepsCard
                        stepNumber={index + 1}
                        stepTitle={props.mealCookingSteps.stepTitle[0][index]}
                        stepDescription={props.mealCookingSteps.stepDescription[0][index]}
                        margin={margin}
                    />

                    <div className="col"></div>

                </li>;

            } else {
                elements.push(<MRRecipeStepsCard
                    stepNumber={index + 1}
                    stepTitle={props.mealCookingSteps.stepTitle[0][index]}
                    stepDescription={props.mealCookingSteps.stepDescription[0][index]}
                    margin={margin}
                />)
            }


            if ((index + 1) % 2 === 0) {

                let pom = [...elements];
                elements = [];

                return <li key={"cs-" + index} className="row mb-5 d-flex flex-row">

                    {pom[0]}

                    {pom[1]}

                </li>;
            }

        });


    }

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
                            {utensilsRow1}
                        </ul>

                        <ul className="mr-rs-meal-utensils2 mr-rs-meal-utensils d-flex py-2 justify-content-between list-unstyled w-75 ">
                            {utensilsRow2}
                        </ul>

                    </div>

                    <div className="mr-rs-s2 py-4">

                        <h5 className="font-size-1">Before You Cook: </h5>

                        <ul className="mr-rs-meal-steps-before-cooknp py-2 list-unstyled w-75 text-color-green">
                            {cookSteps}
                        </ul>


                    </div>

                    <div className="mr-rs-s3 ">

                        <h5 className="font-size-1">Cooking Guidelines</h5>

                        <p className="text-color-green pt-3">
                            To ensure food safety, the FDA recommends the following as minimum internal cooking
                            temperatures:
                        </p>

                        <ul className="mr-rs-cooking-guidelines mt-3 list-unstyled">
                            {guidelines}
                        </ul>

                    </div>

                    {/*<div className="mr-rs-s4 my-5">*/}

                    {/*    <h5>Customize It Instructions</h5>*/}

                    {/*    <ul className="list-unstyled mr-rs-customize-it-instructions text-color-green mt-3">*/}

                    {/*        <li>*/}
                    {/*            <p className="py-2">If using <strong>chicken breasts</strong>, pat dry and*/}
                    {/*                season both sides with a pinch*/}
                    {/*                of <strong>salt</strong> and <strong>pepper</strong>. Follow same instructions as*/}
                    {/*                salmon*/}
                    {/*                in Step 3, cooking until chicken reaches minimum internal temperature, 5-7 minutes*/}
                    {/*                per*/}
                    {/*                side.*/}
                    {/*            </p>*/}
                    {/*        </li>*/}

                    {/*        <li>*/}
                    {/*            <p className="py-2">If using <strong>sirloin steaks</strong>, pat dry*/}
                    {/*                and season*/}
                    {/*                both sides with a pinch of*/}
                    {/*                salt and pepper. Follow same instructions as salmon in Step 3, cooking until steak*/}
                    {/*                reaches minimum internal temperature, 4-6 minutes per side.*/}
                    {/*            </p>*/}
                    {/*        </li>*/}

                    {/*        <li>*/}
                    {/*            <p className="py-2">If using <strong>filet mignon</strong>, pat dry and*/}
                    {/*                season*/}
                    {/*                both sides with a pinch of*/}
                    {/*                salt and pepper. Follow same instructions as salmon in Step 3, cooking until filets*/}
                    {/*                reach minimum internal temperature, 5-8 minutes per side.*/}
                    {/*            </p>*/}
                    {/*        </li>*/}

                    {/*    </ul>*/}

                    {/*</div>*/}


                    <ul className="mr-rs-s5 my-5">

                        {recipeSteps}

                    </ul>


                </div>

            </div>

        </Aux>

    )

}

export default MRRecipeSteps;