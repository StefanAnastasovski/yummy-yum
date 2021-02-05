import React, {Component} from "react";
import {Redirect} from "react-router";

import './WeeklyMenu.css';

import Menu from "./Menu";
import MenuCalls from "../../../../../repository/get/getMenu";


class WeeklyMenu extends Component {

    state = {
        mealFilter: "Mix",
        showMealFilterClass: "",
        showMealFilterBtnForm: "",
        weekMonth: "",
        weekMonthName: "",
        weekSelect: "",
        weekSelectDate: "",
        redirect: false,
        mealRecipes: [],
        objMeals: [],
        obj: {},
        mealRecipe: {
            mealName: "",
            mealDescription: "",
            mealTimeTag: "",
            mealIngredientTag: "",
            price: 6.99,
            mealCategory: "",
            mealOverview: {
                difficultyLevel: "",
                spiceLevel: "",
                prepCookTime: "",
                cookWithin: 1
            },
            mealChef: {
                fullName: "",
                chefMealDescription: ""
            },
            mealBox: {
                serveQuantity: 2,
                mealIngredients: ""
            },
            mealBoxNutrition: {
                calories: 0,
                protein: 0,
                carbohydrates: 0,
                fat: 0
            },
            cookingSteps: {
                stepNumber: 1,
                stepTitle: "",
                stepDescription: ""
            },
            recipeSteps: {
                mealUtensilsRow1: "",
                mealUtensilsRow2: ""
            },
            recipeInstructions: {
                cookSteps: "",
                guidelines: "",
                customizeInstructions: ""
            }
        },
        isMix: true,
        menu: [],
        mixMenu: [],
        loading: true,
        menuCards: []

    }

    onClickMealFilter = (event) => {
        console.log(event.target)
        if (event.target.value === "Mix") {
            this.setState({
                mealFilter: event.target.value,
                showMealFilterClass: "",
                isMix: true
            });
        } else {
            this.setState({
                mealFilter: event.target.value,
                showMealFilterClass: "",
                isMix: false,
            });

        }

    }

    onClickShowMealFilter = () => {

        let showFilter = this.state.showMealFilterClass;
        if (showFilter === "") {

            this.setState({
                showMealFilter: !this.state.showMealFilter,
                showMealFilterClass: "d-block",
                showMealFilterBtnForm: "ddm-btn-bottom-border-radius"
            })

        } else {
            this.setState({
                showMealFilter: !this.state.showMealFilter,
                showMealFilterClass: "",
                showMealFilterBtnForm: ""
            })
        }

    }

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     return !nextState.loading;
    // }

    getMenuByMenuName = async (menuName) => {

        await MenuCalls.fetchMenuByMenuName(menuName).then((response) => {

            this.setState({
                menu: response.data.mealCategories
            })

        }).catch(function (error) {
            console.log(error)
        })
        // });
        return this.state.menu;
    }

    getRndInteger = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    async componentDidMount() {

        window.scrollTo(0, 0);

        await this.getMenuByMenuName("M1");
        await this.createMixMenu();
        await this.createAllMenus();
        await this.setDate();
        await this.isLoadingDone()


        // this.createMixMealMenu();


    }

    setDate = async () => {
        let [mondayDate, month] = this.getMondayInWeek();
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

    createMixMenu = async () => {
        let obj = {};
        let mixMenu = [];
        let mealCategoryLength;
        let mealsLength;
        let isElementExistInArray = false;
        let isElementExistInArrayNext = false;

        let i = 0;

        while (i < 9) {

            isElementExistInArray = false;
            isElementExistInArrayNext = false;
            mealCategoryLength = this.getRndInteger(0, 4);
            mealsLength = this.getRndInteger(0, 8);

            obj = {
                category: this.state.menu[mealCategoryLength].category,
                meal: this.state.menu[mealCategoryLength].meals[mealsLength]
            }

            if (mixMenu.length === 0) {
                mixMenu.push(obj);
                i++;
            }

            if (mixMenu.length > 0) {

                for (let q = 0; q < mixMenu.length; q++) {

                    if (mixMenu[q].meal.mealName === obj.meal.mealName) {
                        isElementExistInArrayNext = true;
                    }

                    if (!isElementExistInArray && isElementExistInArrayNext) {
                        isElementExistInArray = isElementExistInArrayNext
                    }

                }

                if (!isElementExistInArray) {
                    mixMenu.push(obj);
                    i++;
                }

            }

        }


        this.setState({
            mixMenu: mixMenu
        })

        return mixMenu
    }

    createAllMenus = async () => {

        let allMenu = [];
        let menu;
        let mealsLength = this.state.menu.length;
        console.log(this.state.menu)
        for (let i = 0; i < mealsLength; i++) {
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
        let dayInMonth = new Date(currentDate.getFullYear(), month, monthDate);
        let dayInMonthNumber = dayInMonth.getDay();
        let fullDate;

        if (dayInMonthNumber === 0) {
            fullDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 6);
            monthDate = fullDate.getDate();
            month = fullDate.getMonth();
        } else {
            let mondayInWeek = (dayInMonthNumber - 1);
            monthDate = monthDate - mondayInWeek;
        }

        return [monthDate, month];

    }

    addDateSuffix = (date) => {

        let mondayDate = date;
        let mondayDateWithSuffix;

        if (mondayDate === 1) {
            mondayDateWithSuffix = mondayDate + "st";
        } else if (mondayDate === 2) {
            mondayDateWithSuffix = mondayDate + "nd";
        } else if (mondayDate === 3) {
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

    onClickNextWeek = () => {

        let weekSelectDateState = this.state.weekSelectDate;
        let weekMonth = this.state.weekMonth;
        let newCurrentDate = new Date(new Date().getFullYear(), weekMonth, weekSelectDateState);
        let previousWeekDate = new Date(newCurrentDate.getFullYear(), weekMonth, weekSelectDateState + 7);

        this.setState({
            weekSelectDate: previousWeekDate.getDate(),
            weekSelect: "Week Of Monday, " + this.addMonthName(previousWeekDate.getMonth()) + " " + this.addDateSuffix(previousWeekDate.getDate()),
            weekMonth: previousWeekDate.getMonth()
        })

    }

    onClickPreviousWeek = () => {

        let weekSelectDateState = this.state.weekSelectDate;
        let weekMonth = this.state.weekMonth;
        let newCurrentDate = new Date(new Date().getFullYear(), weekMonth, weekSelectDateState);
        let previousWeekDate = new Date(newCurrentDate.getFullYear(), weekMonth, weekSelectDateState - 7);

        this.setState({
            weekSelectDate: previousWeekDate.getDate(),
            weekSelect: "Week Of Monday, " +
                this.addMonthName(previousWeekDate.getMonth()) +
                " " + this.addDateSuffix(previousWeekDate.getDate()),
            weekMonth: previousWeekDate.getMonth()
        })

    }

    setRedirect = (mealName) => {
        console.log("Set Rediredct")
        console.log(mealName)
        this.setState({
            redirect: true,
            mealName: mealName

        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            // let path = `/weekly-menu/meal-recipe/${mealName}`
            return <Redirect to={`/meals/2${this.state.mealName}`}/>
        }
    }

    isLoadingDone = () => {
        this.setState({
            loading: false
        })

    }

    render() {
        console.log("redirect: " + this.state.redirect);
        console.log("redirect: " + this.state.mealName);
        return (

            <div className="weekly-menu-wrapper">

                {/*{!this.state.loading ?*/}

                <div className="container">

                    <Menu
                        mealFilter={this.state.mealFilter}
                        showMealFilterBtnForm={this.state.showMealFilterBtnForm}
                        showMealFilterClass={this.state.showMealFilterClass}
                        redirect={this.renderRedirect}
                        onClickPreviousWeek={this.onClickPreviousWeek.bind(this)}
                        onClickNextWeek={this.onClickNextWeek.bind(this)}
                        onClickMealFilter={this.onClickMealFilter.bind(this)}
                        onClickShowMealFilter={this.onClickShowMealFilter.bind(this)}
                        weekSelect={this.state.weekSelect}
                        mixRows={this.state.mixMenu}
                        menu={this.state.menu}
                        mealName={this.state.mealName}
                        mealMenuName={this.state.mealFilter}
                        isMix={this.state.isMix}
                        setRedirect={this.setRedirect}
                    />

                </div>

            </div>
        )
    }

}

export default WeeklyMenu;