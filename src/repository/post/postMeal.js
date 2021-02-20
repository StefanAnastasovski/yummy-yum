import axios from '../../custom-axios/axios';

const postMeal = {

    createMeal: (newMeal) => {
        return axios.post(`/api/meals`, newMeal,{
               headers: {
                'Content-Type': 'application/json'
            }
        });
    }

};

export default postMeal;