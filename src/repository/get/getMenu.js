import axios from '../../custom-axios/axios';

const getMenu = {

    fetchMenuByMenuName: (menuName) => {
        return axios.get(`/api/menus/menu-name/${menuName}`)
    }, fetchMenuMealBoxNutritionByMenuName: (menuName) => {
        return axios.get(`/api/menus/menu-name/${menuName}/meal-nutrition`)
    },
    fetchMenuByReleaseDate: (releaseDate) => {
        return axios.get(`/api/menus/date/${releaseDate}`)
    },

};

export default getMenu;