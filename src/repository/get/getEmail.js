import axios from '../../custom-axios/axios';

const getEmail = {

    fetchEmails: () => {
        return axios.get(`/api/emails`)
    },
    fetchIsEmailExist: (email) => {
        return axios.get(`/api/emails/email=${email}`)
    },
    fetchEmailByEmail: (email) => {
        return axios.get(`/api/emails/email/${email}`)
    },
    fetchEmailByEmailAndIsUser: (email, isUser) => {
        return axios.get(`/api/emails/email/${email}/isuser/${isUser}`)
    },
    fetchEmailByIsUser: (isUser) => {
        return axios.get(`/api/emails/user/${isUser}`)
    }

};

export default getEmail;