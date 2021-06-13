import axios from '../../custom-axios/axios';

const postSubscriptionPlan = {

    createSubscriptionPlan: (subscriptionPlanInfo) => {
        return axios.post(`/api/subscription-plan`, subscriptionPlanInfo, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }, updateSubscriptionPlan: (subscriptionPlanInfo, planName) => {
        return axios.post(`/api/subscription-plan/name=${planName}`, subscriptionPlanInfo, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

};

export default postSubscriptionPlan;