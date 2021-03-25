import axios from '../../custom-axios/axios';

const getSubscribeEmail = {

    fetchSubscribeEmails: () => {
        return axios.get(`/api/subscribe`)
    }


};

export default getSubscribeEmail;