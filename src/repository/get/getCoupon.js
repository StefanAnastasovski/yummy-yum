import axios from '../../custom-axios/axios';

const getCoupon = {

    fetchCoupons: () => {
        return axios.get(`/api/coupon`)
    },
    fetchAllActiveCoupons: () => {
        return axios.get(`/api/coupon/active`)
    },
    fetchAllInactiveCoupons: () => {
        return axios.get(`/api/coupon/inactive`)
    },
    fetchCouponByCouponName: (couponName) => {
        return axios.get(`/api/coupon/coupon-name=${couponName}`)
    },


};

export default getCoupon;