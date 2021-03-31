import React, {Component} from "react";

import TopMenuInfo from "./Section4-Menus/TopMenuInfo";

import MenuCalls from "../../../../../../repository/get/getMenu";

class Section4 extends Component {

    state = {
        menuName: "Adventurous",
        chooseMenu: "Adventurous",
        showChooseMenu: false,
        showChooseMenuClass: "",
        showChooseMenuBtnForm: "",
        menu: [],
        loading: true

    }

    isLoading = () => {
        this.setState({
            loading: false
        })
    }

    async componentDidMount() {
        let [month, mondayDate, year] = this.getMondayInWeek();

        month = (month + 1);
        if (month < 10) {
            month = "0" + month
        }
        if (mondayDate < 10) {
            mondayDate = "0" + mondayDate
        }
        let menuName = "M-" + year + "-" + month + "-" + mondayDate;

        await this.getMenuByMenuName(menuName);
        this.isLoading();
        // console.log(this.state.menu.shift())
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

    getMenuByMenuName = async (menuName) => {

        await MenuCalls.fetchMenuByMenuName(menuName).then((response) => {
            response.data.mealCategories.shift();
            let filter = [];
            let obj = {}
            let meals;
            response.data.mealCategories.forEach((item, index) => {
                meals = [];
                for (let i = 0; i < 4; i++) {
                    meals.push(item.meals[i]);
                }
                obj = {
                    meals: meals
                }
                filter.push(obj)
            })
            this.setState({
                menu: filter
            })

        }).catch(function (error) {
            console.log(error)
        })
        // });
        return this.state.menu.length > 0;
    }

    onClickChooseMenu = (event) => {
        this.setState({
            chooseMenu: event.target.value,
            showChooseMenuClass: "",
            showChooseMenuBtnForm: ""
        });

    }

    onClickShowChooseMenu = () => {
        let showMenu = this.state.showChooseMenuClass;
        if (showMenu === "") {

            this.setState({
                showChooseMenu: !this.state.showChooseMenu,
                showChooseMenuClass: "d-block",
                showChooseMenuBtnForm: "ddm-btn-bottom-border-radius"
            })

        } else {
            this.setState({
                showChooseMenu: !this.state.showChooseMenu,
                showChooseMenuClass: "",
                showChooseMenuBtnForm: ""
            })
        }

    }

    onClickHandler = (mealName) => {
        localStorage.setItem("mealName", mealName);
    }

    render() {

        return (

            <div className="main-section-4 py-5">

                <div className="container">

                    <div className="ms4-dd-menu pb-3">

                        <h2 className="text-center text-uppercase">What's on your menu</h2>

                        {/*Dropdown menu - meals*/}
                        <div>

                            <h4 className="text-color-green text-center pt-2">
                                Choose one of our menus
                            </h4>

                            <div className="ms4-dd-menu-section w-50 container py-3">

                                <div className="ms4-dd-menu-btn">

                                    <ul className="ms4-ddm-main">

                                        <li>
                                            <input type="submit" onClick={this.onClickShowChooseMenu}
                                                   value={this.state.chooseMenu}
                                                   className={"ms4-ddm-btn font-size-1 " +
                                                   this.state.showChooseMenuBtnForm}/>
                                        </li>

                                        <li>

                                            <ul className={"dd-menu " + this.state.showChooseMenuClass}>

                                                <li>
                                                    <input type="submit" onClick={this.onClickChooseMenu}
                                                           value="Adventurous"
                                                           className="ms4-ddm-btn font-size-1"/>
                                                </li>
                                                <li>
                                                    <input type="submit" onClick={this.onClickChooseMenu}
                                                           value="Quick and Simple"
                                                           className="ms4-ddm-btn font-size-1"/>
                                                </li>
                                                <li>
                                                    <input type="submit" onClick={this.onClickChooseMenu}
                                                           value="Low-Cal"
                                                           className="ms4-ddm-btn font-size-1"/>
                                                </li>
                                                <li>
                                                    <input type="submit" onClick={this.onClickChooseMenu}
                                                           value="Carb-Conscious"
                                                           className="ms4-ddm-btn font-size-1"/>
                                                </li>
                                                <li>
                                                    <input type="submit" onClick={this.onClickChooseMenu}
                                                           value="Vegetarian"
                                                           className="ms4-ddm-btn font-size-1"/>
                                                </li>

                                            </ul>

                                        </li>

                                    </ul>

                                </div>

                            </div>

                            <div className="ms4-menu-section">

                                {/*Choose one of our menus*/}
                                <div className="row ms4-ms text-center align-self-center">

                                    {
                                        !this.state.loading && <TopMenuInfo MenuName={this.state.chooseMenu}
                                                                            menu={this.state.menu}
                                                                            onClick={this.onClickHandler.bind(this)}
                                        />
                                    }

                                </div>

                                {/*See Full Menu*/}
                                <div className="ms4-full-menu-btn d-flex justify-content-center pt-5">

                                    <a href="/weekly-menu"
                                       className="ms4-fm-btn font-size-1 px-5 py-2
                                       text-decoration-none d-flex justify-content-center align-items-center">
                                        See Full Menu
                                    </a>

                                </div>


                            </div>

                        </div>

                    </div>

                </div>

            </div>

        )

    }
};

export default Section4;