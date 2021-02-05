import React, {Component} from "react";

import './MealRecipe.css';
import MRHeader from "./MealRecipeComponents/MRHeader/MRHeader";
import MRMealOverview from "./MealRecipeComponents/MRMealOverview/MRMealOverview";
import MRSlider from "./MealRecipeComponents/MRSlider/MRSlider";
import MRMealInfo from "./MealRecipeComponents/MRMealInfo/MRMealInfo";
import MRMealChef from "./MealRecipeComponents/MRMealChef/MRMealChef";
import MRMealBox from "./MealRecipeComponents/MRMealBox/MRMealBox";
import MRRecipeSteps from "./MealRecipeComponents/MRRecipeSteps/MRRecipeSteps";
import MRFooter from "./MealRecipeComponents/MRFooter/MRFooter";

import RecipeCalls from "../../../../../../repository/get/getMealRecipe"

class MealRecipe extends Component {

    state = {
        sliderIMG: "",
        mealRecipe: [],
        mealInfo: {},
        mealOverview: {},
        mealChef: {},
        mealBox: {},
        mealBoxNutrition: {},
        cookingSteps: {},
        recipeSteps: {},
        recipeInstructions: {}

    }

    async componentDidMount() {
        window.scrollTo(0, 0);

        let mealName = localStorage.getItem("mealName");

        await this.createMealRecipe(mealName);
        // console.log(this.state.mealInfo)
        // console.log(this.state.mealOverview)
        // console.log(this.state.mealChef)
        // console.log(this.state.mealBox)
        // console.log(this.state.mealBoxNutrition)
        // console.log(this.state.cookingSteps)
        // console.log(this.state.recipeSteps)
        // console.log(this.state.recipeInstructions)
    }

    createMealRecipe = async (mealName) => {

        return await RecipeCalls.fetchRecipeByMealName(mealName).then((response) => {

            let data = response.data;

            let difficultyLevel = data.mealOverview.difficultyLevel;
            let spiceLevel = data.mealOverview.spiceLevel;

            if (difficultyLevel === "ONE") {
                difficultyLevel = 1;
            } else if (difficultyLevel === "TWO") {
                difficultyLevel = 2;
            } else if (difficultyLevel === "THREE") {
                difficultyLevel = 3;
            }

            if (spiceLevel === "ONE") {
                spiceLevel = 1;
            } else if (spiceLevel === "TWO") {
                spiceLevel = 2;
            } else if (spiceLevel === "THREE") {
                spiceLevel = 3;
            }

            this.setState({
                mealInfo: {
                    mealName: data.mealName,
                    mealDescription: data.mealDescription,
                    price: data.price,
                    mealCategory: data.mealCategory,
                },
                mealOverview: {
                    difficultyLevel: difficultyLevel,
                    spiceLevel: spiceLevel,
                    prepCookTime: data.mealOverview.prepCookTime,
                    cookWithin: data.mealOverview.cookWithin
                },
                mealChef: {
                    fullName: data.mealChef.fullName,
                    chefMealDescription: data.mealChef.chefMealDescription
                },
                mealBox: {
                    serveQuantity: data.mealBox.serveQuantity,
                    mealIngredients: [data.mealBox.mealIngredients.split(" | ")]
                },
                mealBoxNutrition: {
                    calories: data.mealBoxNutrition.calories,
                    protein: data.mealBoxNutrition.protein,
                    carbohydrates: data.mealBoxNutrition.carbohydrates,
                    fat: data.mealBoxNutrition.fat
                },
                cookingSteps: {
                    stepNumber: data.cookingSteps.stepNumber,
                    stepTitle: [data.cookingSteps.stepTitle.split(" | ")],
                    stepDescription: [data.cookingSteps.stepDescription.split(" | ")]
                },
                recipeSteps: {
                    mealUtensilsRow1: [data.recipeSteps.mealUtensilsRow1.split(" | ")],
                    mealUtensilsRow2: [data.recipeSteps.mealUtensilsRow2.split(" | ")]
                },
                recipeInstructions: {
                    cookSteps: [data.recipeInstructions.cookSteps.split(" | ")],
                    guidelines: [data.recipeInstructions.guidelines.split(" | ")]
                }
            })

        }).catch(function (error) {
            console.log(error)
        });

    }


    sliderNextImg = () => {
        console.log("Next IMG")
    }

    sliderPreviousImg = () => {
        console.log("Previous IMG")
    }

    render() {


        return (

            <div className="meal-recipe-wrapper container">

                <div className="">

                    <div className="mr-header-wrapper p-3">
                        <MRHeader mealInfo={this.state.mealInfo}/>
                    </div>

                    <div className="mr-meal-overview-wrapper pb-3 px-3 w-75">
                        <MRMealOverview mealOverview={this.state.mealOverview}/>
                    </div>

                    <div className="mr-slider-wrapper">
                        <MRSlider
                            nextImg={this.sliderNextImg}
                            previousImg={this.sliderPreviousImg}
                        />
                    </div>

                    <div className="mr-meal-info-wrapper">
                        <MRMealInfo
                            // mealIngredients = {this.state.mealIngredients}
                        />
                    </div>

                    <div className="mr-meal-chef-wrapper">
                        <MRMealChef mealChef={this.state.mealChef}/>
                    </div>

                    <div className="mr-meal-box-wrapper">
                        <MRMealBox
                            mealBox={this.state.mealBox}
                            mealBoxNutrition={this.state.mealBoxNutrition}
                        />
                    </div>

                    <div className="mr-recipe-steps-wrapper ">
                        <MRRecipeSteps
                            mealRecipeSteps={this.state.recipeSteps}
                            mealCookingSteps={this.state.cookingSteps}
                            mealRecipeInstructions={this.state.recipeInstructions}
                        />
                    </div>

                    <div className="mr-recipe-footer-wrapper">
                        <MRFooter/>
                    </div>

                </div>

            </div>

        )
    }

}

export default MealRecipe;