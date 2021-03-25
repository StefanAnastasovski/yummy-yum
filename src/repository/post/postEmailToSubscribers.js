import axios from '../../custom-axios/axios';

const postEmailToSubscribers = {

    sendEmail: (emailBody) => {
        return axios.post(`/api/subscribe/email`, emailBody,{
               headers: {
                'Content-Type': 'application/json'
            }
        });
    }

};

export default postEmailToSubscribers;