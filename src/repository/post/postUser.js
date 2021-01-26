import axios from '../../custom-axios/axios';

const postUser = {

    addUser: (newUser) => {
        return axios.post(`/api/users`, newUser,{
               headers: {
                'Content-Type': 'application/json'
            }
        });
    }

};

export default postUser;