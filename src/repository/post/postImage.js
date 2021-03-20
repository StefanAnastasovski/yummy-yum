import axios from '../../custom-axios/axios';

const postImage = {

    addMealImage: (image) => {
        return axios.post(`/api/images`, image, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

};

export default postImage;