import React from "react";

const CouponInfo = (props) => {

    let oldName = props.couponName;
    let edit = () => {
        props.editCoupon(props, oldName);
    }

    return (

        <div className="coupon-info row" key={props.keyEl}>
            <div className="col coupons-col d-flex justify-content-center align-items-center">
                <p className="py-2 text-color-green">
                    {props.couponName}
                </p>
            </div>
            <div className="col coupons-col d-flex justify-content-center align-items-center">
                <p className="py-2 text-color-green">
                    {props.percentageDiscount === null ? "/" : props.percentageDiscount}
                </p>
            </div>
            <div className="col coupons-col d-flex justify-content-center align-items-center">
                <p className="py-2 text-color-green">
                    {props.fixedAmountDiscount === null ? "/" : props.fixedAmountDiscount}
                </p>
            </div>
            <div className="col coupons-col d-flex justify-content-center align-items-center">
                <p className="py-2 text-color-green">
                    {props.activationDate.split("T")[0]}
                </p>
            </div>
            <div className="col coupons-col d-flex justify-content-center align-items-center">
                <p className="py-2 text-color-green">
                    {props.deactivationDate.split("T")[0]}
                </p>
            </div>
            <div className="col coupons-col d-flex justify-content-center align-items-center">
                <p className="py-2 text-color-green">
                    {props.isActive ? "YES" : "NO"}
                </p>
            </div>
            <div className="col coupons-col d-flex justify-content-center align-items-center">
                <p className="py-2 text-danger cursor-pointer" onClick={edit}>
                    Edit
                </p>
            </div>
        </div>

    )

}

export default CouponInfo;