import React, {Component} from "react";

import './WeeklyMenu.css';
import PreviousWeekIcon from "./WeekIcons/PreviousWeekIcon";
import NextWeekIcon from "./WeekIcons/NextWeekIcon";
import WeeklyMenuCard from "./WeeklyMenuCard/WeeklyMenuCard";

class WeeklyMenu extends Component {

    state = {
        mealFilter: "Mix",
        showMealFilterClass: "",
        showMealFilterBtnForm: "",
        weekMonth: "",
        weekMonthName: "",
        weekSelect: "",
        weekSelectDate: ""
    }

    onClickMealFilter = (event) => {
        this.setState({
            mealFilter: event.target.value,
            showMealFilterClass: "",
        });

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

    componentDidMount() {
        let [mondayDate, month] = this.getMondayInWeek();
        let mondayDateWithSuffix = this.addDateSuffix(mondayDate);
        let monthName = this.addMonthName(month);
        this.setState({
            weekSelect: "Week Of Monday, " + monthName + " " + mondayDateWithSuffix,
            weekSelectDate: mondayDate,
            weekMonth: month
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

    onClickNextWeek = (e) => {

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

    onClickPreviousWeek = (e) => {

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

    render() {

        let rowNumbers = 3;
        let itemNumbers = 3;
        let rows = [];

        for (let i = 0; i < rowNumbers; i++) {

            let items = [];
            for (let j = 0; j < itemNumbers; j++) {
                items.push(
                    <div className="col m-3">
                        <WeeklyMenuCard/>
                    </div>
                )
            }
            rows.push(
                <div className="row">
                    {items}
                </div>
            );
        }

        return (

            <div className="weekly-menu-wrapper">

                <div className="container">

                    <h1 className="text-center py-5">Weekly Menu</h1>

                    <div className="wm-nav d-flex justify-content-between">

                        <h3 className="">Meal Kits</h3>

                        <div className="wm-nav-right-menu d-flex align-items-center w-50 justify-content-end">

                            <h4 className="pr-3">Meal Filter: </h4>

                            <div className="wm-nav-ddm-main">

                                <ul className="wm-ddm-main">

                                    <li>
                                        <input type="submit" onClick={this.onClickShowMealFilter}
                                               value={this.state.mealFilter}
                                               className={"wm-ddm-btn font-size-1 " +
                                               this.state.showMealFilterBtnForm}/>
                                    </li>

                                    <li>

                                        <ul className={"dd-menu " + this.state.showMealFilterClass}>

                                            <li>
                                                <input type="submit" onClick={this.onClickMealFilter}
                                                       value="Mix"
                                                       className="wm-ddm-btn font-size-1"/>
                                            </li>
                                            <li>
                                                <input type="submit" onClick={this.onClickMealFilter}
                                                       value="Adventurous"
                                                       className="wm-ddm-btn font-size-1"/>
                                            </li>
                                            <li>
                                                <input type="submit" onClick={this.onClickMealFilter}
                                                       value="Quick and Simple"
                                                       className="wm-ddm-btn font-size-1"/>
                                            </li>
                                            <li>
                                                <input type="submit" onClick={this.onClickMealFilter}
                                                       value="Low-Cal"
                                                       className="wm-ddm-btn font-size-1"/>
                                            </li>
                                            <li>
                                                <input type="submit" onClick={this.onClickMealFilter}
                                                       value="Carb-Conscious"
                                                       className="wm-ddm-btn font-size-1"/>
                                            </li>
                                            <li>
                                                <input type="submit" onClick={this.onClickMealFilter}
                                                       value="Vegetarian"
                                                       className="wm-ddm-btn font-size-1"/>
                                            </li>

                                        </ul>

                                    </li>

                                </ul>

                            </div>

                        </div>

                    </div>

                    <div className="wm-menu-cards">

                        <div className="row">

                            {rows}

                        </div>

                    </div>

                    <div className="wm-week-slider d-flex justify-content-center py-5">

                        <div className="wm-icon" onClick={this.onClickPreviousWeek}>
                            <PreviousWeekIcon/>
                        </div>

                        <div>
                            <h3>{this.state.weekSelect}</h3>
                        </div>

                        <div className="wm-icon" onClick={this.onClickNextWeek}>
                            <NextWeekIcon/>
                        </div>

                    </div>

                </div>

            </div>

        )
    }

}

export default WeeklyMenu;