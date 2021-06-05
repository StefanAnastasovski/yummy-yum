import axios from '../../custom-axios/axios';

const postShippingAddress = {

    createShippingAddress: (shippingAddressInfo, username) => {
        return axios.post(`/api/shipping-address/username/${username}`, shippingAddressInfo, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },
    updateShippingAddress: (shippingAddressInfo, username) => {
        return axios.put(`/api/shipping-address/username/${username}`, shippingAddressInfo, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

};

export default postShippingAddress;