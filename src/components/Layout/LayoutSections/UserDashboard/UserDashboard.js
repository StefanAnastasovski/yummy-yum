import React, {Component} from "react";

import "./UserDashboard.css";

// import OrderCalls from '../../../../repository/get/getOrderInfo';
// import UserInfoCalls from '../../../../repository/get/getUser';
import CreditCardCalls from '../../../../repository/get/getCreditCard';
import ShippingAddressCalls from '../../../../repository/get/getShippingAddress';
// import DeliveryAddressCalls from '../../../../repository/get/getDeliveryAddress';
import SubscriptionPlanCalls from '../../../../repository/get/getSubscriptionPlan';
// import Subscription from '../../../../repository/get/getSubscription';

import postCreditCard from '../../../../repository/post/postCreditCard';
import postShippingAddress from '../../../../repository/post/postShippingAddress';

import Dashboard from "./UserDashboardComponents/Dashboard";
import getUser from "../../../../repository/get/getUser";
import Payment from "../Main/Checkout/Payment/Payment";
import PaymentSuccessful from "../Main/Checkout/Payment/PaymentSuccessful/PaymentSuccessful";
import getSubscription from "../../../../repository/get/getSubscription";

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
        userInformation: {
            fullName: "",
            username: "",
            email: "",
        },
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
            subscriptionType: "Weekly",
            numberOfWeeklyDeliveryDays: 1,
            weeklyDeliveryDays: ["Wednesday"],
            deliveryTime: ["08:00 AM - 08:30 AM"],
            isCanceled: false,
            name: ""
        },
        isLoading: true,
        isSubscriptionSaved: false,
        totalAmount: 0.00,
        isPaymentLoading: true,
        shippingCost: 0.00,
        shippingCostPerServing: 0.00,
        redirectToPayment: false,
        isSubscriptionExist: false,
        subscriptionInfo: {}


    }

    async componentDidMount() {
        window.scrollTo(0, 0);

        await this.populateUsername();
        await this.populateRouteComponent();
        await this.setUserInformation();
        await this.setUserDashboardLocalStorage();
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

    setUserInformation = async () => {
        await this.getUserInformation();
        await this.getUserBillingInformation();
        await this.getUserShippingInformation();
        await this.getSubscriptionIfExist();
    }

    setUserDashboardLocalStorage = async () => {
        let obj = {
            userInformation: this.state.userInformation,
            billingInformation: this.state.billingInformation,
            shippingInformation: this.state.shippingInformation,
            subscriptionPlanValues: this.state.subscriptionPlanValues,
        }

        localStorage.setItem("userInformation", JSON.stringify(obj));
        if (JSON.parse(localStorage.getItem("subscriptionPayment"))) {
            localStorage.setItem("subscriptionPayment", JSON.stringify({}));
        }

    }

    setSubscriptionPaymentLocalStorage = async () => {
        let userInfo = JSON.parse(localStorage.getItem("userInformation"));
        if (userInfo.subscriptionPlanValues.name === "") {
            userInfo.subscriptionPlanValues['name'] = this.state.selectedSubscriptionPlanName;
        }
        let obj = {};
        if (userInfo.billingInformation && userInfo.shippingInformation) {
            obj = {
                subscription: {
                    numberOfWeeklyMeals: userInfo.subscriptionPlanValues.numberOfWeeklyMeals,
                    servingsPerMeal: userInfo.subscriptionPlanValues.servingsPerMeal,
                    subscriptionType: userInfo.subscriptionPlanValues.subscriptionType,
                    weeklyDeliveryDay: userInfo.subscriptionPlanValues.weeklyDeliveryDays.join("|"),
                    weeklyDeliveryTime: userInfo.subscriptionPlanValues.deliveryTime.join("|"),
                    isCanceled: false,
                    name: userInfo.subscriptionPlanValues.name,
                    isActive: true
                },
                username: userInfo.userInformation.username,
                cardNumber: userInfo.billingInformation.cardNumber,
                totalAmount: parseFloat((this.state.shippingCost + this.state.totalAmount).toFixed(2)),
                address: userInfo.shippingInformation.address,
                zipCode: userInfo.shippingInformation.zipCode
            }
        } else if (!userInfo.shippingInformation && userInfo.billingInformation) {
            obj = {
                subscription: {
                    numberOfWeeklyMeals: userInfo.subscriptionPlanValues.numberOfWeeklyMeals,
                    servingsPerMeal: userInfo.subscriptionPlanValues.servingsPerMeal,
                    subscriptionType: userInfo.subscriptionPlanValues.subscriptionType,
                    weeklyDeliveryDay: userInfo.subscriptionPlanValues.weeklyDeliveryDays.join("|"),
                    weeklyDeliveryTime: userInfo.subscriptionPlanValues.deliveryTime.join("|"),
                    isCanceled: false,
                    name: userInfo.subscriptionPlanValues.name,
                    isActive: true
                },
                username: userInfo.userInformation.username,
                cardNumber: userInfo.billingInformation.cardNumber,
                totalAmount: parseFloat((this.state.shippingCost + this.state.totalAmount).toFixed(2)),
                address: "",
                zipCode: ""
            }
        } else if (!userInfo.billingInformation && userInfo.shippingInformation) {
            obj = {
                subscription: {
                    numberOfWeeklyMeals: userInfo.subscriptionPlanValues.numberOfWeeklyMeals,
                    servingsPerMeal: userInfo.subscriptionPlanValues.servingsPerMeal,
                    subscriptionType: userInfo.subscriptionPlanValues.subscriptionType,
                    weeklyDeliveryDay: userInfo.subscriptionPlanValues.weeklyDeliveryDays.join("|"),
                    weeklyDeliveryTime: userInfo.subscriptionPlanValues.deliveryTime.join("|"),
                    isCanceled: false,
                    name: userInfo.subscriptionPlanValues.name,
                    isActive: true
                },
                username: userInfo.userInformation.username,
                cardNumber: "",
                totalAmount: parseFloat((this.state.shippingCost + this.state.totalAmount).toFixed(2)),
                address: userInfo.shippingInformation.address,
                zipCode: userInfo.shippingInformation.zipCode
            }
        } else {
            obj = {
                subscription: {
                    numberOfWeeklyMeals: userInfo.subscriptionPlanValues.numberOfWeeklyMeals,
                    servingsPerMeal: userInfo.subscriptionPlanValues.servingsPerMeal,
                    subscriptionType: userInfo.subscriptionPlanValues.subscriptionType,
                    weeklyDeliveryDay: userInfo.subscriptionPlanValues.weeklyDeliveryDays.join("|"),
                    weeklyDeliveryTime: userInfo.subscriptionPlanValues.deliveryTime.join("|"),
                    isCanceled: false,
                    name: userInfo.subscriptionPlanValues.name,
                    isActive: true
                },
                username: userInfo.userInformation.username,
                cardNumber: "",
                totalAmount: parseFloat((this.state.shippingCost + this.state.totalAmount).toFixed(2)),
                address: "",
                zipCode: ""
            }
        }

        localStorage.setItem("subscriptionPayment", JSON.stringify(obj));

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

    setSubscriptionPlanValues = async (info) => {
        this.setState({
            subscriptionPlanValues: {
                isCanceled: false,
                name: info.name,
                numberOfWeeklyMeals: 1,
                servingsPerMeal: 1,
                subscriptionType: "Weekly",
                numberOfWeeklyDeliveryDays: 1,
                weeklyDeliveryDays: ["Wednesday"],
                deliveryTime: ["08:00 AM - 08:30 AM"]
            }
        })
    }

    setTotalAmount = async (discount, type) => {
        const pricePerUnit = 6.99;
        let priceWithoutDiscount = this.state.subscriptionPlanValues.numberOfWeeklyMeals *
            this.state.subscriptionPlanValues.servingsPerMeal *
            this.state.subscriptionPlanValues.numberOfWeeklyDeliveryDays * pricePerUnit;
        let priceWithDiscount = priceWithoutDiscount - (priceWithoutDiscount * discount);
        if (type === "Monthly") {
            priceWithDiscount = priceWithDiscount * 4;
        }

        this.setState({
            totalAmount: parseFloat(priceWithDiscount.toFixed(2))
        })

    }

    setShippingRates = async () => {
        let totalAmount = this.state.totalAmount;
        let shippingCost = 0;
        let shippingCostPerUnit = 0;
        if (totalAmount < 100) {
            shippingCostPerUnit = 2.55;
        } else if (totalAmount >= 100 && totalAmount <= 300) {
            shippingCostPerUnit = 1.99
        } else if (totalAmount > 300 && totalAmount <= 600) {
            shippingCostPerUnit = 1.55;
        } else if (totalAmount > 600) {
            shippingCostPerUnit = 1.05;
        }

        shippingCost = this.state.subscriptionPlanValues.numberOfWeeklyMeals *
            this.state.subscriptionPlanValues.servingsPerMeal *
            this.state.subscriptionPlanValues.numberOfWeeklyDeliveryDays * shippingCostPerUnit;
        this.setState({
            shippingCostPerServing: shippingCostPerUnit,
            shippingCost: shippingCost
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
                    userComponentInfo: response.data,
                    userInformation: response.data
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
                    userComponentInfo: response.data,
                    billingInformation: response.data
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
                    userComponentInfo: response.data,
                    shippingInformation: response.data
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
                            deliveryTime: ["08:00 AM - 08:30 AM"],
                            isCanceled: false,
                            name: response.data[0].name,
                            activationDate: response.data.activationDate,
                            canceledDate: response.data.canceledDate
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

        await this.calculateSubscriptionPlanPrice();

    }

    getSubscriptionIfExist = async () => {
        try {
            await getSubscription.fetchSubscriptionByUsername(this.state.username).then(response => {
                if (response.data) {
                    this.setState(prevState => ({
                        isSubscriptionExist: true,
                        isSubscriptionSaved: true,
                        subscriptionInfo: response.data,
                        subscriptionPlanValues: {
                            ...prevState.subscriptionPlanValues,
                            deliveryTime: response.data.weeklyDeliveryTime.split("|"),
                            isCanceled: response.data.isCanceled,
                            name: response.data.name,
                            numberOfWeeklyDeliveryDays: response.data.weeklyDeliveryDay.split("|").length,
                            numberOfWeeklyMeals: response.data.numberOfWeeklyMeals,
                            servingsPerMeal: response.data.servingsPerMeal,
                            subscriptionType: response.data.subscriptionType,
                            weeklyDeliveryDays: response.data.weeklyDeliveryDay.split("|"),
                            activationDate: response.data.activationDate,
                            canceledDate: response.data.canceledDate
                        }

                    }))

                }
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

    onChangeSubscriptionPlanValuesHandler = async (event) => {
        let obj = this.state.subscriptionPlanValues;
        if (event.target.name === "subscription-name") {
            if (event.target.value === this.state.selectedSubscriptionPlanName) {
                obj['name'] = event.target.value;
                this.setState(prevState => ({
                    subscriptionPlanValues: {
                        ...prevState.subscriptionPlanValues,
                        name: event.target.value
                    }
                }))
            } else if (event.target.value !== this.state.selectedSubscriptionPlanValues) {
                obj['name'] = event.target.value;
                let temp = {};
                this.state.userComponentInfo.forEach((item, index) => {
                    if (event.target.value === item.name) {
                        temp = item;
                        this.setState(prevState => ({
                            selectedSubscriptionPlanValues: item,
                            selectedSubscriptionPlanName: item.name,
                            subscriptionPlanValues: {
                                ...prevState.subscriptionPlanValues,
                                name: event.target.value
                            }
                        }))
                    }
                })
                await this.setSubscriptionPlanValues(temp);
            }
        } else if (event.target.name === "number-of-weekly-meals") {
            obj['numberOfWeeklyMeals'] = parseInt(event.target.value);
            this.setState(prevState => ({
                subscriptionPlanValues: {
                    ...prevState.subscriptionPlanValues,
                    numberOfWeeklyMeals: parseInt(event.target.value)
                }
            }))
        } else if (event.target.name === "servings-per-meal") {
            obj['servingsPerMeal'] = parseInt(event.target.value);
            this.setState(prevState => ({
                subscriptionPlanValues: {
                    ...prevState.subscriptionPlanValues,
                    servingsPerMeal: parseInt(event.target.value)
                }
            }))
        } else if (event.target.name === "weekly-delivery-day") {
            if (event.target.value < this.state.subscriptionPlanValues.numberOfWeeklyDeliveryDays) {
                this.setState(prevState => ({
                    subscriptionPlanValues: {
                        ...prevState.subscriptionPlanValues,
                        numberOfWeeklyDeliveryDays: parseInt(event.target.value),
                        weeklyDeliveryDays: this.state.subscriptionPlanValues.weeklyDeliveryDays.slice(0, event.target.value)
                    }
                }))
                obj['weeklyDeliveryDays'] = this.state.subscriptionPlanValues.weeklyDeliveryDays.slice(0, event.target.value);
            } else {
                let currentDeliveryDaysValues = this.state.subscriptionPlanValues.weeklyDeliveryDays;
                let currentDeliveryTimeValues = this.state.subscriptionPlanValues.deliveryTime;
                if (event.target.value > 1) {
                    let weeklyDeliveryDayFields = Array.from(
                        {length: event.target.value - currentDeliveryDaysValues.length},
                        (x, i) => i + 1);
                    let weekDays = [...currentDeliveryDaysValues];
                    let time = [...currentDeliveryTimeValues];

                    weeklyDeliveryDayFields.forEach(() => {
                        weekDays.push("Wednesday");
                        time.push("08:00 AM - 08:30 AM");
                    })
                    this.setState(prevState => ({
                        subscriptionPlanValues: {
                            ...prevState.subscriptionPlanValues,
                            numberOfWeeklyDeliveryDays: parseInt(event.target.value),
                            weeklyDeliveryDays: weekDays,
                            deliveryTime: time
                        }
                    }))
                    obj['weeklyDeliveryDays'] = weekDays;
                    obj['deliveryTime'] = time;
                    obj['numberOfWeeklyDeliveryDays'] = parseInt(event.target.value);
                } else {
                    this.setState(prevState => ({
                        subscriptionPlanValues: {
                            ...prevState.subscriptionPlanValues,
                            numberOfWeeklyDeliveryDays: parseInt(event.target.value),
                        }
                    }))

                }


            }
        } else if (event.target.name === "subscription-type") {
            obj['subscriptionType'] = event.target.value;
            this.setState(prevState => ({
                subscriptionPlanValues: {
                    ...prevState.subscriptionPlanValues,
                    subscriptionType: event.target.value
                }
            }))
        }
        await this.setUserDashboardLocalStorage();
        await this.calculateSubscriptionPlanPrice(obj);


    }

    onChangeWeeklyDeliveryDaysHandler = (event) => {
        let subscriptionPlanValues = JSON.parse(localStorage.getItem("userInformation"));
        let index = event.target.name.split("-");
        index = index[index.length - 1]
        let weeklyDeliveryDays = this.state.subscriptionPlanValues.weeklyDeliveryDays;
        weeklyDeliveryDays[index] = event.target.value;
        subscriptionPlanValues.subscriptionPlanValues.weeklyDeliveryDays = weeklyDeliveryDays;
        localStorage.setItem("userInformation", JSON.stringify(subscriptionPlanValues));
        this.setState(prevState => ({
            subscriptionPlanValues: {
                ...prevState.subscriptionPlanValues,
                weeklyDeliveryDays: weeklyDeliveryDays
            }
        }))
    }

    onChangeDeliveryTimeHandler = (event) => {
        let subscriptionPlanValues = JSON.parse(localStorage.getItem("userInformation"));
        let index = event.target.name.split("-");
        index = index[index.length - 1]
        let deliveryTime = this.state.subscriptionPlanValues.deliveryTime;
        deliveryTime[index] = event.target.value;
        subscriptionPlanValues.subscriptionPlanValues.deliveryTime = deliveryTime;
        localStorage.setItem("userInformation", JSON.stringify(subscriptionPlanValues));
        this.setState(prevState => ({
            subscriptionPlanValues: {
                ...prevState.subscriptionPlanValues,
                deliveryTime: deliveryTime
            }
        }))
    }

    onClickChangeTitle = async (event) => {
        this.setState({
            userComponent: event.target.innerHTML,
            isLoading: true
        })
        await this.getUserComponentInfo(event.target.innerHTML);
        await this.onSubmitRoute(event);
        await this.loaded();
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
                isSubscriptionSaved: true,
                routeComponent: "Payment",
                userComponent: "Payment"
            })
            await this.setSubscriptionPaymentLocalStorage();
        } else if (event.target.name === "edit-subscription-plan") {
            this.setState({
                isSubscriptionSaved: true,
                isSubscriptionExist: false
            })
        } else if (event.target.name === "cancel-edit-subscription-plan") {
            this.setState({
                isSubscriptionSaved: true,
                isSubscriptionExist: true
            })
        }
    }

    onSubmitRoute = async (event) => {
        let route;
        if (event.target.value) {
            route = event.target.value;
        } else {
            route = event.target.innerHTML.toString();
        }

        if (route === "Personal Information") {
            this.setState({
                routeComponent: route
            })
            window.history.pushState({}, null, "http://localhost:3000/dashboard/user/personal-information");
        } else if (route === "Billing Information") {
            this.setState({
                routeComponent: route
            })
            window.history.pushState({}, null, "http://localhost:3000/dashboard/user/billing-information");
        } else if (route === "Shipping Information") {
            this.setState({
                routeComponent: route
            })
            window.history.pushState({}, null, "http://localhost:3000/dashboard/user/shipping-information");
        } else if (route === "Subscription") {
            this.setState({
                routeComponent: route
            })
            window.history.pushState({}, null, "http://localhost:3000/dashboard/user/subscription");
        } else if (route === "Order History") {
            this.setState({
                routeComponent: route
            })
            window.history.pushState({}, null, "http://localhost:3000/dashboard/user/order-history");
        } else if (route === "Payment") {
            this.setState({
                routeComponent: route
            })
            window.history.pushState({}, null, "http://localhost:3000/dashboard/user/subscription/cart/pay-now");
        } else if (route === "Payment Successful") {
            this.setState({
                routeComponent: route
            })
            window.history.pushState({}, null, "http://localhost:3000/dashboard/user/subscription/cart/payment-successful");
        } else if (route === "<< Go Back to Dashboard") {
            route = "Dashboard";
            this.setState({
                routeComponent: route,
                userComponent: "Personal Information"
            })
            if (JSON.parse(localStorage.getItem("subscriptionPayment"))) {
                localStorage.setItem("subscriptionPayment", JSON.stringify({}));
            }
            await this.getUserComponentInfo();
            window.history.pushState({}, null, "http://localhost:3000/dashboard/user/personal-information");

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

    calculateSubscriptionPlanPrice = async () => {
        let discount = 0.0;
        let meals = this.state.subscriptionPlanValues.numberOfWeeklyMeals;
        let servings = this.state.subscriptionPlanValues.servingsPerMeal;
        let days = this.state.subscriptionPlanValues.numberOfWeeklyDeliveryDays;
        let type = this.state.subscriptionPlanValues.subscriptionType;
        let typeValues = ["Weekly", "Monthly"]
        if (parseInt(meals) < 3 && parseInt(servings) < 3 && parseInt(days) && type === typeValues[0]) {
            discount = 0.07;
        } else if (parseInt(meals) < 3 && parseInt(servings) < 3 && parseInt(days) <= 2 && type === typeValues[1]) {
            discount = 0.09;
        } else if ((parseInt(meals) <= 3 && parseInt(meals) <= 6) && parseInt(servings) <= 4 && parseInt(days) <= 4 && type === typeValues[0]) {
            discount = 0.12;
        } else if ((parseInt(meals) <= 3 && parseInt(meals) <= 6) && parseInt(servings) <= 4 && parseInt(days) <= 4 && type === typeValues[1]) {
            discount = 0.16;
        } else if ((parseInt(meals) > 6 && parseInt(meals) <= 10) && parseInt(servings) < 5 && parseInt(days) <= 7 && type === typeValues[0]) {
            discount = 0.19;
        } else if ((parseInt(meals) > 6 && parseInt(meals) <= 10) && parseInt(servings) < 5 && parseInt(days) <= 7 && type === typeValues[1]) {
            discount = 0.20;
        } else if (parseInt(meals) > 10 && parseInt(servings) <= 10 && parseInt(days) <= 7 && type === typeValues[0]) {
            discount = 0.26;
        } else if (parseInt(meals) > 10 && parseInt(servings) <= 10 && parseInt(days) <= 7 && type === typeValues[1]) {
            discount = 0.30;
        } else if ((parseInt(meals) >= 1 && parseInt(meals) <= 6) && parseInt(days) <= 7 && type === typeValues[0]) {
            discount = 0.14;
        } else if ((parseInt(meals) >= 1 && parseInt(meals) <= 6) && parseInt(days) <= 7 && type === typeValues[1]) {
            discount = 0.20;
        } else if ((parseInt(meals) > 6 && parseInt(meals) <= 10) && parseInt(days) <= 7 && (type === typeValues[0] || typeValues[1])) {
            discount = 0.25;
        } else if (parseInt(meals) > 10 && parseInt(days) <= 7 && (type === typeValues[0] || typeValues[1])) {
            discount = 0.30;
        }

        await this.setTotalAmount(discount, type);
        await this.setShippingRates();

    }

    populateRouteComponent = async () => {
        if (window.location.href.includes("/dashboard/user/personal-information")) {
            this.setState({
                routeComponent: this.state.routeComponent,
                userComponent: "Personal Information"
            })
        }
        if (window.location.href.includes("/dashboard/user/shipping-information")) {
            this.setState({
                routeComponent: this.state.routeComponent,
                userComponent: "Shipping Information"
            })
        } else if (window.location.href.includes("/dashboard/user/billing-information")) {
            this.setState({
                routeComponent: this.state.routeComponent,
                userComponent: "Billing Information"
            })
        } else if (window.location.href.includes("/dashboard/user/subscription")) {
            this.setState({
                routeComponent: this.state.routeComponent,
                userComponent: "Subscription"
            })
            await this.getSubscriptionIfExist();
        } else if (window.location.href.includes("/dashboard/user/order-history")) {
            this.setState({
                routeComponent: this.state.routeComponent,
                userComponent: "Order History"
            })
        }

    }

    populateUsername = async () => {
        this.setState({
            username: localStorage.getItem("username")
        })
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
        } else if (this.state.selectedSubscriptionPlanName !== "") {
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
                onChangeDeliveryTimeHandler={this.onChangeDeliveryTimeHandler.bind(this)}
                isSubscriptionSaved={this.state.isSubscriptionSaved}
                totalAmount={this.state.totalAmount}
                shippingCost={this.state.shippingCost}
                shippingCostPerServing={this.state.shippingCostPerServing}
                calculateSubscriptionPlanPrice={this.calculateSubscriptionPlanPrice}
                isSubscriptionExist={this.state.isSubscriptionExist}
                subscriptionInfo={this.state.subscriptionInfo}
            />
        } else if (this.state.routeComponent === "Payment") {
            routeComponent = <Payment
                isUserDashboard={true}
                onSubmitRoute={this.onSubmitRoute}
            />
        } else if (this.state.routeComponent === "Payment Successful") {
            routeComponent = <PaymentSuccessful
                isUserDashboard={true}
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