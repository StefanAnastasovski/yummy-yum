import React, {Component} from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css'

import Switch from "react-switch";


class CreateMenu extends Component {


    state = {
        calendarValue: new Date(),
        isMenuCreated: false,
        isNextWeekMenuCreated: false,
        checked: false
    }

    onChangeCalendarValue = (event) => {

        this.setState({
            calendarValue: new Date(event.getUTCFullYear(),
                event.getMonth(),
                event.getDate())
        })

    }


    handleSubmit = (event) => {
        alert('A menu was created!');

        event.preventDefault();

    }


    handleChange() {
        this.setState(prevState => ({
            checked: !prevState.checked
        }));
    }

    render() {

        return (

            <div className="create-menu-wrapper py-5">

                <div className="button-go-back-to-dashboard">
                    <input type="button" className="btn-go-back-to-dashboard"
                           value="<< Go Back to Dashboard" onClick={this.props.onSubmitRoute}/>
                </div>

                <div className="cr-menu py-3 ">

                    <div className="row">

                        <div className="col text-right d-flex align-baseline justify-content-end">
                            <p className="pr-2">Generate Menu Automatically</p>
                            <Switch onChange={this.handleChange.bind(this)} checked={this.state.checked}/>
                        </div>

                    </div>

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
                            <h4 className="text-center">Is the Menu Created?</h4>
                            <p className="text-center text-color-green py-2">
                                <span className="bg-white px-4 py-2">
                                    {!this.state.isMenuCreated ? "YES" : "NO"}
                                </span>
                            </p>
                            <h4 className="text-center">Is the Next Week Menu Created?</h4>
                            <p className="text-center text-color-green py-2">
                                <span className="bg-white px-4 py-2">
                                    {!this.state.isMenuCreated ? "YES" : "NO"}
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
                                       value="Create Menu for the Next Week" onClick={this.handleSubmit}/>
                            </div>

                            <div className="col">
                                <input type="submit" className="btn-create-next-menu"
                                       value="Create Menu for the Next Two Week" onClick={this.handleSubmit}/>
                            </div>

                        </div>

                        <div className="row pt-3 text-center">

                            <div className="col">
                                <input type="submit" className="btn-create-next-menu"
                                       value="Create Menu for the Next 3 Week" onClick={this.handleSubmit}/>
                            </div>

                            <div className="col">
                                <input type="submit" className="btn-create-next-menu"
                                       value="Create Menu for the Whole Month" onClick={this.handleSubmit}/>
                            </div>

                        </div>

                    </form>

                </div>

            </div>

        )

    }

}

export default CreateMenu;