import axios from '../../custom-axios/axios';

const getSubscribeEmail = {

    fetchSubscribeEmails: () => {
        return axios.get(`/api/subscribe`)
    }, fetchSubscribeEmailByEmail: (email) => {
        return axios.get(`/api/subscribe/email/${email}`)
    }




};

export default getSubscribeEmail;