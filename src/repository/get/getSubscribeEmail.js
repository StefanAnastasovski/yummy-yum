import axios from '../../custom-axios/axios';

const getSubscribeEmail = {

    fetchSubscribeEmails: () => {
        return axios.get(`/api/subscribes`)
    }


};

export default getSubscribeEmail;