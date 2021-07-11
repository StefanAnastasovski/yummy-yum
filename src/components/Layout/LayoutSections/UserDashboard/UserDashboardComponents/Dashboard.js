import React from "react";
import UserPersonalInformation from "./Components/UserPersonalInformation";
import UserMenuOptions from "./Components/UserMenuOptions";
import UserBillingInformation from "./Components/UserBillingInformation";
import UserShippingInformation from "./Components/UserShippingInformation";
import SubscriptionPlans from "./Components/SubscriptionPlans/SubscriptionPlans";
import Payment from "../../Main/Checkout/Payment/Payment";
import PaymentSuccessful from "../../Main/Checkout/Payment/PaymentSuccessful/PaymentSuccessful";
import OrderHistory from "./Components/OrderHistory/OrderHistory";

const Dashboard = (props) => {

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
            onChangeDeliveryTimeHandler={props.onChangeDeliveryTimeHandler}
            isSubscriptionSaved={props.isSubscriptionSaved}
            onSubmitSave={props.onSubmitSave}
            totalAmount={props.totalAmount}
            shippingCost={props.shippingCost}
            shippingCostPerServing={props.shippingCostPerServing}
            subscriptionPlanValues={props.subscriptionPlanValues}
            info={props.userComponentInfo}
            isSubscriptionExist={props.isSubscriptionExist}
            subscriptionInfo={props.subscriptionInfo}
        />
    } else if (props.userComponent === "Payment") {
        userComponent = <Payment
            isUserDashboard={true}
            onSubmitRoute={props.onSubmitRoute}
        />
    } else if (props.userComponent === "Payment Successful") {
        userComponent = <PaymentSuccessful
            isUserDashboard={true}
            onSubmitRoute={props.onSubmitRoute}
        />
    } else if (props.userComponent === "Order History") {
        console.log("I'm HERE LET ME SHOW DATA")
        console.log("props")
        console.log(props)
        userComponent = <OrderHistory
            onSubmitRoute={props.onSubmitRoute}
            filterDates={props.filterDates}
            info={props.userComponentInfo}
            allOrderMealsByDate={props.allOrderMealsByDate}
            onChangeToDateHandler={props.onChangeToDateHandler}
            onChangeFromDateHandler={props.onChangeFromDateHandler}
            onChangeNumberOfItemsPerPage={props.onChangeNumberOfItemsPerPage}
            numberOfItemsPerPage={props.numberOfItemsPerPage}
            onClickPagePerClick={props.onClickPagePerClick}
            showPages={props.showPages}
            pageSelected={props.pageSelected}
            orderMealsByPage={props.orderMealsByPage}
            onApplyCallOrderMealsQuery={props.onApplyCallOrderMealsQuery}
            showMealsByValue={props.showMealsByValue}
            onChangeShowMealsByHandler={props.onChangeShowMealsByHandler}
        />
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

                <div className="user-menu-body-title user-dashboard-title-col px-2">
                    <p>{props.userComponent}</p>
                </div>

                {userComponent}

            </div>

        </div>

    )

}

export default Dashboard;