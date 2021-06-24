import React, {Component} from "react";

import "./UserDashboard.css";

import OrderCalls from '../../../../repository/get/getOrderInfo';
import UserInfoCalls from '../../../../repository/get/getUser';
import CreditCardCalls from '../../../../repository/get/getCreditCard';
import ShippingAddressCalls from '../../../../repository/get/getShippingAddress';
import DeliveryAddressCalls from '../../../../repository/get/getDeliveryAddress';
import SubscriptionPlanCalls from '../../../../repository/get/getSubscriptionPlan';

import postCreditCard from '../../../../repository/post/postCreditCard';
import postShippingAddress from '../../../../repository/post/postShippingAddress';

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
        billingInformation: {
            nameOnCard: "",
            cardNumber: "",
            expirationDateMonth: "",
            expirationDateYear: "",
            isActive: true
        },
        shippingInformation: {
            address: "",
            zipCode: ""
        },
        subscriptionPlan: [],
        selectedSubscriptionPlanName: "",
        selectedSubscriptionPlanValues: {},
        subscriptionPlanValues: {
            numberOfWeeklyMeals: 1,
            servingsPerMeal: 1,
            subscriptionType: "",
            numberOfWeeklyDeliveryDays: 1,
            weeklyDeliveryDays: ["Wednesday"],
            isCanceled: false,
            name: ""
        },
        isLoading: true,
        isSubscriptionSaved: false,


    }

    async componentDidMount() {

        window.scrollTo(0, 0);

        await this.populateUsername();
        await this.populateRouteComponent();
        await this.getUserComponentInfo();

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

    getUserComponentInfo = async (component) => {
        let comp = this.state.userComponent;
        if (component) {
            comp = component
        }
        if (comp === "Personal Information") {
            await this.getUserInformation();
        } else if (comp === "Billing Information") {
            await this.getUserBillingInformation();
        } else if (comp === "Shipping Information") {
            await this.getUserShippingInformation();
        } else if (comp === "Subscription") {
            await this.getSubscriptionPlans();
        } else if (comp === "Order History") {

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

    getSubscriptionPlans = async () => {
        try {
            await SubscriptionPlanCalls.fetchAllSubscriptionPlansByIsActive(true).then(response => {
                // console.log(response.data)

                if (response.data) {
                    let numberOfWeeklyMeals = Array.from(
                        {length: response.data[0].numberOfWeeklyMealsLimit},
                        (x, i) => i + 1)
                    let servingsPerMeal = Array.from(
                        {length: response.data[0].servingsPerMealLimit},
                        (x, i) => i + 1);
                    let weeklyDeliveryDay = Array.from(
                        {length: response.data[0].weeklyDeliveryDayLimit},
                        (x, i) => i + 1);
                    this.setState({
                        userComponentInfo: response.data,
                        selectedSubscriptionPlanName: response.data[0].name,
                        selectedSubscriptionPlanValues: response.data[0],
                        subscriptionPlanValues: {
                            numberOfWeeklyMeals: numberOfWeeklyMeals[0],
                            servingsPerMeal: servingsPerMeal[0],
                            numberOfWeeklyDeliveryDays: weeklyDeliveryDay[0],
                            subscriptionType: "Weekly",
                            weeklyDeliveryDays: ["Wednesday"],
                            isCanceled: false,
                            name: response.data[0].name
                        }
                    })
                } else {
                    this.setState({
                        userComponentInfo: []
                    })
                }
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

    onClickChangeTitle = async (event) => {
        this.setState({
            userComponent: event.target.innerHTML,
            isLoading: true
        })
        await this.getUserComponentInfo(event.target.innerHTML);
        await this.loaded();
    }

    onChangeBillingInformationHandler = (event) => {
        if (event.target.name === "name-on-card") {
            this.setState(prevState => ({
                billingInformation: {
                    ...prevState.billingInformation,
                    nameOnCard: event.target.value,
                }
            }))
        } else if (event.target.name === "card-number") {
            this.setState(prevState => ({
                billingInformation: {
                    ...prevState.billingInformation,
                    cardNumber: event.target.value,
                }
            }))
        } else if (event.target.name === "expiration-date-month") {
            this.setState(prevState => ({
                billingInformation: {
                    ...prevState.billingInformation,
                    expirationDateMonth: event.target.value,
                }
            }))
        } else if (event.target.name === "expiration-date-year") {
            this.setState(prevState => ({
                billingInformation: {
                    ...prevState.billingInformation,
                    expirationDateYear: event.target.value,
                }
            }))
        }
    }

    onChangeShippingInformationHandler = (event) => {
        if (event.target.name === "shipping-address") {
            this.setState(prevState => ({
                shippingInformation: {
                    ...prevState.shippingInformation,
                    address: event.target.value,
                }
            }))
        } else if (event.target.name === "shipping-zip-code") {
            this.setState(prevState => ({
                shippingInformation: {
                    ...prevState.shippingInformation,
                    zipCode: event.target.value,
                }
            }))
        }
    }

    createBillingInformation = async () => {
        try {
            await postCreditCard.createCreditCard(this.state.billingInformation, this.state.username).then((response) => {
                // console.log(response.data.code);
            })
        } catch (e) {
            console.log(e);
        }
    }

    createShippingInformation = async () => {
        try {
            await postShippingAddress.createShippingAddress(this.state.shippingInformation, this.state.username).then((response) => {
                // console.log(response.data.code);
            })
        } catch (e) {
            console.log(e);
        }
    }

    onSubmitSave = async (event) => {
        if (event.target.name === "save-billing-information") {
            await this.createBillingInformation();
            await this.getUserComponentInfo();
        } else if (event.target.name === "save-shipping-information") {
            await this.createShippingInformation();
            await this.getUserComponentInfo();
        } else if (event.target.name === "save-subscription-plan") {
            this.setState({
                isSubscriptionSaved: true
            })
        } else if (event.target.name === "edit-subscription-plan") {
            this.setState({
                isSubscriptionSaved: false
            })
        }
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

    setSubscriptionPlanValues = (info) => {
        this.setState({
            subscriptionPlanValues: {
                isCanceled: false,
                name: info.name,
                numberOfWeeklyMeals: 1,
                servingsPerMeal: 1,
                subscriptionType: "Weekly",
                numberOfWeeklyDeliveryDays: 1,
                weeklyDeliveryDays: ["Wednesday"],
            }
        })
    }

    onChangeSubscriptionPlanValuesHandler = (event) => {
        if (event.target.name === "subscription-name") {
            if (event.target.value === this.state.selectedSubscriptionPlanName) {
                this.setState(prevState => ({
                    subscriptionPlanValues: {
                        ...prevState.subscriptionPlanValues,
                        name: event.target.value
                    }
                }))
            } else if (event.target.value !== this.state.selectedSubscriptionPlanValues) {
                this.state.userComponentInfo.forEach((item, index) => {
                    if (event.target.value === item.name) {
                        this.setState(prevState => ({
                            selectedSubscriptionPlanValues: item,
                            selectedSubscriptionPlanName: item.name,
                            subscriptionPlanValues: {
                                ...prevState.subscriptionPlanValues,
                                name: event.target.value
                            }
                        }))
                        this.setSubscriptionPlanValues(item)
                    }
                })
            }
        } else if (event.target.name === "number-of-weekly-meals") {
            this.setState(prevState => ({
                subscriptionPlanValues: {
                    ...prevState.subscriptionPlanValues,
                    numberOfWeeklyMeals: parseInt(event.target.value)
                }
            }))
        } else if (event.target.name === "servings-per-meal") {
            this.setState(prevState => ({
                subscriptionPlanValues: {
                    ...prevState.subscriptionPlanValues,
                    servingsPerMeal: parseInt(event.target.value)
                }
            }))
        } else if (event.target.name === "weekly-delivery-day") {
            this.setState(prevState => ({
                subscriptionPlanValues: {
                    ...prevState.subscriptionPlanValues,
                    numberOfWeeklyDeliveryDays: parseInt(event.target.value)
                }
            }))
        } else if (event.target.name === "subscription-type") {
            this.setState(prevState => ({
                subscriptionPlanValues: {
                    ...prevState.subscriptionPlanValues,
                    subscriptionType: parseInt(event.target.value)
                }
            }))
        }

    }

    onChangeWeeklyDeliveryDaysHandler = (event) => {
        let index = event.target.name.split("-");
        index = index[index.length - 1]
        let weeklyDeliveryDays = this.state.subscriptionPlanValues.weeklyDeliveryDays;
        weeklyDeliveryDays[index] = event.target.value;
        this.setState(prevState => ({
            subscriptionPlanValues: {
                ...prevState.subscriptionPlanValues,
                weeklyDeliveryDays: weeklyDeliveryDays
            }
        }))
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
        if (this.state.selectedSubscriptionPlanName === "") {
            routeComponent = <Dashboard
                userComponent={this.state.userComponent}
                userComponentInfo={this.state.userComponentInfo}
                onClickChangeTitle={this.onClickChangeTitle}
                dashboardInfo={this.state.dashboardInfo}
                filterDates={this.state.filterDates}
                route={this.state.routeComponent}
                onSubmitRoute={this.onSubmitRoute}
                onChangeToDateHandler={this.onChangeToDateHandler.bind(this)}
                onChangeFromDateHandler={this.onChangeFromDateHandler.bind(this)}
                onChangeBillingInformationHandler={this.onChangeBillingInformationHandler.bind(this)}
                onChangeShippingInformationHandler={this.onChangeShippingInformationHandler.bind(this)}
                onSubmitSave={this.onSubmitSave.bind(this)}

            />
        } else {
            routeComponent = <Dashboard
                userComponent={this.state.userComponent}
                userComponentInfo={this.state.userComponentInfo}
                selectedSubscriptionPlanName={this.state.selectedSubscriptionPlanName}
                selectedSubscriptionPlanValues={this.state.selectedSubscriptionPlanValues}
                subscriptionPlanValues={this.state.subscriptionPlanValues}
                onClickChangeTitle={this.onClickChangeTitle}
                dashboardInfo={this.state.dashboardInfo}
                filterDates={this.state.filterDates}
                route={this.state.routeComponent}
                onSubmitRoute={this.onSubmitRoute}
                onChangeToDateHandler={this.onChangeToDateHandler.bind(this)}
                onChangeFromDateHandler={this.onChangeFromDateHandler.bind(this)}
                onChangeBillingInformationHandler={this.onChangeBillingInformationHandler.bind(this)}
                onChangeShippingInformationHandler={this.onChangeShippingInformationHandler.bind(this)}
                onSubmitSave={this.onSubmitSave.bind(this)}
                onChangeSubscriptionPlanValuesHandler={this.onChangeSubscriptionPlanValuesHandler.bind(this)}
                onChangeWeeklyDeliveryDaysHandler={this.onChangeWeeklyDeliveryDaysHandler.bind(this)}
                isSubscriptionSaved={this.state.isSubscriptionSaved}
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