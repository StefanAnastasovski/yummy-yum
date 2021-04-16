import React, {Component} from "react";

import './WeeklyMenu.css';

import Menu from "./Menu";
import MenuCalls from "../../../../../repository/get/getMenu";


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
        customizeCardIndex: ""
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

        }).catch(function (error) {
            console.log(error)
            err = true;
        })

        if (err)
            this.setState({
                isMenuExist: false
            })

        return !err;
    }

    async componentDidMount() {

        window.scrollTo(0, 0);

        let [month, mondayDate, year] = this.getMondayInWeek();
        await this.setDate();

        let menu = await this.populateMenuName(year, month, mondayDate);

        if (menu) {
            await this.createAllMenus();
            // await this.isMenuExist()
        }

        this.isLoading();


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
        await this.createAllMenus()
        this.isLoading();

    }

    switchToCustomize = (event) => {
        this.setState({
            customizeCardIndex: event
        })
    }

    // setRedirect = (mealName) => {
    //     this.setState({
    //         redirect: true,
    //         mealName: mealName
    //
    //     })
    // }
    //
    // renderRedirect = () => {
    //     if (this.state.redirect) {
    //         // let path = `/weekly-menu/meal-recipe/${mealName}`
    //         return <Redirect to={`/meals/2${this.state.mealName}`}/>
    //     }
    // }

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

    customizeItCardOnClickHandler = (event, cardIdNumber) => {
        let temp = JSON.parse(localStorage.getItem("mealRecipe"));
        let id = null;
        temp.forEach((item, index) => {
            if (item.cardIdNumber === cardIdNumber) {
                id = index
            }
        })
        let obj = temp[id];
        obj.customizeItOption = event.target.value;
        localStorage.setItem("mealRecipe", JSON.stringify(temp))

    }

    addToCartHandler = (cardId, mealInfo, mealImg) => {

        let array = JSON.parse(localStorage.getItem("shoppingCartItems"));
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
            cardIndex: array.length,
            servings: "1",
            deliveryDate: deliveryDate,
            deliveryTime: "08:00 AM - 08:30 AM",
            customizeIt: customizeItOption
        }
        array.push(obj)
        localStorage.setItem("shoppingCartItems", JSON.stringify(array))
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

    decreaseServings = (cardID) => {
        let array = JSON.parse(localStorage.getItem("shoppingCartItems"));

        array.forEach((item) => {
            if (cardID === item.menuCardIndex) {
                if (parseInt(item.servings) > 1) {
                    item.servings--;
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
                            increaseServings={this.increaseServings.bind(this)}
                            decreaseServings={this.decreaseServings.bind(this)}
                            // getMainRecipeImage={this.getMainRecipeImage.bind(this)}
                        />

                    </div> : null

                }
            </div>
        )
    }

}

export default WeeklyMenu;