import axios from '../../custom-axios/axios';

const getImage = {

    fetchStepCookingImageByMealName: (mealName) => {
        return axios.get(`/api/images/meal-name/${mealName}`)
    },
    fetchChefImgByMealName: (mealName) => {
        return axios.get(`/api/images/meal-name/${mealName}/chef-img`)
    },
    fetchMainRecipeImageByMealName: (mealName) => {
        return axios.get(`/api/images/meal-name/${mealName}/main-recipe-img`)
    }

};

export default getImage;