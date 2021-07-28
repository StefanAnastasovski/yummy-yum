import React, {Component} from "react";

import "./Cart.css";
import OrderCart from "./Order Cart/OrderCart";
import OrderSummary from "./Order Summary/OrderSummary";

import OrderMealsCalls from "./../../../../../repository/get/getOrderMeals";
import postOrderInfo from '../../../../../repository/post/postOrderInfo';
import postOrderMeals from "../../../../../repository/post/postOrderMeals";


class Cart extends Component {

    state = {
        items: [],
        orderSummary: {
            "meals": 0,
            "servings": 0,
            "deliveryDays": ["/"],
            "subtotal": 0.00,
            "shipping": 0.00,
            "total": 0.00,
            "items": []
        },
        loading: true,
        loadingReceipt: true,
        isSomethingChanged: false,
        allowToContinueCheckout: true,
        redirectToCheckoutError: "",
        scheduleMealError: "",
        scheduleMealMonthlyError: [],
        showScheduleBtn: false,
        subscriptionOrderedMeals: [],
    }

    async componentDidMount() {
        await this.populateItems();

        if (this.state.items.length !== 0)
            await this.populateReceipt();


        this.allowToContinueCheckout();
    }

    getOrderMeals = async (startDate, endDate) => {

        let isSubscription = true;

        try {
            await OrderMealsCalls.fetchOrderMealsBetweenDatesAndIsSubscription(startDate, endDate, isSubscription)
                .then((response) => {
                    if (response.data) {
                        this.setState({
                            subscriptionOrderedMeals: response.data
                        })
                    }

                })
        } catch (e) {
            console.log(e);
        }
    }

    createOrderInfo = async () => {
        let orderInfo = JSON.parse(localStorage.getItem("scheduleCartItems"))
        let subscription = JSON.parse(localStorage.getItem("subscription"))
        let orderId = this.generateOrderID();
        let obj = {
            mealNumber: parseInt(orderInfo.length),
            servingNumber: parseInt((orderInfo.length) * (subscription.servingsPerMeal)),
            subtotal: 0,
            shippingCost: 0,
            total: 0,
            orderId: orderId,
            user: {
                username: localStorage.getItem("username")
            }
        }

        await postOrderInfo.createOrderInfo(obj).then(response => {
// console.log({message: "The OrderInfo is successfully created!"})
        }).catch(error => {
            console.log(error);
        })

        return orderId;

    }

    createOrderMeals = async (orderId) => {

        let orderMealItems = JSON.parse(localStorage.getItem("scheduleCartItems"))

        let orderMeals = [];
        orderMealItems.forEach(item => {
            orderMeals.push(this.orderSubscriptionMealObject(item));
        })

        let obj = {
            orderMeals: orderMeals
        }
//
        await postOrderMeals.createOrderMeals(obj, orderId).then(response => {
// console.log({message: "The OrderMeals is successfully created!"})
        }).catch(error => {
            console.log(error);
        })

        this.redirectToSchedule();
    }

    generateOrderID = () => {
        let dateToday = new Date();
        let randNumber = Math.floor(100000 + Math.random() * 900000);
        return dateToday.getFullYear().toString() +
            (dateToday.getMonth() + 1).toString() +
            dateToday.getDate().toString() + randNumber;
    }

    convertStringToDate = (date) => {

        let array = [];

        date.split(',').forEach((dateItems, index) => {
            if (index === 0) {
                let temp = dateItems.split(" ");
                temp.forEach((item) => {
                    array.push(item.trim());
                })
            } else if (index === 1) {
                array.push(dateItems.trim());
            }
        })

        const months = {
            "January": 0,
            "February": 1,
            "March": 2,
            "April": 3,
            "May": 4,
            "June": 5,
            "July": 6,
            "August": 7,
            "September": 8,
            "October": 9,
            "November": 10,
            "December": 11
        };

        array[0] = months[array[0]];

        if (parseInt(array[0] + 1) < 10) {
            array[0] = '0' + parseInt(array[0] + 1);
        }
        if (parseInt(array[1]) < 10) {
            array[1] = '0' + parseInt(array[1]);
        }

        let newDate = [array[2], array[0], array[1]];

        return newDate.join("-");

    }

    orderSubscriptionMealObject = (orderMeal) => {
        let mealMenuDate = orderMeal.mealMenuDate.split("-");
        let menuName = "M-" + mealMenuDate[2] + "-" + mealMenuDate[1] + "-" + mealMenuDate[0];
        let newDate = this.convertStringToDate(orderMeal.deliveryDate);
        return {
            mealName: orderMeal.mealName,
            menuName: menuName,
            servings: parseInt(JSON.parse(localStorage.getItem("subscription")).servingsPerMeal),
            customizeIt: orderMeal.customizeIt,
            price: 0,
            deliveryTime: orderMeal.deliveryTime,
            deliveryDate: newDate,
            isSubscription: true
        };
    }

    allowToContinueCheckout = () => {

        let cartItems = JSON.parse(localStorage.getItem("shoppingCartItems"));
        let flag = false;

        cartItems.forEach(item => {

            if (!flag) {

                let dateValues = item.mealMenuDate.split("-");
                let cartDate = new Date(dateValues[2], dateValues[0] - 1, dateValues[1]);
                let temp = new Date().getDay() !== 0 || ((new Date().getTime() < cartDate.getTime()) ||
                    (new Date().getDay() === 0 && new Date().getHours() < 6));

                if (!temp) {
                    flag = true;
                    this.setState({
                        allowToContinueCheckout: false
                    })
                }

            }

        })
    }

    separateMealsByWeeks = async (storageType, data) => {

        let numberOfDifferentWeeks = 1;
        let mealMenuDates = [];
        let localStorageItems = [];
        let databaseItems = [];

        if (storageType === "localStorage") {

            let mealMenuDate = data[0].mealMenuDate;
            mealMenuDates.push(mealMenuDate);

            data.forEach(item => {
                if (mealMenuDate !== item.mealMenuDate) {
                    mealMenuDate = item.mealMenuDate;
                    if (!mealMenuDates.includes(mealMenuDate)) {
                        numberOfDifferentWeeks++;
                        mealMenuDates.push(mealMenuDate);
                    }
                }
            })

            for (let i = 0; i < numberOfDifferentWeeks; i++) {
                localStorageItems[i] = {
                    mealMenuDate: mealMenuDates[i],
                    meals: []
                };
            }

            data.forEach(item => {
                mealMenuDates.forEach((mealMenuDate, mealMenuDateIndex) => {
                    if (item.mealMenuDate === mealMenuDate) {
                        localStorageItems[mealMenuDateIndex].meals.push(item);
                    }
                })
            })

        } else if (storageType === "database") {

            data.forEach(item => {
                let mealMenuDate = item.menuName.split("-").slice(1,);
                mealMenuDate = `${mealMenuDate[2]}-${mealMenuDate[1]}-${mealMenuDate[0]}`;
                if (!mealMenuDates.includes(mealMenuDate)) {
                    mealMenuDates.push(mealMenuDate)
                }
            })

            for (let i = 0; i < mealMenuDates.length; i++) {
                databaseItems[i] = {
                    mealMenuDate: mealMenuDates[i],
                    meals: []
                };
            }

            data.forEach(item => {
                mealMenuDates.forEach((mealMenuDate, mealMenuDateIndex) => {
                    let tempMealMenuDate = item.menuName.split("-").slice(1,);
                    tempMealMenuDate = `${tempMealMenuDate[2]}-${tempMealMenuDate[1]}-${tempMealMenuDate[0]}`;
                    if (tempMealMenuDate === mealMenuDate) {
                        databaseItems[mealMenuDateIndex].meals.push(item);
                    }
                })
            })

        }

        return {
            localStorageItems: localStorageItems,
            databaseItems: databaseItems
        };

    }

    allowToContinueSchedule = async () => {

        //DATA & SET
        let subscription = JSON.parse(localStorage.getItem("subscription"));
        let scheduleCartItems = JSON.parse(localStorage.getItem("scheduleCartItems"));
        // let userInformation = JSON.parse(localStorage.getItem("userInformation")).subscriptionPlanValues;

        let weeklyAllowedNumberOfMeals = subscription.numberOfWeeklyMeals * subscription.numberOfWeeklyDeliveryDays;
        let startDate = subscription.activationDate;
        let endDate = subscription.canceledDate;
        let scheduledMeals;
        // let differentNumberOfWeeks;
        // let isNumberOfAllowedMealsValid = false;
        // let weeklyAllowedNumberOfDays = subscription.numberOfWeeklyDeliveryDays

        let subscriptionType = subscription.subscriptionType;

        //SET
        // await this.getOrderMeals(startDate, endDate);

        if (!subscription.isCanceled) {
            scheduledMeals = this.state.subscriptionOrderedMeals;
            if (subscriptionType === "Weekly") {
                await this.getOrderMeals(startDate, endDate);
                scheduledMeals = this.state.subscriptionOrderedMeals;
                if (scheduledMeals.length + scheduleCartItems.length < weeklyAllowedNumberOfMeals) {
                    let orderId = await this.createOrderInfo();
                    await this.createOrderMeals(orderId);
                } else if (scheduledMeals.length + scheduleCartItems.length === weeklyAllowedNumberOfMeals) {
                    let orderId = await this.createOrderInfo();
                    await this.createOrderMeals(orderId);
                } else {
                    await this.getOrderMeals(startDate, endDate);
                    scheduledMeals = this.state.subscriptionOrderedMeals;
                    if (scheduledMeals.length === weeklyAllowedNumberOfMeals) {
                        this.setState({
                            scheduleMealError: `You reach the limit!`
                        })
                    } else {
                        this.setState({
                            scheduleMealError: `You can schedule 
                        ${(weeklyAllowedNumberOfMeals - scheduledMeals.length)} more meals. 
                        Please, schedule the right number of meals! You need to remove 
                                ${scheduleCartItems.length - scheduledMeals.length -
                            weeklyAllowedNumberOfMeals}
                           meal(s).`
                        })
                    }
                }
            } else if (subscriptionType === "Monthly") {

                //Data

                let mealsToBeScheduled = (await this.separateMealsByWeeks("localStorage",
                    JSON.parse(localStorage.getItem("scheduleCartItems")))).localStorageItems;

                await this.getOrderMeals(startDate, endDate);

                let scheduledMeals = (await this.separateMealsByWeeks("database",
                    this.state.subscriptionOrderedMeals)).databaseItems;

                // let isReadyToContinue = false;
                let isScheduledMealsExist = scheduledMeals.length > 0;
                // Set

                //Checking
                this.scheduleMealsMonthlyHandler(mealsToBeScheduled, scheduledMeals,
                    isScheduledMealsExist, weeklyAllowedNumberOfMeals);

            }

        }

    }

    mealScheduleErrorHandler = (scheduleMealMonthlyError, mealsToBeScheduled,
                                mealsToBeScheduledList, message) => {

        if (scheduleMealMonthlyError.length === 0) {
            mealsToBeScheduled.forEach(item => {
                scheduleMealMonthlyError.push({
                    week: item.mealMenuDate,
                    message: ""
                })
            })
            this.setState({
                scheduleMealMonthlyError: scheduleMealMonthlyError
            })
        }
        scheduleMealMonthlyError.forEach((errorItem, errorIndex) => {
            if (errorItem.week === mealsToBeScheduledList.mealMenuDate) {
                scheduleMealMonthlyError[errorIndex].message = message;
            }
        })
        this.setState({
            scheduleMealMonthlyError: [...scheduleMealMonthlyError].sort((a, b) => a.week.localeCompare(b.week))
        })
    }

    mealScheduleErrorIfIsScheduledMealsExist = (scheduledMeals, scheduledMealsIndex,
                                                weeklyAllowedNumberOfMeals, scheduleMealMonthlyError,
                                                mealsToBeScheduled, mealsToBeScheduledList,
                                                isScheduledMealsListExist) => {

        if (mealsToBeScheduled.length !== scheduledMeals.length) {
            let biggerArray;
            let lowerArray;
            if (mealsToBeScheduled.length >= scheduledMeals.length) {
                biggerArray = mealsToBeScheduled;
                lowerArray = scheduledMeals;
            } else {
                biggerArray = scheduledMeals;
                lowerArray = mealsToBeScheduled;
            }

            biggerArray.forEach((itemBiggerArray, indexBiggerArray) => {
                let found = false;
                lowerArray.forEach((itemLowerArray, indexLowerArray) => {
                    if (itemBiggerArray.mealMenuDate === itemLowerArray.mealMenuDate) {
                        found = true;
                    }
                })
                if (!found) {
                    scheduleMealMonthlyError.forEach((errorItem, errorIndex) => {
                        // console.log(errorItem)
                    })
                }
            })
        }

        if (isScheduledMealsListExist) {
            //show message if the all meals are already scheduled for the selected week
            if (scheduledMeals[scheduledMealsIndex].meals.length === weeklyAllowedNumberOfMeals) {
                let message = `The limit is reached! 
                            You can't schedule more meals for the selected week. Please remove them to continue.`;
                this.mealScheduleErrorHandler(scheduleMealMonthlyError, mealsToBeScheduled,
                    mealsToBeScheduledList, message);
            } else if (mealsToBeScheduledList.meals.length > 0 &&
                ((mealsToBeScheduledList.meals.length
                    + scheduledMeals[scheduledMealsIndex].meals.length)
                    > weeklyAllowedNumberOfMeals)) {
                //show message if some meals are already scheduled for the selected week,
                // but the total number is grater than the allowed number of meals that can be scheduled
                let message = `You can schedule 
                        ${(weeklyAllowedNumberOfMeals - scheduledMeals[scheduledMealsIndex].meals.length)} more meal(s). 
                        Please, schedule the right number of meals! You need to remove 
                        ${mealsToBeScheduledList.meals.length - (weeklyAllowedNumberOfMeals
                    - scheduledMeals[scheduledMealsIndex].meals.length)} meal(s).`;
                this.mealScheduleErrorHandler(scheduleMealMonthlyError, mealsToBeScheduled,
                    mealsToBeScheduledList, message);
            }
        } else {
            let message = `You can schedule ${(weeklyAllowedNumberOfMeals)} more meal(s). 
                        Please, schedule the right number of meals! You need to remove 
                        ${mealsToBeScheduledList.meals.length - weeklyAllowedNumberOfMeals}
                        meal(s).`;
            this.mealScheduleErrorHandler(scheduleMealMonthlyError, mealsToBeScheduled,
                mealsToBeScheduledList, message);
        }
    }

    scheduleMealsMonthlyHandler = async (mealsToBeScheduled, scheduledMeals,
                                         isScheduledMealsExist, weeklyAllowedNumberOfMeals) => {

        let canScheduleMeals = false;
        if (isScheduledMealsExist) {

            let scheduledMealsIndex = 0
            let isScheduledMealsListExist = false;
            let scheduleMealMonthlyError = this.state.scheduleMealMonthlyError;

            mealsToBeScheduled.forEach((mealsToBeScheduledList, index) => {

                canScheduleMeals = false;

                //set the index of the correct meals array
                isScheduledMealsListExist = false;
                scheduledMeals.forEach((item, index) => {
                    if (mealsToBeScheduledList.mealMenuDate === item.mealMenuDate) {
                        scheduledMealsIndex = index;
                        isScheduledMealsListExist = true;
                    }
                })

                if (weeklyAllowedNumberOfMeals - scheduledMeals[scheduledMealsIndex].meals.length
                    === mealsToBeScheduledList.meals.length) {
                    let message = ``;
                    this.mealScheduleErrorHandler(scheduleMealMonthlyError, mealsToBeScheduled,
                        mealsToBeScheduledList, message);
                    canScheduleMeals = true;
                }

                this.mealScheduleErrorIfIsScheduledMealsExist(scheduledMeals, scheduledMealsIndex,
                    weeklyAllowedNumberOfMeals, scheduleMealMonthlyError,
                    mealsToBeScheduled, mealsToBeScheduledList, isScheduledMealsListExist)


            })

            if (canScheduleMeals) {
                let orderId = await this.createOrderInfo();
                await this.createOrderMeals(orderId);
            }

        } else if (!isScheduledMealsExist) {
            let scheduleMealMonthlyError = this.state.scheduleMealMonthlyError;
            canScheduleMeals = false;
            let arrayOfErrors = [];
            mealsToBeScheduled.forEach((mealsToBeScheduledList, index) => {
                canScheduleMeals = false;
                if (mealsToBeScheduledList.meals.length <= weeklyAllowedNumberOfMeals) {
                    if (scheduleMealMonthlyError.length > 0) {
                        scheduleMealMonthlyError.forEach((item, index) => {
                            if (item.week === mealsToBeScheduledList.mealMenuDate) {
                                scheduleMealMonthlyError[index].message = "";
                            }
                        })
                        this.setState({
                            scheduleMealMonthlyError: scheduleMealMonthlyError
                        })
                    }
                    canScheduleMeals = true;
                } else if (mealsToBeScheduledList.meals.length > weeklyAllowedNumberOfMeals) {

                    let message = `You can schedule 
                        ${(weeklyAllowedNumberOfMeals - scheduledMeals.length)} more meal(s). 
                        Please, schedule the right number of meals! You need to remove 
                                ${mealsToBeScheduledList.meals.length - scheduledMeals.length -
                    weeklyAllowedNumberOfMeals}
                           meal(s).`;
                    this.mealScheduleErrorHandler(scheduleMealMonthlyError, mealsToBeScheduled,
                        mealsToBeScheduledList, message);
                    canScheduleMeals = false;
                }
                arrayOfErrors.push(canScheduleMeals);
            });

            if (arrayOfErrors.includes(false)===false) {
                let orderId = await this.createOrderInfo();
                await this.createOrderMeals(orderId);
            }

            if (scheduledMeals + mealsToBeScheduled < weeklyAllowedNumberOfMeals) {
            }
        }

    }

    redirectToCheckout = () => {
        if (this.state.allowToContinueCheckout) {
            window.location.href = "/cart/checkout"
        } else {
            this.setState({
                redirectToCheckoutError: "Remove meals that you can't order, please!"
            })
        }
    }

    redirectToSchedule = () => {
        if (this.state.allowToContinueCheckout) {
            window.location.href = "/cart/schedule"
        } else {
            this.setState({
                redirectToCheckoutError: "Remove meals that you can't order, please!"
            })
        }
    }

    calculateShipping = (servings) => {
        if (servings > 0 && servings <= 2) {
            return 5.99;
        } else if (servings > 2 && servings <= 10) {
            return servings * 1.99;
        } else if (servings > 10) {
            return servings * 1.22;
        }
    }

    populateReceipt = async () => {
        let array = JSON.parse(localStorage.getItem("shoppingCartItems"));
        let orderSummary
        if (array.length > 0) {
            let meals = 0;
            let servings = 0;
            let deliveryDays = [];
            let subtotal = 0;

            array.forEach((item) => {
                meals++;
                servings += parseInt(item.servings);
                deliveryDays.push(item.deliveryDate + " / " + item.deliveryTime)
                subtotal += item.price;
            });

            let shipping = await this.calculateShipping(servings);

            orderSummary = {
                "meals": meals,
                "servings": servings,
                "deliveryDays": deliveryDays,
                "subtotal": parseFloat(subtotal.toFixed(2)),
                "shipping": parseFloat(shipping.toFixed(2)),
                "total": parseFloat((subtotal + shipping).toFixed(2)),
                "items": array

            }

        } else {
            orderSummary = {
                "meals": 0,
                "servings": 0,
                "deliveryDays": ["/"],
                "subtotal": 0.00,
                "shipping": 0.00,
                "total": 0.00,
                "items": []
            }
        }
        localStorage.setItem("orderSummary", JSON.stringify(orderSummary))
        this.setState({
            isSomethingChanged: false,
            orderSummary: orderSummary,
            loadingReceipt: false
        })

    }

    convertDayInAWeekToDate = (mealMenuDate, deliveryDay) => {
        let mondayDate = mealMenuDate.split("-");
        mondayDate = new Date(mondayDate[2], (mondayDate[0] - 1), mondayDate[1]);

        let days = {
            "Monday": 0,
            "Tuesday": 1,
            "Wednesday": 2,
            "Thursday": 3,
            "Friday": 4,
            "Saturday": 5,
            "Sunday": 6
        }

        let deliveryDate = new Date(mondayDate.getUTCFullYear(), mondayDate.getMonth(),
            mondayDate.getDate() + days[deliveryDay])

        return deliveryDate.toLocaleString('default', {month: 'long'}) + " " +
            (deliveryDate.getDate()) + ", " + deliveryDate.getFullYear();

    }

    populateItems = async () => {
        let items;
        let shoppingCartItems = JSON.parse(localStorage.getItem("shoppingCartItems"));
        shoppingCartItems = shoppingCartItems.map((item, index) => {
            let mealMenuDate = item.mealMenuDate;
            return {
                "img": {
                    "url": item.img.url,
                    "alt": item.img.alt,
                    "cookingStep": item.img.cookingStep,
                    "isChefImg": item.img.isChefImg,
                    "isMainRecipeImg": item.img.isMainRecipeImg
                },
                "mealName": item.mealName,
                "price": parseFloat(item.price),
                "mealMenuDate": mealMenuDate,
                "pricePerUnit": parseFloat(item.pricePerUnit),
                "cardIndex": index,
                "menuCardIndex": item.menuCardIndex,
                "servings": parseInt(item.servings),
                "deliveryDate": item.deliveryDate,
                "deliveryTime": item.deliveryTime,
                "customizeItOption": item.customizeIt,
                "isSubscriptionItem": false
            }
        })
        let scheduleCartItems = JSON.parse(localStorage.getItem("scheduleCartItems"));
        let subscription = JSON.parse(localStorage.getItem("subscription"));
        if (Object.keys(subscription).length !== 0) {
            scheduleCartItems = scheduleCartItems.map((item, index) => {
                let mealMenuDate = item.mealMenuDate;
                let dates = this.populateDates(mealMenuDate);
                let deliveryDate = this.convertDayInAWeekToDate(item.mealMenuDate, subscription.weeklyDeliveryDays[index])
                if (!dates.includes(deliveryDate)) {
                    scheduleCartItems[index].deliveryDate = dates[0];
                    localStorage.setItem("scheduleCartItems", JSON.stringify(scheduleCartItems));
                }

                return {
                    "img": {
                        "url": item.img.url,
                        "alt": item.img.alt,
                        "cookingStep": item.img.cookingStep,
                        "isChefImg": item.img.isChefImg,
                        "isMainRecipeImg": item.img.isMainRecipeImg
                    },
                    "mealName": item.mealName,
                    "price": 0,
                    "mealMenuDate": mealMenuDate,
                    "pricePerUnit": 0,
                    "cardIndex": index,
                    "menuCardIndex": item.menuCardIndex,
                    "servings": parseInt(subscription.servingsPerMeal),
                    "deliveryDate": scheduleCartItems[index].deliveryDate,
                    "deliveryTime": subscription.deliveryTime[index],
                    "customizeItOption": item.customizeIt,
                    "isSubscriptionItem": true
                }
            })
        } else {
            scheduleCartItems = [];
        }

        items = shoppingCartItems.concat(scheduleCartItems);
        this.setState({
            items: items,
            loading: false,
        })

        await this.populateReceipt();
    }

    increaseServingHandler = async (index) => {
        let shoppingCartItems = JSON.parse(localStorage.getItem("shoppingCartItems"));

        let array = [...this.state.items];

        shoppingCartItems[index].servings = array[index].servings = array[index].servings + 1;
        shoppingCartItems[index].price = array[index].price = parseFloat((array[index].servings * array[index].pricePerUnit).toFixed(2));

        localStorage.setItem("shoppingCartItems", JSON.stringify(shoppingCartItems))
        this.setState({
            items: array,
        })
        await this.populateReceipt();
    }

    decreaseServingHandler = async (index) => {
        let shoppingCartItems = JSON.parse(localStorage.getItem("shoppingCartItems"));

        let array = [...this.state.items];
        if (array[index].servings > 1) {
            shoppingCartItems[index].servings = array[index].servings = array[index].servings - 1;
            shoppingCartItems[index].price = array[index].price = parseFloat((array[index].servings * array[index].pricePerUnit).toFixed(2));
        }
        localStorage.setItem("shoppingCartItems", JSON.stringify(shoppingCartItems))
        this.setState({
            items: array,
        })
        await this.populateReceipt();
    }

    servingOnChangeHandler = async (event) => {
        let splitName = event.target.name.split("-");
        let index = parseInt(splitName[2]);
        let array = [...this.state.items];
        array[index].servings = parseInt(event.target.value);
        array[index].price = parseFloat((array[index].servings * array[index].pricePerUnit).toFixed(2));
        this.setState({
            items: array,
        })

        await this.populateReceipt();
    }

    cardHandler = (event) => {
        let patternIncrease = new RegExp("increase-serving");
        let patternDecrease = new RegExp("decrease-serving");

        let splitName = event.target.name.split("-");
        let index = parseInt(splitName[2]);

        if (patternIncrease.test(event.target.name)) {
            this.increaseServingHandler(index)
        } else if (patternDecrease.test(event.target.name)) {
            this.decreaseServingHandler(index)
        }

    }

    removeHandler = async (index) => {
        let items;
        let shoppingCartItems = JSON.parse(localStorage.getItem("shoppingCartItems"));
        let scheduleCartItems = JSON.parse(localStorage.getItem("scheduleCartItems"));
        items = shoppingCartItems.concat(scheduleCartItems);
        items.splice(index, 1)
        let shoppingCartValues = [...items].slice(0, shoppingCartItems.length);
        let scheduleCartValues = [...items].slice(shoppingCartItems.length, items.length)
        localStorage.setItem("shoppingCartItems", JSON.stringify(shoppingCartValues));
        localStorage.setItem("scheduleCartItems", JSON.stringify(scheduleCartValues));
        this.setState({
            isSomethingChanged: true
        })
        await this.populateItems();
    }

    deliveryDateAndTimeHandler = async (event, index, deliveryType) => {
        let items;
        let shoppingCartItems = JSON.parse(localStorage.getItem("shoppingCartItems"));
        let scheduleCartItems = JSON.parse(localStorage.getItem("scheduleCartItems"));
        items = shoppingCartItems.concat(scheduleCartItems);
        if (deliveryType === "deliveryDate") {
            items[index].deliveryDate = event.target.value;
        } else if (deliveryType === "deliveryTime") {
            items[index].deliveryTime = event.target.value;
        }
        let shoppingCartValues = [...items].slice(0, shoppingCartItems.length);
        let scheduleCartValues = [...items].slice(shoppingCartItems.length, items.length)
        localStorage.setItem("shoppingCartItems", JSON.stringify(shoppingCartValues));
        localStorage.setItem("scheduleCartItems", JSON.stringify(scheduleCartValues));
        this.setState({
            isSomethingChanged: true,
            items: items
        })
    }

    populateDates = (mealMenuDate) => {

        let deliveryDates = [];

        let menuDate = mealMenuDate.split("-");

        let newDate = new Date(menuDate[2], menuDate[0] - 1, menuDate[1])

        let currentDate = new Date();

        if (currentDate.getTime() > newDate.getTime()
            || currentDate.getTime() === newDate.getTime()) {
            const month = currentDate.toLocaleString('default', {month: 'long'});
            let day = currentDate.getDate();
            let dayInWeek = currentDate.getDay();

            if (dayInWeek === 0) {
                let deliveryDate = month + " " + (day) + ", " + currentDate.getFullYear();
                deliveryDates.push(deliveryDate);
            }

            let iValue = dayInWeek + 1;
            if (currentDate.getHours() < 6) {
                iValue = dayInWeek;
                --day;
            }
            if (dayInWeek > 0 && dayInWeek <= 6) {
                for (let i = iValue; i <= 7; i++) {
                    let deliveryDate = month + " " + (++day) + ", " + currentDate.getFullYear();
                    deliveryDates.push(deliveryDate);
                }
            }
        } else if (currentDate.getTime() < newDate.getTime()) {
            const month = newDate.toLocaleString('default', {month: 'long'});
            let day = newDate.getDate();
            let dayInWeek = newDate.getDay();
            if (dayInWeek > 0 && dayInWeek <= 6) {
                if (dayInWeek === 1) {
                    for (let i = dayInWeek; i <= 7; i++) {
                        let deliveryDate = month + " " + (day++) + ", " + newDate.getFullYear();
                        deliveryDates.push(deliveryDate);
                    }
                } else {
                    let iValue = dayInWeek + 1;
                    if (currentDate.getHours() < 6) {
                        iValue = dayInWeek;
                        day--;
                    }
                    for (let i = iValue; i <= 7; i++) {
                        let deliveryDate = month + " " + (day++) + ", " + newDate.getFullYear();
                        deliveryDates.push(deliveryDate);
                    }
                }

            }
        }

        return deliveryDates;

    }

    setCorrectDeliveryDate = (index, correctDeliveryDate) => {
        let items = this.state.items;
        items[index].deliveryDate = correctDeliveryDate;

        this.setState({
            items: items

        })
    }

    render() {

        return (

            <div className="cart-wrapper">

                <div className="shopping-cart-title">

                    <h2 className="container">Shopping Cart</h2>

                </div>

                <div className="shopping-cart-wrapper">

                    <div className="container">

                        <div className="row d-flex flex-wrap">

                            <div className="col-9 shopping-cart-cards">

                                <ul className="list-unstyled">

                                    {

                                        !this.state.loading && this.state.items.length > 0 ? this.state.items.map((item, index) => {
                                                return <li key={index}>
                                                    <OrderCart
                                                        img={item.img}
                                                        cardInfo={item}
                                                        cardHandler={this.cardHandler}
                                                        servingOnChangeHandler={this.servingOnChangeHandler.bind(this)}
                                                        removeHandler={this.removeHandler.bind(this)}
                                                        allowToContinueSchedule={this.allowToContinueSchedule}
                                                        setCorrectDeliveryDate={this.setCorrectDeliveryDate.bind(this)}
                                                        deliveryDateAndTimeHandler={this.deliveryDateAndTimeHandler.bind(this)}
                                                        deliveryDateValue={item.deliveryDate}
                                                        deliveryTimeValue={item.deliveryTime}
                                                        customizeItOption={item.customizeItOption}
                                                        isSubscriptionItem={item.isSubscriptionItem}
                                                    />
                                                </li>
                                            }) :
                                            <li>
                                                <h2 className="text-center text-danger">Your Cart Is Empty</h2>
                                                <h4 className="text-center pt-2">Go to
                                                    <a href="/weekly-menu"
                                                       className="text-color-green text-decoration-none">
                                                        &nbsp;Our Plans&nbsp;
                                                    </a>
                                                    and taste one of our delicious meals!</h4>

                                            </li>

                                    }


                                </ul>

                            </div>

                            <div className="col-3 shopping-cart-checkout">

                                {!this.state.loadingReceipt && <OrderSummary
                                    redirectToCheckout={this.redirectToCheckout}
                                    redirectToSchedule={this.redirectToSchedule}
                                    allowToContinueSchedule={this.allowToContinueSchedule}
                                    redirectToCheckoutError={this.state.redirectToCheckoutError}
                                    allowCheckout={this.state.allowToContinueCheckout}
                                    orderSummary={this.state.orderSummary}
                                    scheduleMealError={this.state.scheduleMealError}
                                    scheduleMealMonthlyError={this.state.scheduleMealMonthlyError}
                                />
                                }

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        )

    }


}

export default Cart;