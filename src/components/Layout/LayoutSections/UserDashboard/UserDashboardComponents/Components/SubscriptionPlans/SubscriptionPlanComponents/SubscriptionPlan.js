import React from "react";
import Aux from "../../../../../../../../hoc/Auxilliary";


const SubscriptionPlan = (props) => {

    let subscriptionPlanValues = JSON.parse(localStorage.getItem("userInformation"));

    let numberOfWeeklyMeals = Array.from(
        {length: props.selectedSubscriptionPlanValues.numberOfWeeklyMealsLimit},
        (x, i) => i + 1)
    let servingsPerMeal = Array.from(
        {length: props.selectedSubscriptionPlanValues.servingsPerMealLimit},
        (x, i) => i + 1);
    let weeklyDeliveryDay = Array.from(
        {length: props.selectedSubscriptionPlanValues.weeklyDeliveryDayLimit},
        (x, i) => i + 1);
    let weeklyDeliveryDayFields = Array.from(
        {length: subscriptionPlanValues.subscriptionPlanValues.numberOfWeeklyDeliveryDays},
        (x, i) => i + 1);

    let subscriptionType = ["Weekly", "Monthly"];
    let weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    let time = [
        "08:00 AM - 08:30 AM", "09:00 AM - 09:30 AM", "10:00 AM - 10:30 AM",
        "11:00 AM - 11:30 AM", "12:00 PM - 12:30 PM", "01:00 PM - 01:30 PM",
        "02:00 PM - 02:30 PM", "03:00 PM - 03:30 PM", "04:00 PM - 04:30 PM",
        "05:00 PM - 05:30 PM", "06:00 PM - 06:30 PM", "07:00 PM - 07:30 PM",
        "07:30 PM - 08:00 PM",
    ];

    let flexColumn = "";
    if (props.isSubscriptionExist) {
        flexColumn = " flex-column"
    }

    return (
        <Aux>
            <div className="row d-flex flex-column">

                {!props.isSubscriptionExist ? <div className="col d-flex flex-column py-3 pr-1">
                        <p>
                            Subscription Plan:
                        </p>
                        <select className="p-2 w-75"
                                name="subscription-name"
                                value={subscriptionPlanValues.subscriptionPlanValues.name}
                                onChange={props.onChangeSubscriptionPlanValuesHandler}>
                            {
                                props.info.map((item, index) => {
                                    return <option key={"subscription-plan-id-" + index}>
                                        {item.name}
                                    </option>
                                })
                            }
                        </select>
                    </div> :
                    <div className="col d-flex flex-column pt-3">
                        <div className="d-flex align-items-baseline">
                            <p className="p-2">Subscription Plan:</p>
                            <p className="text-color-green font-weight-bold">{props.subscriptionInfo.name}</p>
                        </div>
                    </div>
                }


                {
                    !props.isSubscriptionExist ? <div className={"col d-flex py-3" + flexColumn}>


                            <div className="row d-flex w-100">

                                <div className="col pr-1">
                                    <p>
                                        Number Of Weekly Meals:
                                    </p>
                                    <select className="p-2 w-100 "
                                            name="number-of-weekly-meals"
                                            value={subscriptionPlanValues.subscriptionPlanValues.numberOfWeeklyMeals}
                                            onChange={props.onChangeSubscriptionPlanValuesHandler}>
                                        {
                                            numberOfWeeklyMeals.map((item, index) => {
                                                return <option key={"number-of-weekly-meal-" + index}>
                                                    {item}
                                                </option>
                                            })
                                        }
                                    </select>

                                </div>

                                <div className="col pl-1 d-flex flex-column justify-content-between">
                                    <p className="">
                                        Servings Per Meal:
                                    </p>
                                    <select className="p-2 w-100 "
                                            name="servings-per-meal"
                                            value={subscriptionPlanValues.subscriptionPlanValues.servingsPerMeal}
                                            onChange={props.onChangeSubscriptionPlanValuesHandler}>
                                        {
                                            servingsPerMeal.map((item, index) => {
                                                return <option key={"servings-per-meal-id-" + index}>
                                                    {item}
                                                </option>
                                            })
                                        }
                                    </select>
                                </div>

                            </div>

                        </div>
                        :

                        <div className={"col d-flex pt-3" + flexColumn}>
                            <div className="d-flex align-items-baseline">
                                <p className=" p-2">Number Of Weekly Meals:</p>
                                <p className="text-color-green font-weight-bold">{props.subscriptionInfo.numberOfWeeklyMeals}</p>
                            </div>

                            <div className="d-flex align-items-baseline">
                                <p className=" p-2">Servings Per Meal:</p>
                                <p className="text-color-green font-weight-bold">{props.subscriptionInfo.servingsPerMeal}</p>
                            </div>
                        </div>
                }


                {
                    !props.isSubscriptionExist ? <div className={"col d-flex py-3" + flexColumn}>

                            <div className="col pr-1">
                                <p>
                                    Weekly Delivery Day:
                                </p>
                                <select className="col p-2"
                                        name="weekly-delivery-day"
                                        value={subscriptionPlanValues.subscriptionPlanValues.numberOfWeeklyDeliveryDays}
                                        onChange={props.onChangeSubscriptionPlanValuesHandler}>
                                    {
                                        weeklyDeliveryDay.map((item, index) => {
                                            return <option key={"weekly-delivery-day-id-" + index}>
                                                {item}
                                            </option>
                                        })
                                    }
                                </select>
                            </div>

                            <div className="col pl-1 d-flex flex-column justify-content-between">
                                <p>
                                    Subscription Type:
                                </p>
                                <select className="p-2 w-100"
                                        name="subscription-type"
                                        onChange={props.onChangeSubscriptionPlanValuesHandler}>
                                    {
                                        subscriptionType.map((item, index) => {
                                            return <option key={"subscription-type-id-" + index}>
                                                {item}
                                            </option>
                                        })
                                    }
                                </select>
                            </div>

                        </div> :
                        <div className={"col d-flex pt-3" + flexColumn}>
                            <div className="d-flex align-items-baseline">
                                <p className=" p-2">Weekly Delivery Day:</p>
                                <p className="text-color-green font-weight-bold">{props.subscriptionInfo.weeklyDeliveryDay.split("|").length}</p>
                            </div>

                            <div className="d-flex align-items-baseline">
                                <p className=" p-2">Subscription Type:</p>
                                <p className="text-color-green font-weight-bold">{props.subscriptionInfo.subscriptionType}</p>
                            </div>

                            <div className="d-flex align-items-baseline">
                                <div className="d-flex align-items-baseline">
                                    <p className=" p-2">From:</p>
                                    <p className="text-color-green font-weight-bold">{props.subscriptionInfo.activationDate}</p>
                                </div>
                                <div className="d-flex align-items-baseline">
                                    <p className=" p-2">To:</p>
                                    <p className="text-color-green font-weight-bold">{props.subscriptionInfo.canceledDate}</p>
                                </div>
                            </div>

                            <div className="d-flex align-items-baseline">
                                <p className=" p-2">Status:</p>
                                {
                                    new Date() <= new Date(props.subscriptionInfo.canceledDate.split("-")[0],
                                        props.subscriptionInfo.canceledDate.split("-")[1] - 1,
                                        props.subscriptionInfo.canceledDate.split("-")[2])
                                        ? <p className="text-color-green font-weight-bold">Active</p> :
                                        <div>
                                            <p className="text-danger">Inactive</p>
                                            <p className="font-size-2 text-danger">Time to renew your subscription</p>
                                        </div>
                                }
                            </div>
                        </div>

                }


                <div className="col d-flex py-3">

                    <div className="row w-100 p-2">
                        <div className="col">
                            <div className="col d-flex flex-row">
                                <p className="col pr-1">
                                    Weekly Delivery Days and Time:
                                </p>
                            </div>
                            {
                                !props.isSubscriptionExist ? weeklyDeliveryDayFields.map((item, indexDayField) => {
                                    // console.log(weeklyDeliveryDayFields)
                                    // console.log(subscriptionPlanValues.subscriptionPlanValues.weeklyDeliveryDays)
                                    // console.log(subscriptionPlanValues.subscriptionPlanValues.weeklyDeliveryDays[item-1])
                                        return <div className="row"
                                                    key={"weekly-delivery-day-id-" + (indexDayField + 1)}>
                                            <div className="col pr-1">
                                                <p className="text-color-green">Day #{(indexDayField + 1)}</p>
                                                <select
                                                    value={subscriptionPlanValues.subscriptionPlanValues.weeklyDeliveryDays[indexDayField]}
                                                    className="p-2 w-100"
                                                    name={"weekly-delivery-day-id-" + (indexDayField)}
                                                    onChange={props.onChangeWeeklyDeliveryDaysHandler}
                                                >
                                                    {
                                                        weekDays.map((weekDay, index) => {

                                                            return <option key={"weekly-delivery-day-id-" + index}>
                                                                {weekDay}
                                                            </option>
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div className="col align-self-end pl-1">
                                                <select className="p-2 w-100"
                                                        name={"delivery-time-id-" + indexDayField}
                                                        onChange={props.onChangeDeliveryTimeHandler}
                                                >

                                                    {
                                                        time.map((item, index) => {
                                                            return <option
                                                                key={index} value={time[index]}
                                                            >
                                                                {time[index]}
                                                            </option>
                                                        })
                                                    }

                                                </select>
                                            </div>
                                        </div>
                                    })
                                    :
                                    props.subscriptionInfo.weeklyDeliveryDay.split("|").map((item, index) => {
                                        return <div className="row"
                                                    key={"weekly-delivery-day-id-" + (index + 1)}>
                                            <div className="col d-flex">
                                                <p className="col-2 p-2 w-100">
                                                    &#9679;Day #{index + 1}:
                                                </p>
                                                <p className="col p-2 w-100 text-color-green">
                                                    {item} | {props.subscriptionInfo.weeklyDeliveryTime.split("|")[index]}
                                                </p>
                                            </div>

                                        </div>
                                    })
                            }
                        </div>

                    </div>

                </div>

                {
                    !props.isSubscriptionExist && <div className="col d-flex flex-column py-3 align-items-baseline">
                        <div className="d-flex flex-row align-items-baseline">
                            <p className="font-size-2">
                                Shipping Cost:
                            </p>
                            <p className="text-color-green font-size-2 ml-1 bg-white">
                                ${(props.shippingCost).toFixed(2)}
                            </p>
                        </div>
                        <div className="d-flex flex-row align-items-baseline">
                            <p className="font-size-2">
                                Shipping Cost Per Serving:
                            </p>
                            <p className="text-color-green font-size-2 ml-1 bg-white">
                                ${(props.shippingCostPerServing).toFixed(2)}
                            </p>
                        </div>
                        <div className="d-flex flex-row align-items-baseline">
                            <p className="font-size-2">
                                Subtotal:
                            </p>
                            <p className="text-color-green font-size-2 ml-1 bg-white">
                                ${(props.totalAmount).toFixed(2)}
                            </p>
                        </div>
                        <div className="d-flex flex-row align-items-baseline">
                            <p>
                                Total:
                            </p>
                            <p className="text-color-green ml-1 mt-1 p-2 bg-white">
                                ${(props.totalAmount + props.shippingCost).toFixed(2)}
                            </p>
                        </div>

                    </div>
                }

                {
                    !props.isSubscriptionExist ?
                        <div className="d-flex w-75 container flex-column align-items-center">
                            <div className="py-2 w-50">
                                <button type="button" className="w-100 btn-save-user-information"
                                        name="save-subscription-plan"
                                        onClick={props.onSubmitSave}>
                                    Save & Pay
                                </button>
                            </div>
                            {
                                props.isSubscriptionSaved && <div className="py-2 w-50">
                                    <button type="button" className="w-100 bg-danger btn-cancel-edit-subscription-plan"
                                            name="cancel-edit-subscription-plan"
                                            onClick={props.onSubmitSave}>
                                        Cancel
                                    </button>
                                </div>
                            }
                        </div> :
                        <div className="d-flex w-75">
                            <div className="col-6 py-2 d-flex w-50">
                                <button type="button" className=" btn-save-user-information"
                                        name="edit-subscription-plan"
                                        onClick={props.onSubmitSave}>
                                    Edit
                                </button>
                                <a className="ml-1 btn-save-user-information text-decoration-none"
                                        name="take-a-meal"
                                        href="/weekly-menu">
                                    Take a Meal
                                </a>
                            </div>
                        </div>

                }

            </div>
        </Aux>
    )

}

export default SubscriptionPlan;
