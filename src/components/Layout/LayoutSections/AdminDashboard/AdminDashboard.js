import React, {Component} from "react";

import "./AdminDashboard.css";
import CreateRecipe from "./AdminDashboardComponents/Components/CreateRecipe/CreateRecipe";
import Dashboard from "./AdminDashboardComponents/Dashboard";
import CreateMenu from "./AdminDashboardComponents/Components/CreateMenu/CreateMenu";
import SendEmail from "./AdminDashboardComponents/Components/SendEmail/SendEmail";

import SubscribeEmailCalls from '../../../../repository/get/getSubscribeEmail';
import EmailCalls from '../../../../repository/get/getEmail';
import OrderCalls from '../../../../repository/get/getOrderInfo';
import CreateCoupon from "./AdminDashboardComponents/Components/CreateCoupon/CreateCoupon";
import CreateSubscriptionPlan
    from "./AdminDashboardComponents/Components/CreateSubscriptionPlan/CreateSubscriptionPlan";
import ManageCoupon from "./AdminDashboardComponents/Components/ManageCoupon/ManageCoupon";
import ManageSubscriptionPlan
    from "./AdminDashboardComponents/Components/ManageSubscriptionPlan/ManageSubscriptionPlan";
import Orders from "./AdminDashboardComponents/Components/Orders/Orders";

class AdminDashboard extends Component {

    state = {
        routeComponent: "Dashboard",
        dashboardInfo: {
            subscribedUsers: "",
            activeUsers: 0,
            numberOfOrders: 0
        },
        filterDates: {
            filterToDate: "",
            filterFromDate: ""
        }

    }

    async componentDidMount() {

        window.scrollTo(0, 0);

        this.setState({
            routeComponent: this.props.routeComponent
        })

        await this.getSubscribeEmails();
        await this.getActiveUsers();
        await this.setDateFilter();
        await this.getOrders();

    }

    getSubscribeEmails = async () => {
        await SubscribeEmailCalls.fetchSubscribeEmails().then((response) => {
            this.setState({
                dashboardInfo: {
                    ...this.state.dashboardInfo,
                    subscribedUsers: response.data.length
                }
            })
        })
    }

    getActiveUsers = async () => {
        await EmailCalls.countEmailsByIsUser(true).then((response) => {
            this.setState({
                dashboardInfo: {
                    ...this.state.dashboardInfo,
                    activeUsers: response.data
                }
            })
        })
    }

    getOrders = async () => {
        try {
            await OrderCalls.fetchOrderInfoBetweenStartAndEndDates(this.state.filterDates.filterFromDate,
                this.state.filterDates.filterToDate).then(response => {
                this.setState({
                    dashboardInfo: {
                        ...this.state.dashboardInfo,
                        numberOfOrders: response.data.length
                    }
                })
            }).catch(e => {
                console.log(e);
            })
        } catch (e) {
            console.log(e);
        }


    }

    onChangeToDateHandler = async (date) => {
        this.setState({
            filterDates: {
                ...this.state.filterDates,
                filterToDate: date
            }
        })

    }

    onChangeFromDateHandler = async (date) => {
        this.setState({
            filterDates: {
                ...this.state.filterDates,
                filterFromDate: date
            }
        })
    }

    setDateFilter = () => {
        let date = new Date();
        let month = (date.getMonth() + 1);
        let day = date.getDate();
        if (month < 10) {
            month = "0" + month.toString();
        }
        if (day < 10) {
            day = "0" + day.toString();
        }
        this.setState({
            filterDates: {
                ...this.state.filterDates,
                filterFromDate: `${date.getFullYear()}-${month}-${day}`,
                filterToDate: `${date.getFullYear()}-${month}-${day}`
            }
        })
    }


    onSubmitRoute = (event) => {
        console.log(event.target)
        let route;
        if (event.target.value) {
            route = event.target.value;
        } else {
            route = event.target.innerHTML.toString();
        }

        if (route === "Create Recipe") {
            this.setState({
                routeComponent: route
            })
            window.history.pushState({}, null, "http://localhost:3000/dashboard/admin/create-recipe");
        } else if (route === "Create Coupon") {
            this.setState({
                routeComponent: route
            })
            window.history.pushState({}, null, "http://localhost:3000/dashboard/admin/create-coupon");

        } else if (route === "Create Menu") {
            this.setState({
                routeComponent: route
            })
            window.history.pushState({}, null, "http://localhost:3000/dashboard/admin/create-menu");

        } else if (route === "Send Email") {
            this.setState({
                routeComponent: route
            })
            window.history.pushState({}, null, "http://localhost:3000/dashboard/admin/send-email");

        } else if (route === "Create Subscription Plan") {
            this.setState({
                routeComponent: route
            })
            window.history.pushState({}, null, "http://localhost:3000/dashboard/admin/create-subscription-plan");

        } else if (route === "Manage Coupon") {
            this.setState({
                routeComponent: route
            })
            window.history.pushState({}, null, "http://localhost:3000/dashboard/admin/manage-coupon");

        } else if (route === "Manage Subscription Plan") {
            this.setState({
                routeComponent: route
            })
            window.history.pushState({}, null, "http://localhost:3000/dashboard/admin/manage-subscription-plan");

        } else if (route === "<< Go Back to Dashboard") {
            route = "Dashboard";
            this.setState({
                routeComponent: route
            })
            window.history.pushState({}, null, "http://localhost:3000/dashboard/admin");

        }

    }

    render() {

        let routeComponent;
        if (this.state.routeComponent === "Create Recipe") {
            routeComponent = <CreateRecipe route={this.state.routeComponent}
                                           onSubmitRoute={this.onSubmitRoute}
            />
        } else if (this.state.routeComponent === "Create Menu") {
            routeComponent = <CreateMenu route={this.state.routeComponent} onSubmitRoute={this.onSubmitRoute}/>

        } else if (this.state.routeComponent === "Send Email") {
            routeComponent = <SendEmail
                dashboardInfo={this.state.dashboardInfo}
                route={this.state.routeComponent}
                onSubmitRoute={this.onSubmitRoute}/>

        } else if (this.state.routeComponent === "Create Coupon") {
            routeComponent = <CreateCoupon
                route={this.state.routeComponent}
                onSubmitRoute={this.onSubmitRoute}/>

        } else if (this.state.routeComponent === "Create Subscription Plan") {
            routeComponent = <CreateSubscriptionPlan
                route={this.state.routeComponent}
                onSubmitRoute={this.onSubmitRoute}/>

        } else if (this.state.routeComponent === "Manage Coupon") {
            routeComponent = <ManageCoupon
                route={this.state.routeComponent}
                onSubmitRoute={this.onSubmitRoute}/>

        } else if (this.state.routeComponent === "Manage Subscription Plan") {
            routeComponent = <ManageSubscriptionPlan
                route={this.state.routeComponent}
                onSubmitRoute={this.onSubmitRoute}/>

        } else if (this.state.routeComponent === "Orders") {
            routeComponent = <Orders
                route={this.state.routeComponent}
                onSubmitRoute={this.onSubmitRoute}/>

        } else {
            routeComponent = <Dashboard
                dashboardInfo={this.state.dashboardInfo}
                filterDates={this.state.filterDates}
                route={this.state.routeComponent}
                onSubmitRoute={this.onSubmitRoute}
                onChangeToDateHandler={this.onChangeToDateHandler.bind(this)}
                onChangeFromDateHandler={this.onChangeFromDateHandler.bind(this)}
            />
        }


        return (

            <div className="admin-dashboard-wrapper py-5">

                <div className="container d-flex flex-column">
                    <h1 className="text-center border-bottom border-success">Admin Dashboard</h1>
                </div>

                <div className="px-5 pt-4 pb-3">
                    {routeComponent}
                </div>

            </div>

        )

    }
}

export default AdminDashboard;