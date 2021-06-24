import React from "react";
import UserPersonalInformation from "./Components/UserPersonalInformation";
import UserMenuOptions from "./Components/UserMenuOptions";
import UserBillingInformation from "./Components/UserBillingInformation";
import UserShippingInformation from "./Components/UserShippingInformation";
import SubscriptionPlans from "./Components/SubscriptionPlans/SubscriptionPlans";

const Dashboard = (props) => {

    // let onChangeToDateHandler = (event) => {
    //     props.onChangeToDateHandler(event.target.value)
    // }
    // let onChangeFromDateHandler = (event) => {
    //     props.onChangeFromDateHandler(event.target.value)
    // }
    let userComponent = null;
    if (props.userComponent === "Personal Information") {
        userComponent = <UserPersonalInformation
            info={props.userComponentInfo}
        />
    } else if (props.userComponent === "Billing Information") {
        userComponent = <UserBillingInformation
            info={props.userComponentInfo}
            onChangeBillingInformationHandler={props.onChangeBillingInformationHandler}
            onSubmitSave={props.onSubmitSave}
        />
    } else if (props.userComponent === "Shipping Information") {
        userComponent = <UserShippingInformation
            info={props.userComponentInfo}
            onChangeShippingInformationHandler={props.onChangeShippingInformationHandler}
            onSubmitSave={props.onSubmitSave}
        />
    } else if (props.userComponent === "Subscription") {
        userComponent = <SubscriptionPlans
            selectedSubscriptionPlanName={props.selectedSubscriptionPlanName}
            selectedSubscriptionPlanValues={props.selectedSubscriptionPlanValues}
            onChangeSubscriptionPlanValuesHandler={props.onChangeSubscriptionPlanValuesHandler}
            onChangeWeeklyDeliveryDaysHandler={props.onChangeWeeklyDeliveryDaysHandler}
            isSubscriptionSaved={props.isSubscriptionSaved}
            onSubmitSave={props.onSubmitSave}
            subscriptionPlanValues={props.subscriptionPlanValues}
            info={props.userComponentInfo}
        />
    } else if (props.userComponent === "Order History") {

    }


    return (

        <div className="dashboard-wrapper px-5 pt-5">

            <div className="user-menu col-4">

                <UserMenuOptions
                    title={props.userComponent}
                    onClickChangeTitle={props.onClickChangeTitle}
                />

            </div>

            <div className="user-menu-body col-8">

                <div className="user-menu-body-title col-1">
                    <p>{props.userComponent}</p>
                </div>

                {userComponent}

            </div>

        </div>

    )

}

export default Dashboard;