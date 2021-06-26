import React from "react";
import SubscriptionPlan from "./SubscriptionPlanComponents/SubscriptionPlan";

const SubscriptionPlans = (props) => {

    console.log(props)

    return (

        <div className="user-menu-body-main col">

            <div className="container">

                {
                    props.selectedSubscriptionPlanValues ? <SubscriptionPlan
                            selectedSubscriptionPlanValues={props.selectedSubscriptionPlanValues}
                            selectedSubscriptionPlanName={props.selectedSubscriptionPlanName}
                            onChangeSubscriptionPlanValuesHandler={props.onChangeSubscriptionPlanValuesHandler}
                            onChangeWeeklyDeliveryDaysHandler={props.onChangeWeeklyDeliveryDaysHandler}
                            onChangeDeliveryTimeHandler={props.onChangeDeliveryTimeHandler}
                            isSubscriptionSaved={props.isSubscriptionSaved}
                            onSubmitSave={props.onSubmitSave}
                            totalAmount={props.totalAmount}
                            shippingCost={props.shippingCost}
                            shippingCostPerServing={props.shippingCostPerServing}
                            subscriptionPlanValues={props.subscriptionPlanValues}
                            info={props.info}
                            isSubscriptionExist={props.isSubscriptionExist}
                            subscriptionInfo={props.subscriptionInfo}
                        /> :
                        <div className="d-flex justify-content-center pt-5">
                            <p className="text-danger">
                                The Subscription is not available at this moment. Please, try later!
                            </p>
                        </div>
                }

            </div>

        </div>

    )

}

export default SubscriptionPlans;