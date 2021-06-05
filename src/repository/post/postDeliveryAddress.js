import axios from '../../custom-axios/axios';

const postDeliveryAddress = {

    createDeliveryAddress: (deliveryAddressInfo, paymentId) => {
        return axios.post(`/api/delivery-address/card-number=${paymentId}`, deliveryAddressInfo,{
               headers: {
                'Content-Type': 'application/json'
            }
        });
    }

};

export default postDeliveryAddress;