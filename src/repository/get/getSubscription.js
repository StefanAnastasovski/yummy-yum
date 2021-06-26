import axios from '../../custom-axios/axios';

const getSubscription = {

    fetchAllSubscriptions: () => {
        return axios.get(`/api/subscription`)
    }, fetchSubscriptionByUsername: (username) => {
        return axios.get(`/api/subscription/username=${username}`)
    }, fetchSubscriptionsBySubscriptionPlanName: (planName) => {
        return axios.get(`/api/subscription/subscription-plan-name=${planName}`)
    }, fetchSubscriptionIdBySubscriptionPlanName: (planName) => {
        return axios.get(`/api/subscription/id/subscription-plan-name=${planName}`)
    }, fetchAllSubscriptionByIsCanceled: (isCanceled) => {
        return axios.get(`/api/subscription/is-canceled=${isCanceled}`)
    }, fetchAllSubscriptionsByActivationDate: (activationDate) => {
        return axios.get(`/api/subscription/activation-date=${activationDate}`)
    }, fetchAllSubscriptionByCanceledDate: (canceledDate) => {
        return axios.get(`/api/subscription/canceled-date=${canceledDate}`)
    }

};

export default getSubscription;