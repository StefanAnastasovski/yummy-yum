import axios from '../../custom-axios/axios';

const postSubscribeEmail = {
  // {
  //       "id": 1,
  //       "subscribeDate": "2018-11-12T00:02:03.123+00:00",
  //       "email": {
  //           "email" : "subscribe@mail.com"
  //       }
  //   }
    createSubscribeEmail: (email) => {
        return axios.post(`/api/subscribe`, email,{
               headers: {
                'Content-Type': 'application/json'
            }
        });
    }

};

export default postSubscribeEmail;