import axios from '../../custom-axios/axios';

const postPayment = {

    createPayment: (paymentInfo) => {
        return axios.post(`/api/payments`, paymentInfo,{
               headers: {
                'Content-Type': 'application/json'
            }
        });
    }

};

export default postPayment;