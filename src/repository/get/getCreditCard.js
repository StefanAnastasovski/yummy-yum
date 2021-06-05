import axios from '../../custom-axios/axios';

const getCreditCard = {

    fetchCreditCards: () => {
        return axios.get(`/api/credit-card`)
    },
    fetchCreditCardByName: (name) => {
        return axios.get(`/api/credit-card/name=${name}`)
    },
    fetchCreditCardByUsername: (username) => {
        return axios.get(`/api/credit-card/username/${username}`)
    },
    fetchCreditCardByCardNumber: (cardNumber) => {
        return axios.get(`/api/credit-card/card-number/${cardNumber}`)
    }

};

export default getCreditCard;