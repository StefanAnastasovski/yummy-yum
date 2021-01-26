import axios from '../../custom-axios/axios';

const getUser = {

    fetchUsers: () => {
        return axios.get(`/api/users`)
    },
    fetchUserByUsername: (username) => {
        return axios.get(`/api/users/username/${username}`)
    },
    fetchIsUserExist: (username) => {
        return axios.get(`/api/users/username=${username}`)
    },
    fetchUserByEmail: (email) => {
        return axios.get(`/api/users/email/${email}`)
    }

};

export default getUser;