import React from "react";

const SubscriptionPlanInfo = (props) => {

    let oldName = props.subscriptionPlan;
    let edit = () => {
        props.editSubscriptionPlan(props, oldName);
    }

    return (

        <div className="coupon-info row" key={props.keyEl}>
            <div className="col coupons-col d-flex justify-content-center align-items-center">
                <p className="py-2 text-color-green">
                    {props.subscriptionPlan}
                </p>
            </div>
            <div className="col coupons-col d-flex justify-content-center align-items-center">
                <p className="py-2 text-color-green">
                    {props.numberOfWeeklyMeals}
                </p>
            </div>
            <div className="col coupons-col d-flex justify-content-center align-items-center">
                <p className="py-2 text-color-green">
                    {props.servingsPerMeal}
                </p>
            </div>
            <div className="col coupons-col d-flex justify-content-center align-items-center">
                <p className="py-2 text-color-green">
                    {props.weeklyDeliveryDay}
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

export default SubscriptionPlanInfo;