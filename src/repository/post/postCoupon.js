import axios from '../../custom-axios/axios';

const postCoupon = {

    createCoupon: (couponInfo) => {
        return axios.post(`/api/coupon`, couponInfo, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },
    updateCoupon: (couponInfo, couponName) => {
        return axios.put(`/api/coupon/coupon-name=${couponName}`, couponInfo, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

};

export default postCoupon;