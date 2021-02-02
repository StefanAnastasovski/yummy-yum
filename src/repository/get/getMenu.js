import axios from '../../custom-axios/axios';

const getMenu = {

    fetchMenuByMenuName: (menuName) => {
        return axios.get(`/api/menus/menu-name/${menuName}`)
    },
    fetchMenuByReleaseName: (releaseName) => {
        return axios.get(`/api/menus/menu-name/${releaseName}`)
    },

};

export default getMenu;