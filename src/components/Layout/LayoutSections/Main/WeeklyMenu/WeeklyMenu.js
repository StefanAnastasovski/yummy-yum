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
        showMealFilter: false,
        weekMonthName: "",
        weekSelect: "",
        weekSelectDate: "",
        // redirect: false,
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
        // isMixMenuCreated: false,
        menuCards: [],
        isMenuExist: true,
        menuName: ""
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
            console.log("catch error")
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

    onClickNextWeek = () => {

        let weekSelectDateState = this.state.weekSelectDate;
        let weekMonth = this.state.weekMonth;
        let newCurrentDate = new Date(new Date().getFullYear(), weekMonth, weekSelectDateState);
        let nextWeekDate = new Date(newCurrentDate.getFullYear(), weekMonth, weekSelectDateState + 7);
        this.populateSliderDate(nextWeekDate);

    }

    populateSliderDate = (date) => {
        this.populateMenuName(date.getFullYear(), date.getMonth(), date.getDate()).then(r => null)
        this.setState({
            weekSelectDate: date.getDate(),
            weekSelect: "Week Of Monday, " +
                this.addMonthName(date.getMonth()) +
                " " + this.addDateSuffix(date.getDate()),
            weekMonth: date.getMonth()
        })
    }

    onClickPreviousWeek = () => {

        let weekSelectDateState = this.state.weekSelectDate;
        let weekMonth = this.state.weekMonth;
        let newCurrentDate = new Date(new Date().getFullYear(), weekMonth, weekSelectDateState);
        let previousWeekDate = new Date(newCurrentDate.getFullYear(), weekMonth, weekSelectDateState - 7);
        this.populateSliderDate(previousWeekDate);
    }

    setRedirect = (mealName) => {
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

    render() {


        return (

            <div className="weekly-menu-wrapper">

                {/*{!this.state.loading ?*/}

                {
                    !this.state.loading ? <div className="container">

                        <Menu
                            mealFilter={this.state.mealFilter}
                            showMealFilterBtnForm={this.state.showMealFilterBtnForm}
                            showMealFilterClass={this.state.showMealFilterClass}
                            // redirect={this.renderRedirect}
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
                            isMenuExist={this.state.isMenuExist}
                            setRedirect={this.setRedirect}
                            // getMainRecipeImage={this.getMainRecipeImage.bind(this)}
                        />

                    </div> : null

                }
            </div>
        )
    }

}

export default WeeklyMenu;