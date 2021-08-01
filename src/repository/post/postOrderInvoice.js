import axios from '../../custom-axios/axios';

const postOrderInvoice = {

    createSubscriptionOrderInovice: (username, orderId) => {
        return axios.post(`/api/order-invoice/username=${username}/orderId=${orderId}`, {}, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

};

export default postOrderInvoice;