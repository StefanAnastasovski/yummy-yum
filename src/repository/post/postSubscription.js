import axios from '../../custom-axios/axios';

const postSubscription = {

    createSubscription: (subscriptionInfo) => {
        return axios.post(`/api/subscription`, subscriptionInfo, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }, updateSubscription: (subscriptionInfo, planName) => {
        return axios.put(`/api/subscription/subscription-plan-name=${planName}`, subscriptionInfo, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

};

export default postSubscription;