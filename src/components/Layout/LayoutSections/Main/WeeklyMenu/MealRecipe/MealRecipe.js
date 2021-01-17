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

class MealRecipe extends Component {

    state = {
        sliderIMG: ""
    }

    componentDidMount() {
        window.scrollTo(0, 0);
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
                        <MRHeader/>
                    </div>

                    <div className="mr-meal-overview-wrapper pb-3 px-3 w-75">
                        <MRMealOverview/>
                    </div>

                    <div className="mr-slider-wrapper">
                        <MRSlider
                            nextImg={this.sliderNextImg}
                            previousImg={this.sliderPreviousImg}
                        />
                    </div>

                    <div className="mr-meal-info-wrapper">
                        <MRMealInfo/>
                    </div>

                    <div className="mr-meal-chef-wrapper">
                        <MRMealChef/>
                    </div>

                    <div className="mr-meal-box-wrapper">
                        <MRMealBox/>
                    </div>

                    <div className="mr-recipe-steps-wrapper ">
                        <MRRecipeSteps/>
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