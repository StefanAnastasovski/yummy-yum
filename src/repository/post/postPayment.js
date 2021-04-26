import axios from '../../custom-axios/axios';

const postPayment = {

    createPayment: (payment) => {
        return axios.post(`/api/payment`, payment,{
               headers: {
                'Content-Type': 'application/json'
            }
        });
    }

};

export default postPayment;