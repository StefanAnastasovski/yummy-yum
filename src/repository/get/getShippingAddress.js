import axios from '../../custom-axios/axios';

const getShippingAddress = {

    fetchShippingAddresses: () => {
        return axios.get(`/api/shipping-address`)
    },
    fetchShippingAddressByUsername: (username) => {
        return axios.get(`/api/shipping-address/username/${username}`)
    },
};

export default getShippingAddress;