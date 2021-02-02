import React, {Component} from "react";

import './WeeklyMenu.css';

import NextIcon from "./WeekIcons/NextIcon";
import PreviousIcon from "./WeekIcons/PreviousIcon";
import Aux from "../../../../../hoc/Auxilliary";
import WeeklyMenuCard from "./WeeklyMenuCard/WeeklyMenuCard";
import {Redirect} from "react-router";

class Menu extends Component {

    state = {
        recipeRedirect: false
    }

    isMixMenu = () => {
        this.setState({
            isMix: false
        })
    }

    convertMealToRightFormat = (menuList, categoryName) => {
        let menu = menuList.map(item => {
            let obj = {};
            obj = {
                category: categoryName,
                meal: item
            }
            return obj;
        });

        return menu;
    }

    createCardRow = (meals, rowNumber) => {
        let rowSlice;
        let keyIndex1;
        let keyIndex2;
        if (rowNumber === 1) {
            rowSlice = [0, 3];
            keyIndex1 = 1;
            keyIndex2 = 11;
        } else if (rowNumber === 2) {
            rowSlice = [3, 6];
            keyIndex1 = 2;
            keyIndex2 = 22;
        } else if (rowNumber === 3) {
            rowSlice = [6,];
            keyIndex1 = 3;
            keyIndex2 = 33;
        }
        let row = meals.slice(rowSlice[0], rowSlice[1]).map((item, index) => {
            let margin = "";
            if (index === 1) {
                margin = "mx-3";
            }
            return <li key={"CardID" + keyIndex1 + index} className={"col " + margin}><WeeklyMenuCard
                meal={item.meal}
                key={"CardID" + keyIndex2 + index}
                clicked={this.setCardRedirect.bind(this, keyIndex2 + index)}
            /></li>
        });

        return row;
    }

    setCardRedirect = (mealName) => {
        this.props.setRedirect(mealName)
        this.setState({
            recipeRedirect: true
        })
        console.log(mealName)
    }

    checkRecipeRedirect = () => {
        if (this.state.recipeRedirect) {
            // let path = `/weekly-menu/meal-recipe/${mealName}`
            return <Redirect to={`/meals/2${this.props.mealName}`}/>
        }
    }

    checkMenuName = (menuName) => {
        let menu;
        if (menuName === "Adventurous") {
            menu = this.convertMealToRightFormat(this.props.menu[0], menuName)
        } else if (menuName === "Quick and Simple") {
            menu = this.convertMealToRightFormat(this.props.menu[1], menuName)
        } else if (menuName === "Low-Cal") {
            menu = this.convertMealToRightFormat(this.props.menu[2], menuName)
        } else if (menuName === "Carb-Conscious") {
            menu = this.convertMealToRightFormat(this.props.menu[3], menuName)
        } else if (menuName === "Vegetarian") {
            menu = this.convertMealToRightFormat(this.props.menu[4], menuName)
        }

        return menu;
    }

    render() {
        console.log(this.state.recipeRedirect)
        let row1, row2, row3;
        let menu = [];
        if (this.props.isMix) {
            row1 = this.createCardRow(this.props.mixRows, 1);
            row2 = this.createCardRow(this.props.mixRows, 2);
            row3 = this.createCardRow(this.props.mixRows, 3);
        } else {
            menu = this.checkMenuName(this.props.mealMenuName);
            row1 = this.createCardRow(menu, 1);
            row2 = this.createCardRow(menu, 2);
            row3 = this.createCardRow(menu, 3);
        }

        return (

            <Aux>

                <h1 className="text-center py-5">Weekly Menu</h1>

                <div className="wm-nav d-flex justify-content-between">

                    <h3 className="">Meal Kits</h3>

                    <div className="wm-nav-right-menu d-flex align-items-center w-50 justify-content-end">

                        <h4 className="pr-3">Meal Filter: </h4>

                        <div className="wm-nav-ddm-main">

                            <ul className="wm-ddm-main">

                                <li>
                                    <input type="submit" onClick={this.props.onClickShowMealFilter}
                                           value={this.props.mealFilter}
                                           className={"wm-ddm-btn font-size-1 " +
                                           this.props.showMealFilterBtnForm}/>
                                </li>

                                <li>

                                    <ul className={"dd-menu " + this.props.showMealFilterClass}>

                                        <li>
                                            <input type="submit" onClick={this.props.onClickMealFilter}
                                                   value="Mix"
                                                   className="wm-ddm-btn font-size-1"/>
                                        </li>
                                        <li>
                                            <input type="submit" onClick={this.props.onClickMealFilter}
                                                   value="Adventurous"
                                                   className="wm-ddm-btn font-size-1"/>
                                        </li>
                                        <li>
                                            <input type="submit" onClick={this.props.onClickMealFilter}
                                                   value="Quick and Simple"
                                                   className="wm-ddm-btn font-size-1"/>
                                        </li>
                                        <li>
                                            <input type="submit" onClick={this.props.onClickMealFilter}
                                                   value="Low-Cal"
                                                   className="wm-ddm-btn font-size-1"/>
                                        </li>
                                        <li>
                                            <input type="submit" onClick={this.props.onClickMealFilter}
                                                   value="Carb-Conscious"
                                                   className="wm-ddm-btn font-size-1"/>
                                        </li>
                                        <li>
                                            <input type="submit" onClick={this.props.onClickMealFilter}
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

                        {this.checkRecipeRedirect()}

                        <ul>
                            <div className="row py-4">{row1}</div>
                            <div className="row pb-4">{row2}</div>
                            <div className="row">{row3}</div>

                        </ul>

                    </div>

                </div>

                <div className="wm-week-slider d-flex justify-content-center py-5">

                    <div className="wm-icon" onClick={this.props.onClickPreviousWeek}>
                        <PreviousIcon/>
                    </div>

                    <div>
                        <h3>{this.props.weekSelect}</h3>
                    </div>

                    <div className="wm-icon" onClick={this.props.onClickNextWeek}>
                        <NextIcon/>
                    </div>

                </div>

            </Aux>

        )

    }

}

export default Menu;