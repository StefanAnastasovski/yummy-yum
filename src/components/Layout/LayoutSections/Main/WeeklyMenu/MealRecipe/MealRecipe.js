import React, {Component} from "react";

import './MealRecipe.css';
import MRHeader from "./MealRecipeComponents/MRHeader/MRHeader";
import MRMealOverview from "./MealRecipeComponents/MRMealOverview/MRMealOverview";
import MRSlider from "./MealRecipeComponents/MRSlider/MRSlider";

class MealRecipe extends Component {

    state = {

    }


    render() {



        return (

            <div className="meal-recipe-wrapper">

                <div className="container">

                    <div className="mr-header p-3">
                        <MRHeader />
                    </div>

                    <div className="mr-meal-overview pb-3 px-3 w-75">
                        <MRMealOverview />
                    </div>

                    <div className="mr-slider">
                        <MRSlider />
                    </div>

                    <div className="mr-meal-info">

                    </div>

                    <div className="mr-meal-chef">

                    </div>

                    <div className="mr-meal-box">

                    </div>

                    <div className="mr-recipe-steps">

                    </div>

                </div>

            </div>

        )
    }

}

export default MealRecipe;