import React from "react";

const Dashboard = (props) => {

    let onChangeToDateHandler = (event) => {
        props.onChangeToDateHandler(event.target.value)
    }
    let onChangeFromDateHandler = (event) => {
        props.onChangeFromDateHandler(event.target.value)
    }

    return (

        <div className="dashboard-wrapper row flex-column py-5">

            <div className="col d-flex flex-column">

                <div className="users-info row d-flex flex-column">

                    <div className="adw-calendar-select col w-75 pb-2 d-flex flex-row justify-content-around">
                        <div className="col d-flex align-items-baseline">
                            <label>Order From:</label>
                            <input type="date"
                                   value={props.filterDates.filterFromDate}
                                   className="px-1 ml-3 coupon-percentage-discount-field"
                                   onChange={onChangeFromDateHandler}
                                   onClick={onChangeFromDateHandler}
                            />
                        </div>
                        <div className="col d-flex align-items-baseline">
                            <label>Order To:</label>
                            <input type="date"
                                   value={props.filterDates.filterToDate}
                                   className="px-1 ml-3 coupon-percentage-discount-field"
                                   onChange={onChangeToDateHandler}
                                   onClick={onChangeToDateHandler}
                            />
                        </div>

                        <div className="col-2 d-flex align-items-baseline">
                            <button type="button"
                                    className="btn-order-info-apply"
                                    onClick={props.onClickApply}
                            >Apply
                            </button>
                        </div>
                    </div>

                    <div className="adw-users-metrics col d-flex flex-column">
                        <div className="col d-flex ">
                            <p className="col-2">Orders:</p>
                            <p className="font-weight-bold bg-white px-5 py-1 ml-3 text-color-green">
                                {props.dashboardInfo.numberOfOrders}
                            </p>
                        </div>

                        <div className="col d-flex">
                            <p className="col-2">Active Users:</p>
                            <p className="font-weight-bold bg-white px-5 py-1 ml-3 text-color-green">
                                {props.dashboardInfo.activeUsers}
                            </p>
                        </div>

                        <div className="col d-flex">
                            <p className="col-2">Subscribed Users:</p>
                            <p className="font-weight-bold bg-white px-5 py-1 ml-3 text-color-green">
                                {props.dashboardInfo.subscribedUsers}
                            </p>
                        </div>

                    </div>
                </div>

            </div>

            <div className="container d-flex flex-row admin-actions">

                <div className="col mb-5 mt-5 border border-success">

                    <div className="col d-flex justify-content-center pt-5 pb-3 btn-admin-action">
                        <a className="w-100 text-center" href={window.location.href + "/create-recipe"}>
                            <button className="w-50 btn-create-recipe" onClick={props.onSubmitRoute}>
                                Create Recipe
                            </button>
                        </a>
                    </div>

                    <div className="col d-flex justify-content-center py-3 btn-admin-action">
                        <a className="w-100 text-center" href={window.location.href + "/create-menu"}>
                            <button className="w-50 btn-create-menu" onClick={props.onSubmitRoute}>
                                Create Menu
                            </button>
                        </a>
                    </div>

                    <div className="col d-flex justify-content-center py-3 btn-admin-action">
                        <a className="w-100 text-center" href={window.location.href + "/create-coupon"}>
                            <button className="w-50 btn-create-coupon" onClick={props.onSubmitRoute}>
                                Create Coupon
                            </button>
                        </a>
                    </div>

                    <div className="col d-flex justify-content-center pt-3 pb-5 btn-admin-action">
                        <a className="w-100 text-center" href={window.location.href + "/create-subscription-plan"}>
                            <button className="w-50 btn-create-subscription-plan" onClick={props.onSubmitRoute}>
                                Create Subscription Plan
                            </button>
                        </a>
                    </div>

                </div>

                <div className="col mb-5 border border-success m-5 btn-admin-action">

                    <div className="col d-flex justify-content-center pt-5 pb-3">
                        <a className="w-100 text-center" href={window.location.href + "/orders"}>
                            <button className="w-50 btn-send-email" onClick={props.onSubmitRoute}>
                                Orders
                            </button>
                        </a>
                    </div>

                    <div className="col d-flex justify-content-center py-3 btn-admin-action">
                        <a className="w-100 text-center" href={window.location.href + "/subscription"}>
                            <button className="w-50 btn-send-email" onClick={props.onSubmitRoute}>
                                Subscription
                            </button>
                        </a>
                    </div>

                    <div className="col d-flex justify-content-center py-3 btn-admin-action">
                        <a className="w-100 text-center" href={window.location.href + "/manage-coupon"}>
                            <button className="w-50 btn-create-subscription-plan" onClick={props.onSubmitRoute}>
                                Manage Coupons
                            </button>
                        </a>
                    </div>


                    <div className="col d-flex justify-content-center py-3 btn-admin-action">
                        <a className="w-100 text-center" href={window.location.href + "/manage-subscription-plan"}>
                            <button className="w-50 btn-create-subscription-plan" onClick={props.onSubmitRoute}>
                                Manage Subscription Plan
                            </button>
                        </a>
                    </div>

                    <div className="col d-flex justify-content-center pt-3 pb-5 btn-admin-action">
                        <a className="w-100 text-center" href={window.location.href + "/send-email"}>
                            <button className="w-50 btn-send-email" onClick={props.onSubmitRoute}>
                                Send Email
                            </button>
                        </a>
                    </div>

                </div>

            </div>

        </div>

    )

}

export default Dashboard;