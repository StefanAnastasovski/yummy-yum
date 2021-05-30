import axios from '../../custom-axios/axios';

const getOrderMeals = {

    fetchOrderMealsByOrderId: (orderId) => {
        return axios.get(`/api/order-meals/orderId=${orderId}`)
    },
};

export default getOrderMeals;