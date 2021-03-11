import axios from '../../custom-axios/axios';

const getForgotPassword = {

    fetchResetCodeByEmail: (email) => {
        return axios.get(`/api/forgot-password/codes/email=${email}`)
    }

};

export default getForgotPassword;