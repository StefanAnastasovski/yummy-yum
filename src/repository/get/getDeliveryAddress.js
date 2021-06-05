import axios from '../../custom-axios/axios';

const getDeliveryAddress = {

    fetchDeliveryAddressByPaymentId: (paymentId) => {
        return axios.get(`/api/delivery-address/card-number=${paymentId}`)
    },

};

export default getDeliveryAddress;