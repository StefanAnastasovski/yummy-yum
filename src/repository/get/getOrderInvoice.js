import axios from '../../custom-axios/axios';

const getOrderInvoice = {

    fetchOrderInvoiceByUsernameAndOrderDate: (username, orderDate) => {
        return axios.get(`/api/order-invoice/username=${username}/order-date=${orderDate}`)
    },
    fetchOrderInvoiceByUsernameAndBetweenDates: (username, startDate, endDate) => {
        return axios.get(`/api/order-invoice/username=${username}/start-date=${startDate}&end-date=${endDate}`)
    },
    fetchOrderInvoiceByOrderId: (orderId) => {
        return axios.get(`/api/order-invoice/order-invoice/order-number=${orderId}`)
    },
    fetchOrderInvoiceByOrderDate: (orderDate) => {
        return axios.get(`/api/order-invoice/order-date=orderDate`)
    },
    fetchOrderInvoiceBetweenDates: (startDate, endDate) => {
        return axios.get(`/api/order-invoice/start-date=${startDate}&end-date=${endDate}`)
    },
    fetchOrderInvoiceByPaymentId: (paymentId) => {
        return axios.get(`/api/order-invoice/payment-number=${paymentId}`)
    },
    fetchFullOrderInvoiceByUsernameAndOrderDate: (username, orderDate) => {
        return axios.get(`/api/user-order-invoice/username=${username}/order-date=${orderDate}`)
    },
    
};

export default getOrderInvoice;