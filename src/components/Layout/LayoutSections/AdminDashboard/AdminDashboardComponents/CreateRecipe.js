import React, {Component} from "react";
import MealInfo from "./CreateRecipe/MealInfo";
import MealOverview from "./CreateRecipe/MealOverview";
import MealChef from "./CreateRecipe/MealChef";
import MealBox from "./CreateRecipe/MealBox";
import MealNutrition from "./CreateRecipe/MealNutrition";
import RecipeSteps from "./CreateRecipe/RecipeSteps";
import CookingSteps from "./CreateRecipe/CookingSteps";
import MealInstructions from "./CreateRecipe/MealInstructions";

import CreateMealCalls from "../../../../../repository/post/postMeal";
import PostImage from "../../../../../repository/post/postImage";

class CreateRecipe extends Component {

    state = {

        mealInformation: {
            mealName: "",
            mealDescription: "",
            mealIngredientTag: "",
            mealTimeTag: "",
            mealPrice: 0,
            mainRecipeImages: []
        },

        mealCategory: {
            category: ""
        },

        mealOverview: {
            cookWithin: "",
            difficultyLevel: "",
            prepCookTime: "",
            spiceLevel: ""
        },

        mealChef: {
            mealChefDescription: "",
            chefFullName: "",
            chefImage: ""
        },

        mealNutrition: {
            calories: 0,
            carbohydrates: 0,
            protein: 0,
            fat: 0,
        },

        mealBox: {
            serveQuantity: 2,
            mealIngredientValues: []
        },

        recipeSteps: {
            mealUtensilsList1: [],
            mealUtensilsList2: []
        },

        cookingSteps: {
            // cookingStepValues: [],
            stepTitles: [],
            stepDescriptions: [],
            cookingStepsImages: []
        },

        mealInstructions: {
            customizeInstructions: "",
            cookSteps: [],
            guidelines: []
        },

        //Meal Information
        mainRecipeImageCounter: 1,
        mainRecipeImageElements: [],
        //meal box
        mealIngredients: [],
        ingredientNumber: 1,
        mealIngredientNumber: 0,

        //recipe steps
        recipeStepNumber1: 1,
        recipeStepList1: [],
        recipeStepNumber2: 1,
        recipeStepList2: [],

        //cooking steps
        cookingStepBlocks: [],
        cookingNumbers: [],
        cookingTitles: [],
        cookingDescriptions: [],
        cookingStepNumber: 1,

        //MealInstructions
        mealInstructionCookStepNumber: 1,
        mealInstructionGuidelineNumber: 1,
        mealInstructionCustomizeInstructionNumber: 1,
        mealInstructionCookSteps: [],
        mealInstructionGuidelines: [],
        mealInstructionCustomizeInstructions: []

    }

    onChangeHandleMealName = (event) => {
        let value = event.target.value;
        this.setState(prevState => ({
            mealInformation: {                   // object that we want to update
                ...prevState.mealInformation,    // keep all other key-value pairs
                mealName: value   // update the value of specific key
            }
        }))
    }

    onChangeHandleMealDescription = (event) => {
        let value = event.target.value;
        this.setState(prevState => ({
            mealInformation: {                   // object that we want to update
                ...prevState.mealInformation,    // keep all other key-value pairs
                mealDescription: value   // update the value of specific key
            }
        }))
    }

    onChangeHandleMealIngredientTag = (event) => {
        let value = event.target.value;
        this.setState(prevState => ({
            mealInformation: {                   // object that we want to update
                ...prevState.mealInformation,    // keep all other key-value pairs
                mealIngredientTag: value   // update the value of specific key
            }
        }))
    }

    onChangeHandleMealTimeTag = (event) => {
        let value = event.target.value;
        this.setState(prevState => ({
            mealInformation: {                   // object that we want to update
                ...prevState.mealInformation,    // keep all other key-value pairs
                mealTimeTag: value   // update the value of specific key
            }
        }))
    }

    onChangeHandleMealPrice = (event) => {
        let value = parseFloat(event.target.value);
        this.setState(prevState => ({
            mealInformation: {                   // object that we want to update
                ...prevState.mealInformation,    // keep all other key-value pairs
                mealPrice: value   // update the value of specific key
            }
        }))
    }

    onChangeDifficultyLevelValue = (event) => {
        let value = event.target.value;
        this.setState(prevState => ({
            mealOverview: {                   // object that we want to update
                ...prevState.mealOverview,    // keep all other key-value pairs
                difficultyLevel: value   // update the value of specific key
            }
        }))
    }

    onChangeSpiceLevelValue = (event) => {
        let value = event.target.value;
        this.setState(prevState => ({
            mealOverview: {                   // object that we want to update
                ...prevState.mealOverview,    // keep all other key-value pairs
                spiceLevel: value   // update the value of specific key
            }
        }))
    }

    onChangeCookWithinValue = (event) => {
        let value = parseInt(event.target.value);
        this.setState(prevState => ({
            mealOverview: {                   // object that we want to update
                ...prevState.mealOverview,    // keep all other key-value pairs
                cookWithin: value   // update the value of specific key
            }
        }))
    }

    onChangePrepCookTimeValue = (event) => {
        let value = event.target.value;
        this.setState(prevState => ({
            mealOverview: {                   // object that we want to update
                ...prevState.mealOverview,    // keep all other key-value pairs
                prepCookTime: value   // update the value of specific key
            }
        }))
    }

    onChangeChefDescription = (event) => {
        let value = event.target.value;
        this.setState(prevState => ({
            mealChef: {                   // object that we want to update
                ...prevState.mealChef,    // keep all other key-value pairs
                mealChefDescription: value   // update the value of specific key
            }
        }))
    }

    onChangeChefFullName = (event) => {
        let value = event.target.value;
        this.setState(prevState => ({
            mealChef: {                   // object that we want to update
                ...prevState.mealChef,    // keep all other key-value pairs
                chefFullName: value   // update the value of specific key
            }
        }))
    }

    onChangeCalories = (event) => {
        let value = parseFloat(event.target.value);
        this.setState({
            mealNutrition: {                   // object that we want to update
                ...this.state.mealNutrition,    // keep all other key-value pairs
                calories: value  // update the value of specific key
            }
        })
    }

    onChangeCarbohydrates = (event) => {
        let value = parseFloat(event.target.value);
        this.setState(prevState => ({
            mealNutrition: {                   // object that we want to update
                ...prevState.mealNutrition,    // keep all other key-value pairs
                carbohydrates: value   // update the value of specific key
            }
        }))
    }

    onChangeProtein = (event) => {
        let value = parseFloat(event.target.value);
        this.setState(prevState => ({
            mealNutrition: {                   // object that we want to update
                ...prevState.mealNutrition,    // keep all other key-value pairs
                protein: value   // update the value of specific key
            }
        }))
    }

    onChangeFat = (event) => {
        let value = parseFloat(event.target.value);
        this.setState(prevState => ({
            mealNutrition: {                   // object that we want to update
                ...prevState.mealNutrition,    // keep all other key-value pairs
                fat: value   // update the value of specific key
            }
        }))
    }

    onChangeMealCategory = (event) => {

        this.setState(prevState => ({
            mealCategory: {                   // object that we want to update
                ...prevState.mealCategory,    // keep all other key-value pairs
                category: event.target.value   // update the value of specific key
            }
        }))

    }

    //-----------------------------------------------------------------------------
    //-----------------------------------Meal Information----------------------------------

    addMainRecipeImageField = () => {

        let mainRecipeImg = <li key={this.state.mainRecipeImageCounter + 1}>

            <div className="col d-flex flex-row">

                <div className="col-4"><label>Main Recipe Image's URL
                    #{(this.state.mainRecipeImageCounter + 1)}:</label>
                </div>
                <div className="col-8"><input type="text"
                                              required
                                              className="w-75 px-1"
                                              id={"main-recipe-img-" + (this.state.mainRecipeImageCounter + 1)}
                                              placeholder="https://example.com/example/"
                                              onChange={this.onChangeAddMainRecipeImage.bind(this)}
                />
                </div>

            </div>

        </li>;

        let mainRecipeImages = [...this.state.mainRecipeImageElements];
        mainRecipeImages.push(mainRecipeImg);

        this.setState(prevState => ({
            mainRecipeImageCounter: (prevState.mainRecipeImageCounter + 1),
            mainRecipeImageElements: mainRecipeImages
        }))

    }

    onChangeAddMainRecipeImage = (event) => {

        let value = event.target.value;
        let index = event.target.id;
        index = parseInt(index.split("-")[3]) - 1;

        let mainRecipeImages = {...this.state.mealInformation}.mainRecipeImages;

        this.addMainRecipeImage(index, value, mainRecipeImages);

    }

    addMainRecipeImage = (index, value, mainRecipeObj) => {

        mainRecipeObj[index] = value;

        this.setState(prevState => ({
            mealInformation: {
                ...prevState.mealInformation,
                mainRecipeImages: mainRecipeObj
            }
        }))

    }

    //-----------------------------------------------------------------------------
    //-----------------------------------Meal Chef----------------------------------

    onChangeChefImageHandler = (event) => {
        this.setState(prevState => ({
            mealChef: {
                ...prevState.mealChef,
                chefImage: event.target.value
            }
        }))
    }

    //-----------------------------------------------------------------------------
    //-----------------------------------Meal Box----------------------------------

    addMealIngredient = () => {

        let mealIngredient = <li key={this.state.ingredientNumber + 1}>

            <div className="col d-flex border-top pt-2">

                <div className="col-4"><label>Meal Ingredient #{this.state.ingredientNumber + 1}:</label></div>

                <div className="col-8">
                    <input required type="text"
                           className="w-75 px-1"
                           id={"meal-ingredient-" + (this.state.ingredientNumber + 1)}
                           onChange={this.onChangeAddElementInMealBoxOrRecipeSteps.bind(this)}/>
                </div>

            </div>

        </li>

        let stateList = [...this.state.mealIngredients];
        stateList.push(mealIngredient);

        this.setState(prevState => ({
            mealIngredients: stateList,
            ingredientNumber: prevState.ingredientNumber + 1
        }))

    }

    onChangeServeQuantity = (event) => {
        let value = event.target.value;
        this.setState(prevState => ({
            mealBox: {                   // object that we want to update
                ...prevState.mealBox,    // keep all other key-value pairs
                serveQuantity: value  // update the value of specific key
            }
        }))
    }

    //--------------------------------------------------------------------------------
    // handleValues in meal ingredient, meal utensils 1, meal utensils 2

    onChangeAddElementInMealBoxOrRecipeSteps = (event) => {

        let element = event.target.id.toString();

        let value = event.target.value;
        let index = event.target.id;

        index = parseInt(index.split("-")[2]) - 1;

        let addElement;

        if (element.includes("meal-ingredient")) {

            addElement = {...this.state.mealBox}.mealIngredientValues;
            addElement[index] = value;

            this.setState(prevState => ({
                ...prevState.mealBox,
                mealIngredientValues: addElement
            }))

        } else if (element.includes("meal-utensils1")) {

            addElement = {...this.state.recipeSteps}.mealUtensilsList1;
            addElement[index] = value;

            this.setState(prevState => ({
                ...prevState.recipeSteps,
                mealUtensilsList1: addElement
            }))

        } else if (element.includes("meal-utensils2")) {

            addElement = {...this.state.recipeSteps}.mealUtensilsList2;
            addElement[index] = value;

            this.setState(prevState => ({
                ...prevState.recipeSteps,
                mealUtensilsList2: addElement
            }))

        }

    }

    //--------------------------------------------------------------------------------
    //------------------------------Recipe Steps--------------------------------------

    addRecipeStep = (event) => {

        if (event.target.value === "btn-utensils-1") {

            let recipeStep = <li key={this.state.recipeStepNumber1 + 1}>

                <div className="col d-flex flex-row">

                    <div className="col-3"><label>Meal Utensil #{this.state.recipeStepNumber1}:</label></div>
                    <div className="col-9"><textarea id={"meal-utensils1-" + (this.state.recipeStepNumber1)}
                                                     className="w-100 px-1"
                                                     onChange={this.onChangeAddElementInMealBoxOrRecipeSteps}/></div>

                </div>

            </li>

            let stateList = [...this.state.recipeStepList1];
            stateList.push(recipeStep);

            this.setState(prevState => ({
                recipeStepList1: stateList,
                recipeStepNumber1: prevState.recipeStepNumber1 + 1
            }))

        } else if (event.target.value === "btn-utensils-2") {

            let recipeStep = <li key={this.state.recipeStepNumber2 + 1}>

                <div className="col d-flex flex-row">

                    <div className="col-3"><label>Meal Utensil #{this.state.recipeStepNumber2}:</label></div>
                    <div className="col-9"><textarea id={"meal-utensils2-" + (this.state.recipeStepNumber2)}
                                                     className="w-100 px-1"
                                                     onChange={this.onChangeAddElementInMealBoxOrRecipeSteps}/></div>

                </div>

            </li>

            let stateList = [...this.state.recipeStepList2];
            stateList.push(recipeStep);

            this.setState(prevState => ({
                recipeStepList2: stateList,
                recipeStepNumber2: prevState.recipeStepNumber2 + 1
            }))

        }

    }

    //--------------------------------------------------------------------------------------
    //------------------------------Cooking Steps-------------------------------------------

    addCookingStep = () => {

        let cookingStep = <li key={this.state.cookingStepNumber + 1}>

            <div className="col d-flex flex-column pb-2">

                <div className="col d-flex flex-row">

                    <div className="col-4"><label>Step Number #{this.state.cookingStepNumber + 1}:</label></div>
                    <div className="col-8">
                        <span id={"cooking-step-number-" + (this.state.cookingStepNumber + 1)}
                              className="font-weight-bold bg-white px-5 py-1">
                            {this.state.cookingStepNumber + 1}
                        </span>
                    </div>

                </div>

                <div className="col d-flex flex-row">

                    <div className="col-4"><label>Step Title #{this.state.cookingStepNumber + 1}:</label></div>
                    <div className="col-8"><input required type="text"
                                                  className="w-75 px-1"
                                                  id={"cooking-step-title-" + (this.state.cookingStepNumber + 1)}
                                                  onChange={this.onChangeAddElementInCookingStep}/></div>

                </div>

                <div className="col d-flex flex-row">

                    <div className="col-4"><label>Step Description #{this.state.cookingStepNumber + 1}:</label></div>
                    <div className="col-8"><textarea required
                                                     rows="5"
                                                     className="w-75 px-1"
                                                     id={"cooking-step-description-" + (this.state.cookingStepNumber + 1)}
                                                     onChange={this.onChangeAddElementInCookingStep}/></div>

                </div>

                <div className="col d-flex flex-row">

                    <div className="col-4"><label>Cooking Step Image's URL
                        #{(this.state.cookingStepNumber + 1)}:</label>
                    </div>
                    <div className="col-8"><input type="text"
                                                  required
                                                  className="w-75 px-1"
                                                  id={"cooking-step-imgurl-" + (this.state.cookingStepNumber + 1)}
                                                  placeholder="https://example.com/example/"
                                                  onChange={this.onChangeAddElementInCookingStep}/></div>

                </div>

            </div>

        </li>

        let cookingStepValue = {
            stepNumber: (this.state.cookingStepNumber + 1),
            stepTitles: "",
            stepDescriptions: "",
            cookingStepsImages: ""
        }
        let cookingStepValues = {...this.state.cookingSteps};
        cookingStepValues.stepTitles.push(cookingStepValue.stepTitles);
        cookingStepValues.stepDescriptions.push(cookingStepValue.stepDescriptions);
        cookingStepValues.cookingStepsImages.push(cookingStepValue.cookingStepsImages);

        let stateList = [...this.state.cookingStepBlocks];
        stateList.push(cookingStep);

        this.setState(prevState => ({
            cookingStepBlocks: stateList,
            cookingStepNumber: (prevState.cookingStepNumber + 1),
            cookingSteps: {
                ...prevState.cookingSteps,
                stepTitles: cookingStepValues.stepTitles,
                stepDescriptions: cookingStepValues.stepDescriptions,
                cookingStepsImages: cookingStepValues.cookingStepsImages
            }
        }))


    }

    // function to populate cooking steps state
    addElementInCookingStep = (index, value, cookingStepObj, element) => {

        if (element.includes("step-title")) {
            let stepTitles = [...cookingStepObj.stepTitles];
            stepTitles[index] = value;
            cookingStepObj = {
                stepTitles: stepTitles,
                stepDescriptions: cookingStepObj.stepDescriptions,
                cookingStepsImages: cookingStepObj.cookingStepsImages
            }
        } else if (element.includes("step-description")) {
            let stepDescriptions = [...cookingStepObj.stepDescriptions];
            stepDescriptions[index] = value;
            cookingStepObj = {
                stepTitles: cookingStepObj.stepTitles,
                stepDescriptions: stepDescriptions,
                cookingStepsImages: cookingStepObj.cookingStepsImages
            }
        } else if (element.includes("step-imgurl")) {
            let cookingStepsImages = [...cookingStepObj.cookingStepsImages];
            cookingStepsImages[index] = value;
            cookingStepObj = {
                stepTitles: cookingStepObj.stepTitles,
                stepDescriptions: cookingStepObj.stepDescriptions,
                cookingStepsImages: cookingStepsImages
            }
        }

        this.setState(prevState => ({
            // cookingStepNumber: cookingStepObj.stepNumber,
            cookingSteps: {
                ...prevState.cookingSteps,
                stepTitles: cookingStepObj.stepTitles,
                stepDescriptions: cookingStepObj.stepDescriptions,
                cookingStepsImages: cookingStepObj.cookingStepsImages
            }
        }))

    }

    onChangeAddElementInCookingStep = (event) => {

        let element = event.target.id.toString();

        let value = event.target.value;
        let index = event.target.id;
        index = parseInt(index.split("-")[3]) - 1;

        let cookingStepObj = {...this.state.cookingSteps};

        if (element.includes("step-title")) {
            this.addElementInCookingStep(index, value, cookingStepObj, "step-title");
        } else if (element.includes("step-description")) {
            this.addElementInCookingStep(index, value, cookingStepObj, "step-description");
        } else if (element.includes("step-imgurl")) {
            this.addElementInCookingStep(index, value, cookingStepObj, "step-imgurl");
        }

    }

    //--------------------------------------------------------------------------------------
    //------------------------------Meal Instructions-------------------------------------------

    addMealInstruction = (event) => {

        let newElement;
        let newList;
        if (event.target.id === "btn-new-cook-step") {

            newElement = <li key={this.state.mealInstructionCookStepNumber + 1}>

                <div className="col d-flex flex-row align-items-center">

                    <div className="col-2">
                        <label>Cook Step #{this.state.mealInstructionCookStepNumber + 1}</label>
                    </div>
                    <div className="col-10"><textarea required
                                                      id={"instruction-cook-step-" +
                                                      (this.state.mealInstructionCookStepNumber + 1)}
                                                      onChange={this.onChangeAddElementInMealInstruction}
                                                      className="w-50 px-1"/></div>

                </div>

            </li>

            newList = [...this.state.mealInstructionCookSteps];
            newList.push(newElement);

            this.setState(prevState => ({
                ...prevState.mealInstructionCookSteps,
                mealInstructionCookSteps: newList,
                mealInstructionCookStepNumber: this.state.mealInstructionCookStepNumber + 1
            }))

        } else if (event.target.id === "btn-new-guideline") {

            newElement = <li key={this.state.mealInstructionGuidelineNumber + 1}>

                <div className="col d-flex flex-row align-items-center">

                    <div className="col-2">
                        <label>Guideline #{this.state.mealInstructionGuidelineNumber + 1}</label>
                    </div>
                    <div className="col-10"><textarea required
                                                      id={"instruction-guideline-" +
                                                      (this.state.mealInstructionGuidelineNumber + 1)}
                                                      onChange={this.onChangeAddElementInMealInstruction}
                                                      className="w-50 px-1"/></div>

                </div>

            </li>

            newList = [...this.state.mealInstructionGuidelines];
            newList.push(newElement);

            this.setState(prevState => ({
                ...prevState.mealInstructionGuidelines,
                mealInstructionGuidelines: newList,
                mealInstructionGuidelineNumber: this.state.mealInstructionGuidelineNumber + 1
            }))

        } else if (event.target.id === "btn-new-customize-instruction") {
            newElement = <li
                key={this.state.mealInstructionCustomizeInstructionNumber + 1}>

                <div className="col d-flex flex-row align-items-center justify-content-center">

                    <div className="col-2">
                        <label>Customize Instruction #{this.state.mealInstructionCustomizeInstructionNumber + 1}</label>
                    </div>
                    <div className="col-7"><textarea required
                                                     id={"instruction-customize-instruction-" +
                                                     (this.state.mealInstructionCustomizeInstructionNumber + 1)}
                                                     onChange={this.onChangeAddElementInMealInstruction}
                                                     rows="5" className="w-100 px-1"/>
                    </div>

                </div>

            </li>

            newList = [...this.state.mealInstructionCustomizeInstructions];
            newList.push(newElement);

            this.setState(prevState => ({
                ...prevState.mealInstructionCustomizeInstructions,
                mealInstructionCustomizeInstructions: newList,
                mealInstructionCustomizeInstructionNumber: this.state.mealInstructionCustomizeInstructionNumber + 1
            }))
        }

    }

    //function to get meal instruction index from element's id
    getMealInstructionIndex = (index) => {

        if (index.split("-").length === 2) {
            index = parseInt(index.split("-")[3]) - 1;
        } else if (index.split("-").length === 3) {
            index = parseInt(index.split("-")[2]) - 1;
        } else if (index.split("-").length === 4) {
            index = parseInt(index.split("-")[3]) - 1;
        }

        return index;

    }

    onChangeAddElementInMealInstruction = (event) => {

        let element = event.target.id.toString();

        let value = event.target.value;
        let index = event.target.id;
        index = this.getMealInstructionIndex(index);
        let addElement;
        if (element.includes("customize-instruction")) {
            addElement = {...this.state.mealInstructions}

            addElement.customizeInstructions[index] = value;
            this.setState(prevState => ({
                ...prevState.mealInstructions.customizeInstructions,
                customizeInstructions: addElement
            }))
        } else if (element.includes("guideline")) {
            addElement = {...this.state.mealInstructions}

            addElement.guidelines[index] = value;
            this.setState(prevState => ({
                ...prevState.mealInstructions.guidelines,
                guidelines: addElement
            }))

        } else if (element.includes("cook-step")) {
            addElement = {...this.state.mealInstructions}

            addElement.cookSteps[index] = value;
            this.setState(prevState => ({
                ...prevState.mealInstructions.cookSteps,
                cookSteps: addElement
            }))

        }


    }

    //---------------------------------------------------------------------------------------

    componentDidMount() {

        let mealIngredientsList = [...this.state.mealIngredients, <li key={this.state.ingredientNumber}>

            <div className="col d-flex ">

                <div className="col-4"><label>Meal Ingredient #{this.state.ingredientNumber}:</label></div>
                <div className="col-8"><input
                    id={"meal-ingredient-" + (this.state.ingredientNumber)}
                    placeholder="1 tsp. Minced Ginger"
                    className="w-75 px-1"
                    type="text"
                    onChange={this.onChangeAddElementInMealBoxOrRecipeSteps.bind(this)}/></div>

            </div>

        </li>];

        let recipeStepsList1 = [...this.state.recipeStepList1, <li key={this.state.recipeStepNumber1}>

            <div className="col d-flex flex-row">

                <div className="col-3"><label>Meal Utensil #1:</label></div>
                <div className="col-9"><textarea id={"meal-utensils1-" + (this.state.recipeStepNumber1)}
                                                 placeholder="Olive Oil"
                                                 className="w-100 px-1"
                                                 onChange={this.onChangeAddElementInMealBoxOrRecipeSteps}/></div>

            </div>

        </li>];

        let recipeStepsList2 = [...this.state.recipeStepList2, <li key={this.state.recipeStepNumber2}>

            <div className="col d-flex flex-row">

                <div className="col-3"><label>Meal Utensil #1:</label></div>
                <div className="col-9"><textarea id={"meal-utensils2-" + (this.state.recipeStepNumber2)}
                                                 placeholder="Baking Sheet"
                                                 className="w-100 px-1"
                                                 onChange={this.onChangeAddElementInMealBoxOrRecipeSteps}/></div>

            </div>

        </li>]

        let cookingStepBlocks = [...this.state.cookingStepBlocks,
            <li key={this.state.cookingStepNumber} className="row">

                <div className="col d-flex flex-column pb-2">

                    <div className="col d-flex flex-row">

                        <div className="col-4"><label>Step Number #{this.state.cookingStepNumber}:</label></div>
                        <div className="col-8">
                            <span id={"cooking-step-number-" + this.state.cookingStepNumber}
                                  className="font-weight-bold bg-white px-5 py-1">
                                {this.state.cookingStepNumber}
                            </span>
                        </div>

                    </div>

                    <div className="col d-flex flex-row">

                        <div className="col-4"><label>Step Title #{this.state.cookingStepNumber}:</label></div>
                        <div className="col-8"><input type="text"
                                                      required
                                                      placeholder="Roast the Sweet Potatoes"
                                                      className="w-75 px-1"
                                                      id={"cooking-step-title-" + this.state.cookingStepNumber}
                                                      onChange={this.onChangeAddElementInCookingStep}/></div>

                    </div>

                    <div className="col d-flex flex-row">

                        <div className="col-4"><label>Step Description #{this.state.cookingStepNumber}:</label></div>
                        <div className="col-8"><textarea required rows="5"
                                                         placeholder="Quarter sweet potato and cut into ½ pieces.
                                                         Place sweet potato pieces on prepared baking sheet
                                                         and toss with 2 tsp. olive oil, ¼ tsp. salt, and ¼ tsp. pepper.
                                                         Massage oil and seasoning into potatoes.
                                                         Spread into a single layer and roast in hot oven until tender,
                                                         18-20 minutes. While sweet potato roasts, prepare ingredients."
                                                         className="w-75 px-1"
                                                         id={"cooking-step-description-" + this.state.cookingStepNumber}
                                                         onChange={this.onChangeAddElementInCookingStep}/></div>

                    </div>

                    <div className="col d-flex flex-row">

                        <div className="col-4"><label>Cooking Step Image's URL #{this.state.cookingStepNumber}:</label>
                        </div>
                        <div className="col-8"><input type="text"
                                                      placeholder="https://example.com/example/"
                                                      required
                                                      className="w-75 px-1"
                                                      id={"cooking-step-imgurl-" + this.state.cookingStepNumber}
                                                      onChange={this.onChangeAddElementInCookingStep}/></div>

                    </div>

                </div>

            </li>];

        let cookingStepValue = {
            stepNumber: this.state.cookingStepNumber,
            stepTitles: "",
            stepDescriptions: "",
            cookingStepsImages: ""
        }

        let cookingStepValues = {...this.state.cookingSteps};

        cookingStepValues.stepTitles.push(cookingStepValue.stepTitles);
        cookingStepValues.stepDescriptions.push(cookingStepValue.stepDescriptions);
        cookingStepValues.cookingStepsImages.push(cookingStepValue.cookingStepsImages);

        let mealInstructionCookSteps = [...this.state.mealInstructionCookSteps,
            <li key={this.state.mealInstructionCookStepNumber}>

                <div className="col d-flex flex-row align-items-center">

                    <div className="col-2"><label>Cook Step #{this.state.mealInstructionCookStepNumber}</label></div>
                    <div className="col-10"><textarea required
                                                      id={"instruction-cook-step-" +
                                                      this.state.mealInstructionCookStepNumber}
                                                      placeholder="Preheat oven to 425 degree"
                                                      onChange={this.onChangeAddElementInMealInstruction}
                                                      className="w-50 px-1"/>
                    </div>

                </div>

            </li>]

        let mealInstructionGuidelines = [...this.state.mealInstructionGuidelines, <li
            key={this.state.mealInstructionGuidelineNumber}>

            <div className="col d-flex flex-row align-items-center">

                <div className="col-2"><label>Guideline #{this.state.mealInstructionGuidelineNumber}</label></div>
                <div className="col-10"><textarea required
                                                  id={"instruction-guideline-" +
                                                  this.state.mealInstructionGuidelineNumber}
                                                  placeholder="Steak and Pork 145° F (rest cooked meat, 3 minutes)"
                                                  onChange={this.onChangeAddElementInMealInstruction}
                                                  className="w-50 px-1"/>
                </div>

            </div>

        </li>]

        let mealInstructionCustomizeInstructions = [...this.state.mealInstructionCustomizeInstructions, <li
            key={this.state.mealInstructionCustomizeInstructionNumber}>

            <div className="col d-flex flex-row align-items-center justify-content-center">

                <div className="col-2">
                    <label>Customize Instruction #{this.state.mealInstructionCustomizeInstructionNumber}</label>
                </div>
                <div className="col-7"><textarea required
                                                 id={"instruction-customize-instruction-" +
                                                 this.state.mealInstructionCustomizeInstructionNumber}
                                                 placeholder="If using chicken breasts, pat dry and season both
                                                 sides with a pinch of salt and pepper.
                                                 Follow same instructions as salmon in Step #,
                                                 cooking until chicken reaches minimum internal temperature,
                                                 8-10 minutes per side."
                                                 rows="5" className="w-100 px-1"
                                                 onChange={this.onChangeAddElementInMealInstruction}/>
                </div>

            </div>

        </li>]

        let mainRecipeImg = [...this.state.mainRecipeImageElements,
            <li key={this.state.mainRecipeImageCounter}>

                <div className="col d-flex flex-row">

                    <div className="col-4"><label>Main Recipe Image's URL
                        #{(this.state.mainRecipeImageCounter)}:</label>
                    </div>
                    <div className="col-8"><input type="text"
                                                  required
                                                  className="w-75 px-1"
                                                  id={"main-recipe-img-" + (this.state.mainRecipeImageCounter)}
                                                  placeholder="https://example.com/example/"
                                                  onChange={this.onChangeAddMainRecipeImage}
                    />
                    </div>

                </div>

            </li>]

        // const price = parseFloat(document.getElementById('mealPrice').value);
        let price = 6.99;

        this.setState(prevState => ({
            mealIngredients: mealIngredientsList,
            recipeStepList1: recipeStepsList1,
            recipeStepList2: recipeStepsList2,
            recipeStepNumber1: prevState.recipeStepNumber1 + 1,
            recipeStepNumber2: prevState.recipeStepNumber2 + 1,
            cookingStepBlocks: cookingStepBlocks,
            mainRecipeImageElements: mainRecipeImg,
            cookingSteps: {
                stepTitles: cookingStepValues.stepTitles,
                stepDescriptions: cookingStepValues.stepDescriptions,
                cookingStepsImages: cookingStepValues.cookingStepsImages
            },
            mealInformation: {
                ...this.state.mealInformation,
                mealPrice: price
            },
            mealInstructionCookSteps: mealInstructionCookSteps,
            mealInstructionGuidelines: mealInstructionGuidelines,
            mealInstructionCustomizeInstructions: mealInstructionCustomizeInstructions
        }))

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        // let mealImages;
        //
        // mealImages = {
        //     mainRecipeImages: this.state.mealInformation.mainRecipeImages,
        //     chefImage: this.state.mealChef.chefImage,
        //     cookingStepImages: this.state.cookingSteps.cookingStepsImages
        // }

        let mealCategory = {
            mealCategory: this.state.mealCategory
        }
        console.log(mealCategory)

    //     let meal = {
    //         mealName: this.state.mealInformation.mealName,
    //         mealDescription: this.state.mealInformation.mealDescription,
    //         mealIngredientTag: this.state.mealInformation.mealIngredientTag,
    //         mealTimeTag: this.state.mealInformation.mealTimeTag,
    //         mealPrice: this.state.mealInformation.mealPrice,
    //         cookWithin: this.state.mealOverview.cookWithin,
    //         difficultyLevel: this.state.mealOverview.difficultyLevel,
    //         prepCookTime: this.state.mealOverview.prepCookTime,
    //         spiceLevel: this.state.mealOverview.spiceLevel,
    //         mealChefDescription: this.state.mealChef.mealChefDescription,
    //         chefFullName: this.state.mealChef.chefFullName,
    //         calories: this.state.mealNutrition.calories,
    //         carbohydrates: this.state.mealNutrition.carbohydrates,
    //         protein: this.state.mealNutrition.protein,
    //         fat: this.state.mealNutrition.fat,
    //         serveQuantity: this.state.mealBox.serveQuantity,
    //         mealIngredientValues: this.state.mealBox.mealIngredientValues.join(" | "),
    //         mealUtensilsList1: this.state.recipeSteps.mealUtensilsList1.join(" | "),
    //         mealUtensilsList2: this.state.recipeSteps.mealUtensilsList2.join(" | "),
    //         cookingStepValues: this.state.cookingSteps.cookingStepValues,
    //         cookingSteps: this.state.cookingSteps,
    //         customizeInstructions: this.state.mealInstructions.customizeInstructions,
    //         mealInstructionCookSteps: this.state.mealInstructions.cookSteps.join(" | "),
    //         mealInstructionGuidelines: this.state.mealInstructions.guidelines.join(" | ")
    //     }
    //
    //
    //
    //
    }

    //---------------------------------------------------------------------------------------

    handleSubmit = async (event) => {

        event.preventDefault();

        let obj;

        let stepTitles = this.state.cookingSteps.stepTitles.join(" | ");
        let stepDescriptions = this.state.cookingSteps.stepDescriptions.join(" | ");

        obj = {

            mealName: this.state.mealInformation.mealName,
            mealDescription: this.state.mealInformation.mealDescription,
            mealTimeTag: this.state.mealInformation.mealTimeTag,
            mealIngredientTag: this.state.mealInformation.mealIngredientTag,
            price: this.state.mealInformation.mealPrice,
            mealCategory: {
                category: "Adventurous"
            },
            mealOverview: {
                difficultyLevel: this.state.mealOverview.difficultyLevel,
                spiceLevel: this.state.mealOverview.spiceLevel,
                prepCookTime: this.state.mealOverview.prepCookTime,
                cookWithin: this.state.mealOverview.cookWithin
            },
            mealChef: {
                fullName: this.state.mealChef.chefFullName,
                chefMealDescription: this.state.mealChef.mealChefDescription
            },
            mealBox: {
                serveQuantity: this.state.mealBox.serveQuantity,
                mealIngredients: this.state.mealBox.mealIngredientValues.join(" | ")
            },
            mealBoxNutrition: {
                calories: this.state.mealNutrition.calories,
                protein: this.state.mealNutrition.protein,
                carbohydrates: this.state.mealNutrition.carbohydrates,
                fat: this.state.mealNutrition.fat
            },
            cookingSteps: {
                stepNumber: 1,
                stepTitle: stepTitles,
                stepDescription: stepDescriptions
            },
            recipeSteps: {
                mealUtensilsRow1: this.state.recipeSteps.mealUtensilsList1.join(" | "),
                mealUtensilsRow2: this.state.recipeSteps.mealUtensilsList2.join(" | ")
            },
            recipeInstructions: {
                cookSteps: this.state.mealInstructions.cookSteps.join(" | "),
                guidelines: this.state.mealInstructions.guidelines.join(" | "),
                customizeInstructions: this.state.mealInstructions.customizeInstructions
            }

        }

        await CreateMealCalls.createMeal(obj).then(response => {
            console.log("Meal is created!");
        }).catch(error => {
            console.log(error);
        })

        let images = [
            {mainRecipeImages: this.state.mealInformation.mainRecipeImages},
            {chefImage: this.state.mealChef.chefImage},
            {cookingStepsImages: this.state.cookingSteps.cookingStepsImages}
        ]

        images.forEach((item, index) => {
            if (index === 0) {
                let image;
                for (let counter = 0; counter < item.mainRecipeImages.length; counter++) {
                    image = {
                        url: item.mainRecipeImages[counter],
                        alt: this.state.mealInformation.mealName,
                        isChefImg: false,
                        isMainRecipeImg: true,
                        cookingStep: 9999,
                        meal: {
                            mealName: this.state.mealInformation.mealName
                        }
                    }
                    PostImage.addMealImage(image).then(response => {
                    }).catch(error => {
                        console.log(error)
                    })
                }
            } else if (index === 2) {
                let image;
                for (let counter = 0; counter < item.cookingStepsImages.length; counter++) {
                    image = {
                        url: item.cookingStepsImages[counter],
                        alt: this.state.mealInformation.mealName,
                        isChefImg: false,
                        isMainRecipeImg: false,
                        cookingStep: (counter + 1),
                        meal: {
                            mealName: this.state.mealInformation.mealName
                        }
                    }
                    PostImage.addMealImage(image).then(response => {
                    }).catch(error => {
                        console.log(error)
                    })
                }
            } else {
                let image = {
                    url: item.chefImage.toString(),
                    alt: this.state.mealInformation.mealName.toString(),
                    isChefImg: true,
                    isMainRecipeImg: false,
                    cookingStep: 9999,
                    meal: {
                        mealName: this.state.mealInformation.mealName.toString()
                    }
                }
                PostImage.addMealImage(image).then(response => {
                }).catch(error => {
                    console.log(error)
                })
            }
        })


    }

    render() {

        return (

            <div className="create-recipe-wrapper py-5">

                <div className="button-go-back-to-dashboard">
                    <input type="button" className="btn-go-back-to-dashboard"
                           value="<< Go Back to Dashboard" onClick={this.props.onSubmitRoute}/>
                </div>

                <div className="cr-meal py-3 ">

                    <form onSubmit={this.handleSubmit}>

                        <div className="row">

                            <div className="col left-row d-flex flex-column">

                                <div className="col"><MealInfo
                                    addMainRecipeImageField={this.addMainRecipeImageField}
                                    mainRecipeImageElements={this.state.mainRecipeImageElements}
                                    mealInformation={this.state.mealInformation}
                                    onChangeHandleMealName={this.onChangeHandleMealName}
                                    onChangeHandleMealDescription={this.onChangeHandleMealDescription}
                                    onChangeHandleMealIngredientTag={this.onChangeHandleMealIngredientTag}
                                    onChangeHandleMealTimeTag={this.onChangeHandleMealTimeTag}
                                    onChangeHandleMealPrice={this.onChangeHandleMealPrice}
                                    onChangeMealCategory={this.onChangeMealCategory}
                                /></div>

                                <div className="col"><MealChef
                                    onChangeChefDescription={this.onChangeChefDescription.bind(this)}
                                    onChangeChefFullName={this.onChangeChefFullName.bind(this)}
                                    onChangeChefImageHandler={this.onChangeChefImageHandler.bind(this)}
                                /></div>

                                <div className="col"><MealNutrition
                                    onChangeCalories={this.onChangeCalories.bind(this)}
                                    onChangeCarbohydrates={this.onChangeCarbohydrates.bind(this)}
                                    onChangeProtein={this.onChangeProtein.bind(this)}
                                    onChangeFat={this.onChangeFat.bind(this)}
                                /></div>

                                <div className="col"><RecipeSteps
                                    onChangeAddElementInMealBoxOrRecipeSteps={this.onChangeAddElementInMealBoxOrRecipeSteps.bind(this)}
                                    addRecipeStep={this.addRecipeStep}
                                    recipeStepNumber1={this.state.recipeStepNumber1}
                                    recipeStepList1={this.state.recipeStepList1}
                                    recipeStepNumber2={this.state.recipeStepNumber2}
                                    recipeStepList2={this.state.recipeStepList2}
                                />
                                </div>

                            </div>

                            <div className="col right-row d-flex flex-column">

                                <div className="col"><MealOverview
                                    onChangeDifficultyLevelValue={this.onChangeDifficultyLevelValue.bind(this)}
                                    onChangeSpiceLevelValue={this.onChangeSpiceLevelValue.bind(this)}
                                    onChangeCookWithinValue={this.onChangeCookWithinValue.bind(this)}
                                    onChangePrepCookTimeValue={this.onChangePrepCookTimeValue.bind(this)}
                                /></div>

                                <div className="col"><MealBox
                                    mealIngredients={this.state.mealIngredients}
                                    addMealIngredient={this.addMealIngredient}
                                    onChangeServeQuantity={this.onChangeServeQuantity.bind(this)}
                                    onChangeAddElementInMealBoxOrRecipeSteps={() => this.onChangeAddElementInMealBoxOrRecipeSteps.bind(this)}
                                    serveQuantity={this.state.mealBox.serveQuantity}
                                /></div>

                                <div className="col"><CookingSteps
                                    cookingStepBlocks={this.state.cookingStepBlocks}
                                    addCookingStep={this.addCookingStep.bind(this)}
                                /></div>

                            </div>

                        </div>

                        <div className="row">

                            <div className="col left-row d-flex flex-column">

                                <div className="col"><MealInstructions
                                    mealInstructionNumber={this.state.mealInstructionNumber}
                                    mealInstructionCookSteps={this.state.mealInstructionCookSteps}
                                    mealInstructionGuidelines={this.state.mealInstructionGuidelines}
                                    addMealInstruction={() => this.addMealInstruction.bind(this)}
                                    // mealInstructionCustomizeInstructions=
                                    //     {this.state.mealInstructionCustomizeInstructions}
                                />
                                </div>

                            </div>

                        </div>

                        <div className="row d-flex justify-content-center pt-4">
                            <button className="w-25 btn-meal" type="submit">Create Meal!</button>
                        </div>

                    </form>

                </div>

            </div>

        )

    }

}

export default CreateRecipe;