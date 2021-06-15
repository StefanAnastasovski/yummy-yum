import React, {Component} from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css'


import CreateMenuCalls from "../../../../../../../repository/post/postMenu";
import MenuCalls from "../../../../../../../repository/get/getMenu"

class CreateMenu extends Component {


    state = {
        calendarValue: new Date(),
        isMenuForSelectedDateCreated: false,
        isMenuCreated: false,
        isNextWeekMenuCreated: false,
        checked: false,
        isMenuForCurrentWeekExist: false
    }

    async componentDidMount() {
        let date = new Date();
        let mondayDateArray = await this.getMondayInWeek(new Date(date.getFullYear(), date.getMonth(), date.getDate()));
        await this.isMenuExistByMenuName(new Date(mondayDateArray[0], mondayDateArray[1], mondayDateArray[2]), false, true);
        await this.isMenuExistByMenuName(new Date(mondayDateArray[0], mondayDateArray[1], mondayDateArray[2] + 7), true);
    }

    //
    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     if (this.state.isMenuForSelectedDateCreated !== nextState.isMenuForSelectedDateCreated ||
    //         this.state.isNextWeekMenuCreated !== nextState.isNextWeekMenuCreated ||
    //         this.state.isMenuForCurrentWeekExist !== nextState.isMenuForCurrentWeekExist
    //     )
    //          return true;
    //
    //     return true;
    // }

    onChangeCalendarValue = async (event) => {
        // this.state.isMenuForSelectedDateCreated

        let date = new Date(event.getUTCFullYear(),
            event.getMonth(),
            event.getDate())

        await this.setState({
            calendarValue: date,
            isMenuForSelectedDateCreated: false
        })

        let mondayDateArray = await this.getMondayInWeek(date);
        let newDate = new Date(mondayDateArray[0], mondayDateArray[1], mondayDateArray[2])
        await this.isMenuExistByMenuName(newDate, false);

    }

    getMondayInWeek = (date) => {
        // let date = new Date();
        let month = date.getMonth();
        let monthDate = date.getDate();
        let year = date.getFullYear();
        let dayInMonth = new Date(date.getFullYear(), month, monthDate);
        let dayInMonthNumber = dayInMonth.getDay();
        let fullDate;

        if (dayInMonthNumber === 0) {
            fullDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 6);
            monthDate = fullDate.getDate();
            month = fullDate.getMonth();
        } else {
            let mondayInWeek = (dayInMonthNumber - 1);
            monthDate = monthDate - mondayInWeek;
        }

        return [year, month, monthDate];

    }

    getDateOfNextMonday = (date) => {
        let month = date.getMonth();
        let monthDD = date.getDate();
        let year = date.getFullYear();

        let fullDate;
        let add7Days = 7;

        let dayOfWeek = date.getDay();

        if (dayOfWeek === 0) {
            fullDate = new Date(year, month, monthDD + 1);
        } else {
            fullDate = new Date(year, month, monthDD + add7Days - (dayOfWeek - 1))
        }

        month = fullDate.getMonth();
        year = fullDate.getFullYear();
        monthDD = fullDate.getDate()
        if (month < 10) {
            month = "0" + (month + 1);
        }
        if (monthDD < 10) {
            monthDD = "0" + monthDD;
        }

        fullDate = year + "-" + month + "-" + monthDD;
        return fullDate;
    }

    isMenuExistByMenuName = async (releaseDate, isNextWeekMenuCheck, isCurrentWeekExist) => {
        let month = (releaseDate.getMonth() + 1);
        let day = releaseDate.getDate();
        if (month < 10) {
            month = "0" + (releaseDate.getMonth() + 1);
        }
        if (day < 10) {
            day = "0" + releaseDate.getDate();
        }

        releaseDate = releaseDate.getFullYear() + "-" + month + "-" + day;
        let menuName = "M-" + releaseDate;

        await MenuCalls.fetchMenuByMenuName(menuName).then((response) => {
            if (isCurrentWeekExist) {
                this.setState({
                    isMenuForCurrentWeekExist: Object.keys(response.data).length > 0
                })
            }
            if (isNextWeekMenuCheck) {
                this.setState({
                    isNextWeekMenuCreated: Object.keys(response.data).length > 0
                })
            } else if (!isNextWeekMenuCheck) {
                this.setState({
                    isMenuForSelectedDateCreated: Object.keys(response.data).length > 0
                })
            }

        }).catch((error) => {
            console.log(error)
        })

    }

    createMenu = async (menu) => {
        await CreateMenuCalls.createMenu(menu).then(response => {
            console.log("Menu for the next week is created!");
        }).catch(error => {
            console.log(error);
        })
    }

    createMultipleMenus = async (date, dateOfNextMonday, buttonNameValue) => {

        let menuNumbers = parseInt(buttonNameValue.toString().split(" ")[1]);
        for (let i = 0; i < menuNumbers; i++) {
            await this.createMultipleMenus(date, dateOfNextMonday, i);

            let menu;
            if (i === 0) {
                menu = {
                    menuName: "M-" + dateOfNextMonday,
                    releaseDate: dateOfNextMonday
                }
            } else {
                dateOfNextMonday = await this.getDateOfNextMonday(new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate() + (7 * i))
                );
                menu = {
                    menuName: "M-" + dateOfNextMonday,
                    releaseDate: dateOfNextMonday
                }
            }
            await this.createMenu(menu);
        }
    }

    handleSubmit = async (event) => {
        let buttonNameValue = event.target.name;
        event.preventDefault();
        let date = new Date();
        let dateOfNextMonday;
        dateOfNextMonday = await this.getDateOfNextMonday(date);
        let menu;
        if (buttonNameValue === "Next Week") {

            menu = {
                menuName: "M-" + dateOfNextMonday,
                releaseDate: dateOfNextMonday
            }

            await this.createMenu(menu);

        } else if (buttonNameValue === "Next 2 Weeks") {
            await this.createMultipleMenus(date, dateOfNextMonday, buttonNameValue);
        } else if (buttonNameValue === "Next 3 Weeks") {
            await this.createMultipleMenus(date, dateOfNextMonday, buttonNameValue);
        } else if (buttonNameValue === "Next 4 Weeks") {
            await this.createMultipleMenus(date, dateOfNextMonday, buttonNameValue);
        }

    }

    // handleChange() {
    //     this.setState(prevState => ({
    //         checked: !prevState.checked
    //     }));
    // }

    render() {

        return (

            <div className="create-menu-wrapper py-5">

                <div className="button-go-back-to-dashboard">
                    <input type="button" className="btn-go-back-to-dashboard"
                           value="<< Go Back to Dashboard" onClick={this.props.onSubmitRoute}/>
                </div>

                <div className="cr-menu py-3 ">

                    {/*<div className="row">*/}

                    {/*    <div className="col text-right d-flex align-baseline justify-content-end">*/}
                    {/*        <p className="pr-2">Generate Menu Automatically</p>*/}
                    {/*        <Switch onChange={this.handleChange.bind(this)} checked={this.state.checked}/>*/}
                    {/*    </div>*/}

                    {/*</div>*/}

                    <div className="row py-3">

                        <div className="col">

                            <div className="p-5">
                                <Calendar
                                    onChange={this.onChangeCalendarValue}
                                    value={this.state.calendarValue}
                                />
                            </div>

                        </div>

                        <div className="col d-flex flex-column justify-content-center">
                            <h4 className="text-center">Is a Menu for the Current Week Created?</h4>
                            <p className="text-center text-color-green py-2">
                                <span className="bg-white px-4 py-2">
                                    {this.state.isMenuForCurrentWeekExist ? "YES" :
                                        <span className="text-danger">NO</span>}
                                </span>
                            </p>

                            <h4 className="text-center">Is the Next Week's Menu Created?</h4>
                            <p className="text-center text-color-green py-2">
                                <span className="bg-white px-4 py-2">
                                    {this.state.isNextWeekMenuCreated ? "YES" : <span className="text-danger">NO</span>}
                                </span>
                            </p>

                            <h4 className="text-center">Is the Menu for Selected Week Created?</h4>
                            <p className="text-center text-color-green py-2">
                                <span className="bg-white px-4 py-2">
                                    {this.state.isMenuForSelectedDateCreated ? "YES" :
                                        <span className="text-danger">NO</span>}
                                </span>
                            </p>
                        </div>

                    </div>

                    <form onSubmit={this.handleSubmit}>

                        <div className="row justify-content-center pb-4">
                            <h3>Create Menu</h3>
                        </div>

                        <div className="row text-center">

                            <div className="col">
                                <input type="submit" className="btn-create-next-menu"
                                       value="Create Next Week's Menu"
                                       name="Next Week"
                                       onClick={this.handleSubmit}/>
                            </div>

                            <div className="col">
                                <input type="submit" className="btn-create-next-menu"
                                       value="Create Next 2 Weeks' Menu"
                                       name="Next 2 Weeks"
                                       onClick={this.handleSubmit}/>
                            </div>

                        </div>

                        <div className="row pt-3 text-center">

                            <div className="col">
                                <input type="submit" className="btn-create-next-menu"
                                       value="Create Next 3 Weeks' Menu"
                                       name="Next 3 Weeks"
                                       onClick={this.handleSubmit}/>
                            </div>

                            <div className="col">
                                <input type="submit" className="btn-create-next-menu"
                                       value="Create Next 4 Weeks' Menu"
                                       name="Next 4 Weeks"
                                       onClick={this.handleSubmit}/>
                            </div>

                        </div>

                    </form>

                </div>

            </div>

        )

    }

}

export default CreateMenu;