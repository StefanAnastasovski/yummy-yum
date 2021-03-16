import axios from '../../custom-axios/axios';

const postImage = {

    addMainRecipeImage: (image) => {
        return axios.post(`/api/images`, image, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },
    addMealChefImage: (image) => {
        return axios.post(`/api/images`, image, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },
    addStepCookingImage: (image) => {
        return axios.post(`/api/images`, image, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

};

export default postImage;