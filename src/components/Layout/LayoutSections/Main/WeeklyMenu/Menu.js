import React from "react";

import './WeeklyMenu.css';

import NextIcon from "./WeekIcons/NextIcon";
import PreviousIcon from "./WeekIcons/PreviousIcon";
import Aux from "../../../../../hoc/Auxilliary";
import WeeklyMenuCard from "./WeeklyMenuCard/WeeklyMenuCard";
import CustomizeItCard from "./CustomizeItCard/CustomizeItCard";
// import {Redirect} from "react-router";

const Menu = (props) => {

    // state = {
    //     recipeRedirect: false
    // }
    let convertMealToRightFormat = (menuList, categoryName) => {
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

    let createCardRow = (meals, rowNumber) => {
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
        let showCard;


        return meals.slice(rowSlice[0], rowSlice[1]).map((item, index) => {
            let margin = "";
            if (index === 1) {
                margin = "mx-3";
            }
            let id = props.mealMenuName.split("-").splice(1,).join("");
            showCard = props.customizeCardIndex !== props.mealFilter[0] + id + keyIndex1.toString() + index.toString();

            return <li key={"CardID" + id + keyIndex1.toString() + index.toString()} className={"col " + margin}
                       onClick={populateMealNameLocalStorage(item.meal.mealName)}
            >


                <WeeklyMenuCard
                    customizeItCardOnClickHandler={props.customizeItCardOnClickHandler}
                    addToCartHandler={props.addToCartHandler}
                    showCard={showCard}
                    mealMenuName={props.mealMenuName}
                    cardIdNumber={(props.mealFilter[0] + id + keyIndex1.toString() + index.toString())}
                    img={item.meal.image}
                    meal={item.meal}
                    key={"CardID" + keyIndex2.toString() + index.toString()}
                    customizeCardClicked={props.customizeCardClicked}
                    populateLocalStorageOnCustomizeIt={() => populateLocalStorage(item.meal.mealName,
                        (props.mealFilter[0] + id + keyIndex1.toString() + index.toString()))}

                />
            </li>
        });
    }

    let populateMealNameLocalStorage = (mealName) => {
        localStorage.setItem("mealName", mealName);
    }

    let populateLocalStorage = (mealName, cardIdNumber) => {
        console.log(mealName, cardIdNumber)
        let temp = JSON.parse(localStorage.getItem("mealRecipe"));

        let obj = {}
        if (!temp) {
            obj = {
                "mealName": mealName,
                "menuName": props.mealMenuName,
                "cardIdNumber": cardIdNumber,
                "customizeItOption": "Default"
            }
            localStorage.setItem("mealRecipe", JSON.stringify([obj]));
        } else {
            let isExist = false;
            temp.forEach(item => {
                if (item.cardIdNumber === cardIdNumber) {
                    isExist = true;
                }
            })
            if (!isExist) {
                obj = {
                    "mealName": mealName,
                    "menuName": props.mealMenuName,
                    "cardIdNumber": cardIdNumber,
                    "customizeItOption": "Default"
                }
                temp.push(obj);
                localStorage.setItem("mealRecipe", JSON.stringify(temp));
            }
        }


    }


    let checkMenuName = (menuName) => {
        let menu;
        if (menuName === "Adventurous") {
            menu = convertMealToRightFormat(props.menu[0], menuName)
        } else if (menuName === "Quick and Simple") {
            menu = convertMealToRightFormat(props.menu[1], menuName)
        } else if (menuName === "Low-Cal") {
            menu = convertMealToRightFormat(props.menu[2], menuName)
        } else if (menuName === "Carb-Conscious") {
            menu = convertMealToRightFormat(props.menu[3], menuName)
        } else if (menuName === "Vegetarian") {
            menu = convertMealToRightFormat(props.menu[4], menuName)
        }

        return menu;
    }

// render() {
    let row1, row2, row3 = null;

    if (props.isMenuExist) {

        let menu = [];
        if (props.isMix) {
            let mixMenu = convertMealToRightFormat(props.mixRows[0], "Mix")
            row1 = createCardRow(mixMenu, 1);
            row2 = createCardRow(mixMenu, 2);
            row3 = createCardRow(mixMenu, 3);
        } else {
            menu = checkMenuName(props.mealMenuFilter);
            row1 = createCardRow(menu, 1);
            row2 = createCardRow(menu, 2);
            row3 = createCardRow(menu, 3);
        }
    }

    return (

        <Aux>

            <h1 className="text-center py-5">Weekly Menu</h1>

            <div className="wm-nav d-flex justify-content-between">

                <h3 className="">Meal Kits</h3>

                <div className="wm-nav-right-menu d-flex align-items-center w-50 justify-content-end">

                    <h4 className="pr-3">Meal Category: </h4>

                    <div className="wm-nav-ddm-main">

                        <ul className="wm-ddm-main">

                            <li>
                                <input type="submit" onClick={props.onClickShowMealFilter}
                                       value={props.mealFilter}
                                       className={"wm-ddm-btn font-size-1 " +
                                       props.showMealFilterBtnForm}/>
                            </li>

                            <li>

                                <ul className={"dd-menu " + props.showMealFilterClass}>

                                    <li>
                                        <input type="submit" onClick={props.onClickMealFilter}
                                               value="Mix"
                                               className="wm-ddm-btn font-size-1"/>
                                    </li>
                                    <li>
                                        <input type="submit" onClick={props.onClickMealFilter}
                                               value="Adventurous"
                                               className="wm-ddm-btn font-size-1"/>
                                    </li>
                                    <li>
                                        <input type="submit" onClick={props.onClickMealFilter}
                                               value="Quick and Simple"
                                               className="wm-ddm-btn font-size-1"/>
                                    </li>
                                    <li>
                                        <input type="submit" onClick={props.onClickMealFilter}
                                               value="Low-Cal"
                                               className="wm-ddm-btn font-size-1"/>
                                    </li>
                                    <li>
                                        <input type="submit" onClick={props.onClickMealFilter}
                                               value="Carb-Conscious"
                                               className="wm-ddm-btn font-size-1"/>
                                    </li>
                                    <li>
                                        <input type="submit" onClick={props.onClickMealFilter}
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

                    {/*{checkRecipeRedirect()}*/}

                    {props.isMenuExist ? <ul>
                            <div className="row py-4">{row1}</div>
                            <div className="row pb-4">{row2}</div>
                            <div className="row">{row3}</div>
                        </ul> :
                        <div className="col py-5 text-center">
                            <h1 className="text-danger ">
                                <span className="d-block">
                                    Sorry!
                                </span>
                                <span className="font-size-3">
                                    The menu is not available at this moment!
                                </span>
                            </h1>
                        </div>}

                </div>

            </div>

            <div className="wm-week-slider d-flex justify-content-center py-5">

                <div className="wm-icon" onClick={props.onClickPreviousWeek}>
                    <PreviousIcon/>
                </div>

                <div>
                    <h3>{props.weekSelect}</h3>
                </div>

                <div className="wm-icon" onClick={props.onClickNextWeek}>
                    <NextIcon/>
                </div>

            </div>

        </Aux>

    )

// }

}

export default Menu;