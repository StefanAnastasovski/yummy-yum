import React from "react";

const SubscriptionPlans = (props) => {


    // let components =


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
        {length: props.subscriptionPlanValues.numberOfWeeklyDeliveryDays},
        (x, i) => i + 1);

    let subscriptionType = ["Weekly", "Monthly"];
    let weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    console.log(props)
    return (

        <div className="user-menu-body-main col">

            <div className="container">

                <div className="row d-flex flex-column">

                    <div className="col w-50 d-flex flex-column py-3">
                        <p className="col">
                            Subscription Plan:
                        </p>
                        <select className="col p-2 w-75"
                                name="subscription-name"
                                value={props.subscriptionPlanValues.name}
                                onChange={props.onChangeSubscriptionPlanValuesHandler}>
                            {
                                props.info.map((item, index) => {
                                    return <option key={"subscription-plan-id-" + index}>
                                        {item.name}
                                    </option>
                                })
                            }
                        </select>
                    </div>

                    <div className="col d-flex w-50 py-3">
                        <div className="col">
                            <p className="col">
                                Number Of Weekly Meals:
                            </p>
                            <select className="col p-2 w-50"
                                    name="number-of-weekly-meals"
                                    value={props.subscriptionPlanValues.numberOfWeeklyMeals}
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
                        <div className="col">
                            <p className="col">
                                Servings Per Meal:
                            </p>
                            <select className="col p-2 w-50"
                                    name="servings-per-meal"
                                    value={props.subscriptionPlanValues.servingsPerMeal}
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

                    <div className="col d-flex w-50 py-3">
                        <div className="col">
                            <p className="col">
                                Weekly Delivery Day:
                            </p>
                            <select className="col p-2 w-50"
                                    name="weekly-delivery-day"
                                    value={props.subscriptionPlanValues.numberOfWeeklyDeliveryDays}
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
                        <div className="col">
                            <p className="col">
                                Subscription Type:
                            </p>
                            <select className="col p-2 w-50"
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
                    </div>


                    <div className="col d-flex w-50 py-3">
                        <div className="col">
                            <p className="col">
                                Weekly Delivery Days:
                            </p>
                            {
                                weeklyDeliveryDayFields.map((item, index) => {
                                    return <div className="col" key={"weekly-delivery-day-id-" + (index + 1)}>
                                        <p className="text-color-green">Day #{(index + 1)}</p>
                                        <select
                                            value={props.subscriptionPlanValues.weeklyDeliveryDays[index]}
                                            className="col p-2 w-50"
                                            name={"weekly-delivery-day-id-" + (index)}
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
                                })
                            }
                        </div>
                    </div>


                    {!props.isSubscriptionSaved ? <div className="col d-flex w-50">
                            <button type="button" className=" btn-save-user-information"
                                    name="save-subscription-plan"
                                    onClick={props.onSubmitSave}>
                                Save & Pay
                            </button>
                        </div> :
                        <div className="col d-flex w-50">
                            <button type="button" className=" btn-save-user-information"
                                    name="edit-subscription-plan"
                                    onClick={props.onSubmitSave}>
                                Edit
                            </button>
                        </div>

                    }
                </div>

            </div>

        </div>

    )

}

export default SubscriptionPlans;