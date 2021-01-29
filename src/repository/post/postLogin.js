import axios from '../../custom-axios/axios';

const postLogin = {

    createLogin: (newLogin) => {
        return axios.post(`/api/logins`, newLogin,{
               headers: {
                'Content-Type': 'application/json'
            }
        });
    }

};

export default postLogin;