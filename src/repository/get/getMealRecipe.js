import axios from '../../custom-axios/axios';

const getMealRecipe = {

    fetchRecipeByMealName: (mealName) => {
        return axios.get(`/api/recipe/meal-name/${mealName}`)
    }

};

export default getMealRecipe;