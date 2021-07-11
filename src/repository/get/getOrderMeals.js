import axios from '../../custom-axios/axios';

const getOrderMeals = {

    fetchOrderMealsByOrderId: (orderId) => {
        return axios.get(`/api/order-meals/orderId=${orderId}`)
    },
    fetchOrderMealsBetweenDatesAndIsSubscription: (startDate, endDate, isSubscription) => {
        return axios.get(`/api/order-meals/subscription/startDate=${startDate}&endDate=${endDate}/subscription=${isSubscription}`)
    }, fetchOrderMealsBetweenDates: (startDate, endDate) => {
        return axios.get(`/api/order-meals/subscription/startDate=${startDate}&endDate=${endDate}`)
    },
};

export default getOrderMeals;