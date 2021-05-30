import axios from '../../custom-axios/axios';

const postOrderInfo = {

    createOrderInfo: (orderInfo) => {
        return axios.post(`/api/order-info`, orderInfo,{
               headers: {
                'Content-Type': 'application/json'
            }
        });
    }

};

export default postOrderInfo;