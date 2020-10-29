import React, {Component} from "react";
import {Redirect} from 'react-router-dom';

import TopMenuInfo from "./Section4-Menus/TopMenuInfo";

class Section4 extends Component {

    state = {
        menuName: "Adventurous",
        shortenMenuNameUppercase: "Adv",
        shortenMenuNameLowercase: "adv",

        mealName1: "Japanese BBQ Burger",
        mealText1: "with smoky potato wedges",

        mealName2: "Huli-Huli Chicken Rice Bowl",
        mealText2: "with charred pineapple",

        mealName3: "Garlic-Parmesan Crusted Filet Mignon",
        mealText3: "with red wine sauce, roasted red potatoes and parsnips",

        mealName4: "Korean Fried Chicken",
        mealText4: "with edamame rice",
        //
        redirect: null,
        chooseMenu: "Adventurous",
        showChooseMenu: false,
        showChooseMenuClass: "",
        showChooseMenuBtnForm: ""

    }

    onSubmit = () => {
        this.setState({
            redirect: "/weekly-menu"
        })
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

    render() {

        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }

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
                                <div className="row ms4-ms text-center">

                                    <TopMenuInfo MenuName={this.state.chooseMenu}/>

                                </div>

                                {/*See Full Menu*/}
                                <div className="ms4-full-menu-btn d-flex justify-content-center pt-5">

                                    <input type="submit" onClick={this.onSubmit} value="See Full Menu"
                                           className="ms4-fm-btn font-size-1"/>

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