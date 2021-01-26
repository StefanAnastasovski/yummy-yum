import axios from '../../custom-axios/axios';

const postUser = {

    addUser: (newEmail) => {
        return axios.post(`/api/email`, newEmail,{
               headers: {
                'Content-Type': 'application/json'
            }
        });
    }

};

export default postUser;