import React, {Component} from "react";

import "./UserDashboard.css";

import OrderCalls from '../../../../repository/get/getOrderInfo';
import UserInfoCalls from '../../../../repository/get/getUser';
import CreditCardCalls from '../../../../repository/get/getCreditCard';
import ShippingAddressCalls from '../../../../repository/get/getShippingAddress';
import DeliveryAddressCalls from '../../../../repository/get/getDeliveryAddress';
import Dashboard from "./UserDashboardComponents/Dashboard";
import getUser from "../../../../repository/get/getUser";

class UserDashboard extends Component {

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
        },
        userComponent: "Personal Information",
        userComponentInfo: {},
        username: "",
        isLoading: true


    }

    async componentDidMount() {

        window.scrollTo(0, 0);

        await this.populateUsername();
        await this.populateRouteComponent();
        await this.getUserInformation();
        console.log(this.state.username)
        console.log(localStorage.getItem("username"))

        await this.setDateFilter();
        this.loaded();
        // await this.getOrders();

    }

    loaded = () => {
        this.setState({
            isLoading: false
        })
    }

    populateRouteComponent = () => {
        this.setState({
            routeComponent: this.props.routeComponent
        })
    }

    populateUsername = async () => {
        this.setState({
            username: localStorage.getItem("username")
        })
    }

    getUserComponentInfo = async () => {
        if (this.state.userComponent === "Personal Information") {
            await this.getUserInformation();
        } else if (this.state.userComponent === "Billing Information") {
            await this.getUserBillingInformation();
        } else if (this.state.userComponent === "Shipping Information") {
            await this.getUserShippingInformation();
        } else if (this.state.userComponent === "Subscription") {

        } else if (this.state.userComponent === "Order History") {

        }
    }

    getUserInformation = async () => {
        try {
            await getUser.fetchUserByUsername(this.state.username).then(response => {
                this.setState({
                    userComponentInfo: response.data
                })
            }).catch(e => {
                console.log(e);
            })
        } catch (e) {
            console.log(e);
        }

    }

    getUserBillingInformation = async () => {
        try {
            await CreditCardCalls.fetchCreditCardByUsername(this.state.username).then(response => {
                this.setState({
                    userComponentInfo: response.data
                })
            }).catch(e => {
                console.log(e);
            })
        } catch (e) {
            console.log(e);
        }

    }

    getUserShippingInformation = async () => {
        try {
            await ShippingAddressCalls.fetchShippingAddressByUsername(this.state.username).then(response => {
                this.setState({
                    userComponentInfo: response.data
                })
            }).catch(e => {
                console.log(e);
            })
        } catch (e) {
            console.log(e);
        }

    }

    // getOrders = async () => {
    //     try {
    //         await OrderCalls.fetchOrderInfoBetweenStartAndEndDates(this.state.filterDates.filterFromDate,
    //             this.state.filterDates.filterToDate).then(response => {
    //             this.setState({
    //                 dashboardInfo: {
    //                     ...this.state.dashboardInfo,
    //                     numberOfOrders: response.data.length
    //                 }
    //             })
    //         }).catch(e => {
    //             console.log(e);
    //         })
    //     } catch (e) {
    //         console.log(e);
    //     }
    //
    //
    // }

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

    onClickChangeTitle = (event) => {
        console.log(event.target.innerHTML)
        this.setState({
            userComponent: event.target.innerHTML
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
        } else if (route === "<< Go Back to Dashboard") {
            route = "Dashboard";
            this.setState({
                routeComponent: route
            })
            window.history.pushState({}, null, "http://localhost:3000/dashboard/user");

        }

    }

    render() {

        let routeComponent;
        if (this.state.routeComponent === "Create Recipe") {
            // routeComponent = <CreateRecipe route={this.state.routeComponent}
            //                                onSubmitRoute={this.onSubmitRoute}
            // />
        } else {
            routeComponent = <Dashboard
                userComponent={this.state.userComponent}
                userComponentInfo={this.state.userComponentInfo}
                onClickChangeTitle = {this.onClickChangeTitle}
                dashboardInfo={this.state.dashboardInfo}
                filterDates={this.state.filterDates}
                route={this.state.routeComponent}
                onSubmitRoute={this.onSubmitRoute}
                onChangeToDateHandler={this.onChangeToDateHandler.bind(this)}
                onChangeFromDateHandler={this.onChangeFromDateHandler.bind(this)}
            />
        }


        return (

            <div className="user-dashboard-wrapper py-5">

                <div className="container d-flex flex-column">
                    <h1 className="text-center border-bottom border-success">User Dashboard</h1>
                </div>

                {!this.state.isLoading && routeComponent}

            </div>

        )

    }

}


export default UserDashboard;