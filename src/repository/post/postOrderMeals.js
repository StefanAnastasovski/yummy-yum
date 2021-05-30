import axios from '../../custom-axios/axios';

const postOrderMeals = {

    createOrderMeals: (orderMeals, orderId) => {
        return axios.post(`/api/order-meals/orderId=${orderId}`, orderMeals,{
               headers: {
                'Content-Type': 'application/json'
            }
        });
    }

};

export default postOrderMeals;