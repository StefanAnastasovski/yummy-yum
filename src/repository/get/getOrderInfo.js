import axios from '../../custom-axios/axios';

const getOrderInfo = {

    fetchOrderInfoByOrderId: (orderId) => {
        return axios.get(`/api/order-info/orderId=${orderId}`)
    },
    fetchOrderInfoByOrderDate: (date) => {
        return axios.get(`/api/order-info/orderDate=${date}`)
    },
    fetchOrderInfoAndOrderMealsByOrderId: (orderId) => {
        return axios.get(`/api/order-info/order-meals/orderId=${orderId}`)
    }
};

export default getOrderInfo;