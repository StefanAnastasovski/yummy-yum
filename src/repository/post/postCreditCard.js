import axios from '../../custom-axios/axios';

const postCreditCard = {

    createCreditCard: (creditCardInfo, username) => {
        return axios.post(`/api/credit-card/username/${username}`, creditCardInfo, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },
    updateCreditCard: (creditCardInfo, username) => {
        return axios.put(`/api/credit-card/username/${username}`, creditCardInfo, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

};

export default postCreditCard;