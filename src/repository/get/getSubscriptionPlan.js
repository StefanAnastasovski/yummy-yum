import axios from '../../custom-axios/axios';

const getSubscriptionPlan = {

    fetchAllSubscriptionPlans: () => {
        return axios.get(`/api/subscription-plan`)
    }, fetchSubscriptionPlanByPlanName: (planName) => {
        return axios.get(`/api/subscription-plan/name=${planName}`)
    }, fetchAllSubscriptionPlansByIsActive: (isActive) => {
        return axios.get(`/api/subscription-plan/is-active=${isActive}`)
    }
    
};

export default getSubscriptionPlan;