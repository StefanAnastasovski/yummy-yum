import axios from '../../custom-axios/axios';

const getPayment = {

    fetchPayments: () => {
        return axios.get(`/api/payment`)
    },
    fetchPaymentsByName: (name) => {
        return axios.get(`/api/payment/name=${name}`)
    },
    fetchPaymentsByDate: (date) => {
        return axios.get(`/api/payment/date/${date}`)
    }

};

export default getPayment;