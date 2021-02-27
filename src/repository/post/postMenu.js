import axios from '../../custom-axios/axios';

const postMenu = {

    createMenu: (menu) => {
        return axios.post(`/api/menus`, menu,{
               headers: {
                'Content-Type': 'application/json'
            }
        });
    }

};

export default postMenu;