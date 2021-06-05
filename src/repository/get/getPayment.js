import axios from '../../custom-axios/axios';

const getPayment = {

    fetchPaymentByPaymentId: (paymentId) => {
        return axios.get(`/api/payments/paymentId=${paymentId}`)
    },
    fetchPaymentByPaymentDate: (paymentDate) => {
        return axios.get(`/api/payments/date=${paymentDate}`)
    },
    fetchPaymentByUsername: (username) => {
        return axios.get(`/api/payments/username=${username}`)
    }
    
};

export default getPayment;