import axios from '../../custom-axios/axios';

const postForgotPassword = {

    createResetCode: (email) => {
        return axios.post(`/api/forgot-password/`, email,{
               headers: {
                'Content-Type': 'application/json'
            }
        });
    }

};

export default postForgotPassword;