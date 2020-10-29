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
        let mondayDate = this.getMondayInWeek();
        let mondayDateWithSuffix = this.addDateSuffix(mondayDate);
        let monthName = this.addMonthName(new Date().getMonth());
        this.setState({
            weekSelect: "Week Of Monday, " + monthName + " " + mondayDateWithSuffix,
            weekSelectDate: mondayDate
        })
    }

    // componentWillUpdate(nextProps, nextState, nextContext) {
    //     console.log(nextProps);
    //     console.log(nextState);
    // }

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //
    //
    //     if(this.state.weekSelectDate === ""){
    //
    //     }
    //     else if (this.state.weekSelectDate !== nextState.weekSelectDate) {
    //         let weekSelectDate = this.state.weekSelectDate;
    //         console.log(weekSelectDate)
    //         let mondayDateWithSuffix = this.addDateSuffix(weekSelectDate);
    //         let monthName = this.addMonthName(new Date().getMonth());
    //         this.setState(prevState => ({
    //             weekSelect: "Week Of Monday, " + monthName + " " + mondayDateWithSuffix,
    //         }))
    //         console.log(this.state.weekSelectDate)
    //         return true;
    //
    //     }
    //
    //
    //     console.log("currentWeekSelectDate");
    //     console.log(this.state.weekSelectDate)
    //     console.log("nextWeekSelectDate");
    //     console.log(nextState.weekSelectDate)
    //
    //     return true;
    // }

    getMondayInWeek = () => {
        let currentDate = new Date();
        let dayInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        let monthDate = dayInMonth.getDate();
        let dayInMonthNumber = dayInMonth.getDay();

        if (dayInMonthNumber === 0) {
            monthDate = monthDate - 6;
        } else {
            let mondayInWeek = (dayInMonthNumber - 1);
            monthDate = monthDate - mondayInWeek;
        }

        return monthDate;
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
        let newCurrentDate = new Date();
        let nextWeekDate = new Date(newCurrentDate.getFullYear(), newCurrentDate.getMonth(), weekSelectDateState + 7).getDate()

        this.setState({
            weekSelectDate: nextWeekDate
        })

    }

    onClickPreviousWeek = (e) => {

        let weekSelectDateState = this.state.weekSelectDate;
        let newCurrentDate = new Date();
        let previousWeekDate = new Date(newCurrentDate.getFullYear(), newCurrentDate.getMonth(), weekSelectDateState - 7).getDate()

        this.setState({
            weekSelectDate: previousWeekDate,
            weekSelect: "Week Of Monday, " + newCurrentDate.getMonth() + " " + previousWeekDate
        })
    }

    render() {

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

                            <div className="col m-3">
                                <WeeklyMenuCard/>
                            </div>

                            <div className="col m-3">
                                <WeeklyMenuCard/>
                            </div>

                            <div className="col m-3">
                                <WeeklyMenuCard/>
                            </div>


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
;

export default WeeklyMenu;