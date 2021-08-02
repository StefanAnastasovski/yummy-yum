import React from "react";

const SubscriptionInfo = (props) => {

    return (

        <div className="subscription-info d-flex row" key={props.keyEl}>
            {/*<div className="col subscription-info-col d-flex justify-content-center align-items-center">*/}
            {/*    <p className="py-2 text-color-green">*/}
            {/*        {props.fullName}*/}
            {/*    </p>*/}
            {/*</div>*/}
            {/*<div className="col subscription-info-col d-flex justify-content-center align-items-center">*/}
            {/*    <p className="py-2 text-color-green">*/}
            {/*        {props.username}*/}
            {/*    </p>*/}
            {/*</div>*/}
            <div className="col subscription-info-col d-flex justify-content-center align-items-center">
                <p className="py-2 text-color-green">
                    {props.numberOfWeeklyMeals}
                </p>
            </div>
            <div className="col subscription-info-col d-flex justify-content-center align-items-center">
                <p className="py-2 text-color-green">
                    {props.servingsPerMeal}
                </p>
            </div>
            <div className="col subscription-info-col d-flex justify-content-center align-items-center">
                <p className="py-2 text-color-green">
                    {props.weeklyDeliveryDays}
                </p>
            </div>
            <div className="col subscription-info-col d-flex justify-content-center align-items-center">
                <p className="py-2 text-color-green">
                    {props.weeklyDeliveryTime}
                </p>
            </div>
            <div className="col subscription-info-col d-flex justify-content-center align-items-center">
                <p className="py-2 text-color-green">
                    {props.subscriptionType}
                </p>
            </div>
            <div className="col subscription-info-col d-flex justify-content-center align-items-center">
                <p className="py-2 text-color-green">
                    {props.activationDate}
                </p>
            </div>
            <div className="col subscription-info-col d-flex justify-content-center align-items-center">
                <p className="py-2 text-color-green">
                    {props.cancellationDate}
                </p>
            </div>
            <div className="col subscription-info-col d-flex justify-content-center align-items-center">
                <p className="py-2 text-color-green">
                    {props.isCanceled ? "YES" : "NO"}
                </p>
            </div>
        </div>

    )

}

export default SubscriptionInfo;