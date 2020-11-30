import React, {Component} from "react";

import './MRMealInfo.css';
import Aux from "../../../../../../../../hoc/Auxilliary";
import QuestionMarkIcon from "./QuestionMarkIcon/QuestionMarkIcon";


class MRMealInfo extends Component {

    state = {
        items: ["Milk", "Wheat", "Shellfish", "Soy"],
        ingredients: ""
    }

    showIngredients = () => {
        return this.state.items.join(", ");
    }

    render() {


        return (

            <Aux>

                <p className="mr-mi-ingredients font-size-1">
                    Contains:
                    <span> {this.showIngredients()}</span>
                </p>

                <div className="mr-mi-allergies-warning">

                    <div className="mr-mi-questionmark-icon">
                        <QuestionMarkIcon/>
                    </div>

                    <p className="font-size-2 font-italic pl-2 d-flex">
                        A note about serious food allergies!
                    </p>

                    <div className="allergies-warning-block">
                        <p className="aw-block">
                            All ingredients are individually packaged,
                            but our central facility is not certified allergen-free.
                            Furthermore, ingredient contents may vary. Please check recipe cards
                            and ingredient packaging for allergens and nutrition facts.
                            If you have serious allergies, please use your best judgment or
                            consult a health professional to decide if our meals are safe for you!
                            A note about serious food allergies
                        </p>

                    </div>
                </div>


            </Aux>

        )
    }

}

export default MRMealInfo;