import React, {Component} from "react";

import './WeeklyMenu.css';

import Menu from "./Menu";
import MenuCalls from "../../../../../repository/get/getMenu";
import SubscriptionCalls from "../../../../../repository/get/getSubscription";


class WeeklyMenu extends Component {

    state = {
        mealFilter: "Mix",
        showMealFilterClass: "",
        showMealFilterBtnForm: "",
        weekMonth: "",
        showMealFilter: false,
        weekMonthName: "",
        weekSelect: "",
        weekSelectDate: "",
        // redirect: false,
        mealRecipes: [],
        objMeals: [],
        obj: {},
        isMix: true,
        menu: [],
        mixMenu: [],
        loading: true,
        // isMixMenuCreated: false,
        menuCards: [],
        isMenuExist: true,
        menuName: "",
        isCustomizeCard: false,
        isUserSubscribed: false,
        userSubscriptionData: {},
        subscriptionAllowedDays: {
            days: [],
            dates: [],
            time: []
        }
    }

    async componentDidMount() {

        window.scrollTo(0, 0);

        let [month, mondayDate, year] = this.getMondayInWeek();
        await this.setDate();

        let menu = await this.populateMenuName(year, month, mondayDate);
        if (menu) {
            await this.createAllMenus();
            await this.isUserSubscribed();
            // await this.isMenuExist()
        }

        this.isLoading();


    }

    getDayOfWeek = (date) => {
        let day = date.getDay();
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        return {'dayNumber': day, 'day': days[day]}
    }

    getDateFromString = (date) => {
        let array = date.split("-");
        return new Date(array[0], (array[1] - 1), array[2]);
    }

    numberOfDaysBetweenTwoDates = (date1, date2) => {
        let Difference_In_Time = date1.getTime() - date2.getTime();
        return Difference_In_Time / (1000 * 3600 * 24);
    }

    generateSubscriptionAllowedDates = async (startDate, numberOfAllowedDays) => {

        let year, month, day;
        year = startDate.getUTCFullYear();
        month = (startDate.getMonth() - 1);
        day = startDate.getDate();

        let array = [];


        for (let i = 0; i < numberOfAllowedDays; i++) {
            if (array.length > 0) {
                year = array[array.length - 1].getUTCFullYear();
                month = array[array.length - 1].getMonth();
                day = array[array.length - 1].getDate();
                array.push(new Date(year, month, (day + 1)));
            } else {
                array.push(new Date(year, month, (day + 1)));
            }
        }

        return array;
    }

    checkThePeriodOfSubscription = async () => {

        let activationDate = this.state.userSubscriptionData.activationDate;
        let cancellationDate = this.state.userSubscriptionData.canceledDate;

        let menuStartDateArray = this.state.menuName.split("-").slice(1,);
        let menuStartDate = menuStartDateArray.join("-");
        let menuEndDate = new Date(parseInt(menuStartDateArray[0]),
            (parseInt(menuStartDateArray[1]) - 1),
            (parseInt(menuStartDateArray[2]) + 6));
        let monthEndDate = (menuEndDate.getMonth() + 1);
        let dayEndDate = menuEndDate.getDate();

        if (monthEndDate < 10) {
            monthEndDate = '0' + monthEndDate;
        }
        if (dayEndDate < 10) {
            dayEndDate = '0' + dayEndDate;
        }

        menuEndDate = `${menuEndDate.getFullYear()}-${monthEndDate}-${dayEndDate}`;

        let cancellationDateValue = this.getDateFromString(cancellationDate);
        let activationDateValue = this.getDateFromString(activationDate);
        let menuStartDateValue = this.getDateFromString(menuStartDate);
        let menuEndDateValue = this.getDateFromString(menuEndDate);

        const daysUTC = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        let allowedDays = [];
        let dates = [];

        if (cancellationDateValue > menuEndDateValue) {
            if (activationDateValue < menuStartDateValue) {
                allowedDays = [...daysUTC];
                dates = await this.generateSubscriptionAllowedDates(menuStartDateValue, allowedDays.length)
                this.setState({
                    isUserSubscribed: true,
                    subscriptionAllowedDays: {
                        days: allowedDays,
                        dates: dates
                    }
                })
            } else if (activationDateValue > menuStartDateValue && activationDateValue < menuEndDateValue) {
                let dayOfWeek = this.getDayOfWeek(activationDateValue);
                allowedDays = [...daysUTC].slice(dayOfWeek.dayNumber, daysUTC.length);
                dates = await this.generateSubscriptionAllowedDates(activationDateValue, allowedDays.length)
                this.setState({
                    isUserSubscribed: true,
                    subscriptionAllowedDays: {
                        days: allowedDays,
                        dates: dates
                    }
                })
            }
        } else if (cancellationDateValue < menuEndDateValue && cancellationDateValue > menuStartDateValue) {
            if (activationDateValue < menuStartDateValue) {
                let dayOfWeek = this.getDayOfWeek(cancellationDateValue);
                allowedDays = [...daysUTC].slice(0, dayOfWeek.dayNumber);
                dates = await this.generateSubscriptionAllowedDates(menuStartDateValue, allowedDays.length)
                this.setState({
                    isUserSubscribed: true,
                    subscriptionAllowedDays: {
                        days: allowedDays,
                        dates: dates
                    }
                })
            } else if (activationDateValue >= menuStartDateValue && activationDateValue < menuEndDateValue) {
                let activationDayOfWeekActivation = this.getDayOfWeek(activationDateValue);
                let cancellationDayOfWeek = this.getDayOfWeek(cancellationDateValue);
                allowedDays = [...daysUTC].slice(activationDayOfWeekActivation.dayNumber, cancellationDayOfWeek.dayNumber);
                dates = await this.generateSubscriptionAllowedDates(menuStartDateValue, allowedDays.length)
                this.setState({
                    isUserSubscribed: true,
                    subscriptionAllowedDays: {
                        days: allowedDays,
                        dates: dates
                    }
                })
            }
        } else if (cancellationDateValue < menuStartDateValue) {
            //Do nothing
            allowedDays = [];
            dates = [];
            this.setState({
                isUserSubscribed: false,
                subscriptionAllowedDays: {
                    days: allowedDays,
                    dates: dates
                }
            })
        } else {
            //Do nothing
            allowedDays = [];
            dates = [];
            this.setState({
                isUserSubscribed: false,
                subscriptionAllowedDays: {
                    days: allowedDays,
                    dates: dates
                }
            })
        }

    }

    isUserSubscribed = async () => {
        await this.getSubscriptionInformationIfExist();
        if (Object.keys(this.state.userSubscriptionData).length !== 0) {
            localStorage.setItem("subscription", JSON.stringify(this.state.userSubscriptionData))
            await this.checkThePeriodOfSubscription();
        } else {
            localStorage.setItem("subscription", JSON.stringify({}));
            this.setState({
                isUserSubscribed: false
            })
        }
    }

    getSubscriptionInformationIfExist = async () => {
        try {
            await SubscriptionCalls.fetchSubscriptionByUsername(localStorage.getItem("username")).then(response => {
                if (response.data) {
                    this.setState(prevState => ({
                        isUserSubscribed: true,
                        userSubscriptionData: {
                            ...prevState.userSubscriptionData,
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

    onClickMealFilter = (event) => {
        if (event.target.value === "Mix") {
            this.setState({
                mealFilter: event.target.value,
                showMealFilterClass: "",
                isMix: true,
                showMealFilterBtnForm: ""
            });
        } else {
            this.setState({
                mealFilter: event.target.value,
                showMealFilterClass: "",
                isMix: false,
                showMealFilterBtnForm: ""
            });

        }

    }

    onClickShowMealFilter = () => {
        if (this.state.showMealFilterClass.length > 0) {
            this.setState({
                showMealFilter: !this.state.showMealFilter,
                showMealFilterClass: "",
                showMealFilterBtnForm: ""
            })
        } else {
            this.setState({
                showMealFilter: !this.state.showMealFilter,
                showMealFilterClass: "d-block",
                showMealFilterBtnForm: "ddm-btn-bottom-border-radius"
            })
        }


    }

    getMenuByMenuName = async (menuName) => {
        let err = false;

        await MenuCalls.fetchMenuByMenuName(menuName).then((response) => {
            this.setState({
                menu: response.data.mealCategories,
                isMenuExist: true
            })

        }).catch((error) => {
            console.log(error)
            err = true;
        })

        if (err)
            this.setState({
                isMenuExist: false
            })

        return !err;
    }

    populateMenuName = async (year, month, day) => {
        month = (month + 1);
        if (month < 10) {
            month = "0" + month
        }
        if (day < 10) {
            day = "0" + day
        }
        let menuName = "M-" + year + "-" + month + "-" + day;
        this.setState({
            menuName: menuName
        })
        return await this.getMenuByMenuName(menuName);
    }

    setDate = async () => {
        let [month, mondayDate] = this.getMondayInWeek();
        let mondayDateWithSuffix = this.addDateSuffix(mondayDate);
        let monthName = this.addMonthName(month);
        let date = [mondayDate, month, mondayDateWithSuffix, monthName];
        this.setState({
            weekSelect: "Week Of Monday, " + monthName + " " + mondayDateWithSuffix,
            weekSelectDate: mondayDate,
            weekMonth: month
        })

        return date;

    }

    createAllMenus = async () => {
        let allMenu = [];
        let menu;
        let mealsLength = this.state.menu.length;

        if (mealsLength === 6) {
            this.setState({
                mixMenu: [this.state.menu[0].meals]
            })
            for (let i = 1; i < mealsLength; i++) {
                menu = this.state.menu[i].meals;
                allMenu.push(menu);
            }
            this.setState({
                menu: allMenu
            })
        }

    }

    getMondayInWeek = () => {
        let currentDate = new Date();
        let month = currentDate.getMonth();
        let monthDate = currentDate.getDate();
        let year = currentDate.getFullYear();
        let dayInMonth = new Date(year, month, monthDate);
        let dayInMonthNumber = dayInMonth.getDay();
        let fullDate;

        if (dayInMonthNumber === 0) {
            fullDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 6);
            monthDate = fullDate.getDate();
            month = fullDate.getMonth();
        } else {
            let mondayInWeek = (dayInMonthNumber - 1);
            monthDate = monthDate - mondayInWeek;
            if (monthDate < 0) {
                let newDate = new Date(year, month, 0)
                monthDate = newDate.getDate() - (Math.abs(monthDate));
                month = month - 1;
            }
        }

        return [month, monthDate, year];

    }

    addDateSuffix = (date) => {

        let mondayDate = date;
        let mondayDateWithSuffix;
        let dateLength = date.toString().length;

        if (parseInt(date.toString()[dateLength - 1]) === 1) {
            mondayDateWithSuffix = mondayDate + "st";
        } else if (parseInt(date.toString()[dateLength - 1]) === 2) {
            mondayDateWithSuffix = mondayDate + "nd";
        } else if (parseInt(date.toString()[dateLength - 1]) === 3) {
            mondayDateWithSuffix = mondayDate + "rd";
        } else {
            mondayDateWithSuffix = mondayDate + "th";
        }

        return mondayDateWithSuffix;

    }

    addMonthName = (month) => {

        let monthNumber = month;
        let monthNames = ['January', 'February',
            'March', 'April',
            'May', 'June',
            'July', 'August',
            'September', 'October',
            'November', 'December'];

        return monthNames[monthNumber];

    }

    onClickNextWeek = async () => {
        this.setState({
            loading: true
        })
        let weekSelectDateState = this.state.weekSelectDate;
        let weekMonth = this.state.weekMonth;
        let newCurrentDate = new Date(new Date().getFullYear(), weekMonth, weekSelectDateState);
        let nextWeekDate = new Date(newCurrentDate.getFullYear(), weekMonth, weekSelectDateState + 7);
        await this.populateSliderDate(nextWeekDate);
        await this.createAllMenus()
        await this.isUserSubscribed();
        this.isLoading();

    }

    populateSliderDate = async (date) => {
        await this.populateMenuName(date.getFullYear(), date.getMonth(), date.getDate()).then(r => null)
        this.setState({
            weekSelectDate: date.getDate(),
            weekSelect: "Week Of Monday, " +
                this.addMonthName(date.getMonth()) +
                " " + this.addDateSuffix(date.getDate()),
            weekMonth: date.getMonth()
        })
    }

    onClickPreviousWeek = async () => {
        this.setState({
            loading: true
        })
        let weekSelectDateState = this.state.weekSelectDate;
        let weekMonth = this.state.weekMonth;
        let newCurrentDate = new Date(new Date().getFullYear(), weekMonth, weekSelectDateState);
        let previousWeekDate = new Date(newCurrentDate.getFullYear(), weekMonth, weekSelectDateState - 7);
        await this.populateSliderDate(previousWeekDate);
        await this.createAllMenus();
        await this.isUserSubscribed();
        this.isLoading();

    }

    switchToCustomize = (event) => {
        this.setState({
            customizeCardIndex: event
        })
    }

    isMenuExist = () => {
        this.setState(prevState => ({
            isMenuExist: !prevState.isMenuExist
        }))

    }

    isLoading = () => {
        this.setState(prevState => ({
            loading: !prevState.loading
        }))

    }

    customizeItCardOnClickHandler = (event, cardIdNumber, mealName, mealMenuName) => {
        let temp = JSON.parse(localStorage.getItem("mealRecipe"));
        let id = null;
        temp.forEach((item, index) => {
            if (item.cardIdNumber === cardIdNumber) {
                id = index
            }
        })
        let obj;
        if (id !== null) {
            obj = temp[id];
            obj.customizeItOption = event.target.value;
        } else {
            obj = {
                "mealName": mealName,
                "menuName": mealMenuName,
                "cardIdNumber": cardIdNumber,
                "customizeItOption": "Default"
            }
            temp.push(obj);
        }
        localStorage.setItem("mealRecipe", JSON.stringify(temp))
        let shopItems = JSON.parse(localStorage.getItem("shoppingCartItems"))
        shopItems.forEach((item, index) => {
            if (cardIdNumber === item.menuCardIndex) {
                item.customizeIt = event.target.value;
            }
        })
        localStorage.setItem("shoppingCartItems", JSON.stringify(shopItems));
        this.forceUpdate();
    }

    addToCartHandler = (cardId, mealInfo, mealImg) => {

        let shoppingCartItems = JSON.parse(localStorage.getItem("shoppingCartItems"));
        let mealRecipe = JSON.parse(localStorage.getItem("mealRecipe"));
        if (!mealRecipe) {
            localStorage.setItem("mealRecipe", JSON.stringify([]))
            mealRecipe = JSON.parse(localStorage.getItem("mealRecipe"));
        }
        let customizeItOption = "Default";
        mealRecipe.forEach(item => {
            if (item.cardIdNumber === cardId) {
                customizeItOption = item.customizeItOption
            }
        })
        let mealMenuDate = this.state.menuName.split("-");
        let newMenuDate = new Date(parseInt(mealMenuDate[1]),
            parseInt(mealMenuDate[2]) - 1,
            parseInt(mealMenuDate[3]))

        let currentDate = new Date();

        let deliveryDate;
        if (!newMenuDate.getTime() > currentDate.getTime()) {
            if (new Date().getDay() === 0) {
                deliveryDate = new Date().toLocaleString('default', {month: 'long'}) + " "
                    + (new Date().getDate()) + ", " + new Date().getFullYear();

            } else {
                deliveryDate = new Date().toLocaleString('default', {month: 'long'}) + " "
                    + (new Date().getDate() + 1) + ", " + new Date().getFullYear();
            }
        } else {
            let date = new Date(parseInt(mealMenuDate[1]), parseInt(mealMenuDate[2]) - 1, parseInt(mealMenuDate[3]))
            deliveryDate = date.toLocaleString('default', {month: 'long'}) + " " + date.getDate() + ", " + date.getFullYear();
        }

        let obj = {
            menuCardIndex: cardId,
            img: {
                alt: mealImg.alt,
                cookingStep: mealImg.cookingStep,
                isChefImg: mealImg.isChefImg,
                isMainRecipeImg: mealImg.isMainRecipeImg,
                url: mealImg.url
            },
            mealName: mealInfo.mealName,
            pricePerUnit: mealInfo.price,
            price: mealInfo.price,
            mealMenuDate: mealMenuDate[2] + "-" + mealMenuDate[3] + "-" + mealMenuDate[1],
            cardIndex: shoppingCartItems.length,
            servings: 1,
            deliveryDate: deliveryDate,
            deliveryTime: "08:00 AM - 08:30 AM",
            customizeIt: customizeItOption
        }
        shoppingCartItems.push(obj)
        localStorage.setItem("shoppingCartItems", JSON.stringify(shoppingCartItems))
    }

    setCorrectDeliveryDate = (mealMenuDate, deliveryDayNumber) => {
        let subscription = JSON.parse(localStorage.getItem("subscription"));
        let mondayDate = mealMenuDate.split("-");
        mondayDate = new Date(mondayDate[1], mondayDate[2] - 1, mondayDate[3]);

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
            mondayDate.getDate() + days[subscription.weeklyDeliveryDays[deliveryDayNumber]]);

        return deliveryDate.toLocaleString('default', {month: 'long'}) + " " +
            (deliveryDate.getDate()) + ", " + deliveryDate.getFullYear();

    }

    scheduleAMealHandler = (cardId, mealInfo, mealImg) => {

        //Data
        let subscription = JSON.parse(localStorage.getItem("subscription"));
        let mealRecipe = JSON.parse(localStorage.getItem("mealRecipe"));
        let scheduleCartItems;

        if (localStorage.getItem("scheduleCartItems")) {
            scheduleCartItems = JSON.parse(localStorage.getItem("scheduleCartItems"));
        } else {
            localStorage.setItem("scheduleCartItems", JSON.stringify([]));
            scheduleCartItems = [];
        }
        let customizeItOption = "Default";
        let deliveryDate;
        let deliveryTime;
        let mealMenuDate = this.state.menuName.split("-");

        //Set Data
        mealRecipe.forEach(item => {
            if (item.cardIdNumber === cardId) {
                customizeItOption = item.customizeItOption
            }
        })

        deliveryDate = this.setCorrectDeliveryDate(this.state.menuName, scheduleCartItems.length);

        deliveryTime = this.state.userSubscriptionData.deliveryTime[scheduleCartItems.length];

        mealMenuDate = `${mealMenuDate[2]}-${mealMenuDate[3]}-${mealMenuDate[1]}`;

        //Add Item To Cart

        let obj = {
            menuCardIndex: cardId,
            img: {
                alt: mealImg.alt,
                cookingStep: mealImg.cookingStep,
                isChefImg: mealImg.isChefImg,
                isMainRecipeImg: mealImg.isMainRecipeImg,
                url: mealImg.url
            },
            mealName: mealInfo.mealName,
            pricePerUnit: 0,
            price: 0,
            mealMenuDate: mealMenuDate,
            cardIndex: scheduleCartItems.length,
            servings: parseInt(subscription.servingsPerMeal),
            deliveryDate: deliveryDate,
            deliveryTime: deliveryTime,
            customizeIt: customizeItOption,
            isSubscriptionItem: true
        }
        scheduleCartItems.push(obj)
        localStorage.setItem("scheduleCartItems", JSON.stringify(scheduleCartItems))


    }

    populateMealNameLocalStorage = (mealName, cardIDNumber, mealCategory) => {
        let menuName = this.state.menuName.split("-");

        let mealMenuDate = menuName[2] + "-" + menuName[3] + "-" + menuName[1];
        let obj = {
            mealName: mealName,
            mealMenuDate: mealMenuDate,
            cardIdNumber: mealCategory[0] + cardIDNumber
        }
        localStorage.setItem("mealInfo", JSON.stringify(obj));
        this.forceUpdate();
    }

    removeItemFromCart = (cardID) => {
        let array = JSON.parse(localStorage.getItem("shoppingCartItems"));

        array.forEach((item, index) => {
            if (cardID === item.menuCardIndex) {
                array.splice(index, 1);
            }
        })

        localStorage.setItem("shoppingCartItems", JSON.stringify(array));
        this.forceUpdate();
    }

    removeItemFromScheduleItems = (cardID) => {
        let array = JSON.parse(localStorage.getItem("scheduleCartItems"));

        array.forEach((item, index) => {
            if (cardID === item.menuCardIndex) {
                array.splice(index, 1);
            }
        })

        localStorage.setItem("scheduleCartItems", JSON.stringify(array));
        this.forceUpdate();
    }

    decreaseServings = (cardID) => {
        let array = JSON.parse(localStorage.getItem("shoppingCartItems"));

        array.forEach((item) => {
            if (cardID === item.menuCardIndex) {
                if (parseInt(item.servings) > 1) {
                    item.servings--;
                    item.price = item.pricePerUnit * item.servings;
                }
            }
        })

        localStorage.setItem("shoppingCartItems", JSON.stringify(array));
        this.forceUpdate();
    }

    increaseServings = (cardId) => {
        let array = JSON.parse(localStorage.getItem("shoppingCartItems"));

        array.forEach((item) => {
            if (cardId === item.menuCardIndex) {
                if (parseInt(item.servings) > 1 || parseInt(item.servings) === 1) {
                    item.servings = parseInt(item.servings) + 1;
                    item.price = item.pricePerUnit * item.servings;
                }
            }
        })

        localStorage.setItem("shoppingCartItems", JSON.stringify(array));
        this.forceUpdate();
    }

    render() {

        return (

            <div className="weekly-menu-wrapper">

                {/*{!this.state.loading ?*/}

                {
                    !this.state.loading ? <div className="container">

                        <Menu
                            customizeItCardOnClickHandler={this.customizeItCardOnClickHandler.bind(this)}
                            addToCartHandler={this.addToCartHandler.bind(this)}
                            mealFilter={this.state.mealFilter}
                            showMealFilterBtnForm={this.state.showMealFilterBtnForm}
                            showMealFilterClass={this.state.showMealFilterClass}
                            // redirect={this.renderRedirect}
                            onClickPreviousWeek={this.onClickPreviousWeek.bind(this)}
                            onClickNextWeek={this.onClickNextWeek.bind(this)}
                            onClickMealFilter={this.onClickMealFilter.bind(this)}
                            onClickShowMealFilter={this.onClickShowMealFilter.bind(this)}
                            populateMealInfoOnClick={this.populateMealNameLocalStorage.bind(this)}
                            weekSelect={this.state.weekSelect}
                            mixRows={this.state.mixMenu}
                            menu={this.state.menu}
                            mealMenuName={this.state.menuName}
                            mealMenuFilter={this.state.mealFilter}
                            isMix={this.state.isMix}
                            isMenuExist={this.state.isMenuExist}
                            setRedirect={this.setRedirect}
                            customizeCardClicked={this.switchToCustomize.bind(this)}
                            customizeCardIndex={this.state.customizeCardIndex}
                            removeItemFromCart={this.removeItemFromCart.bind(this)}
                            removeItemFromScheduleItems={this.removeItemFromScheduleItems.bind(this)}
                            increaseServings={this.increaseServings.bind(this)}
                            decreaseServings={this.decreaseServings.bind(this)}
                            isUserSubscribed={this.state.isUserSubscribed}
                            userSubscriptionData={this.state.userSubscriptionData}
                            scheduleAMealHandler={this.scheduleAMealHandler.bind(this)}
                            // getMainRecipeImage={this.getMainRecipeImage.bind(this)}
                        />

                    </div> : null

                }
            </div>

        )
    }

}

export default WeeklyMenu;