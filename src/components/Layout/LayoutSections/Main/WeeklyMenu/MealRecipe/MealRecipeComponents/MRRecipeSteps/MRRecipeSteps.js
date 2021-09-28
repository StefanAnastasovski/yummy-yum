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
            console.log("index = " + index)
            let margin = "";

            if ((index + 1) % 2 === 0) {
                margin = "ml-4";
            } else {
                margin = "mr-4"
            }



            if (index === mealCookingSteps && (index + 1) % 2 !== 0) {
                margin = "mr-5"

                return <li key={"cs-" + index} className="row mb-5 d-flex flex-row">

                    <MRRecipeStepsCard
                        img={props.images[0].cookingStepImages[index]}
                        stepNumber={index + 1}
                        stepTitle={props.mealCookingSteps.stepTitle[0][index]}
                        stepDescription={props.mealCookingSteps.stepDescription[0][index]}
                        margin={margin}
                    />

                    <div className="col"></div>

                </li>;

            } else {
                elements.push(<MRRecipeStepsCard
                    img={props.images[0].cookingStepImages[index]}
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

            return null;

        });

        console.log(recipeSteps)


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

                    <ul className="mr-rs-s5 my-5">

                        {recipeSteps}

                    </ul>


                </div>

            </div>

        </Aux>

    )

}

export default MRRecipeSteps;