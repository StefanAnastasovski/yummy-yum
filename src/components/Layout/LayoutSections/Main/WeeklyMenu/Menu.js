import React from "react";

import './WeeklyMenu.css';

import NextIcon from "./WeekIcons/NextIcon";
import PreviousIcon from "./WeekIcons/PreviousIcon";
import Aux from "../../../../../hoc/Auxilliary";
import WeeklyMenuCard from "./WeeklyMenuCard/WeeklyMenuCard";
import ArrowUpIcon from "./CaloriesFilterIcons/ArrowUpIcon";
import ArrowRightIcon from "./CaloriesFilterIcons/ArrowRightIcon";

const Menu = (props) => {

    let convertMealToRightFormat = (menuList, categoryName) => {
        return menuList.map(item => {
            return {
                category: categoryName,
                meal: item
            };
        });
    }

    let createCardRow = (meals, rowNumber, isFiltered) => {
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

            let menuName = props.mealMenuName.split("-");
            let id = [...menuName].splice(1,).join("");

            showCard =
                !isFiltered ?
                    props.customizeCardIndex !== item.meal.mealCategory.category[0] + id + keyIndex1.toString() + index.toString() :
                    props.customizeCardIndex !== item.mealCategory.category[0] + id + keyIndex1.toString() + index.toString();

            let mealName = !isFiltered ? item.meal.mealName : item.mealName;
            let mealCategory = !isFiltered ? item.meal.mealCategory.category : item.mealCategory.category;

            return <li
                className={"col " + margin}
                key={"CardID" + id + keyIndex1.toString() + index.toString()}
                onClick={props.populateMealInfoOnClick.bind(this, mealName, id + keyIndex1.toString() + index.toString(), mealCategory)}
                onContextMenu={props.populateMealInfoOnClick.bind(this, mealName, id + keyIndex1.toString() + index.toString(), mealCategory)}
            >
                <WeeklyMenuCard
                    customizeItCardOnClickHandler={props.customizeItCardOnClickHandler}
                    addToCartHandler={props.addToCartHandler}
                    showCard={showCard}
                    mealMenuName={props.mealMenuName}
                    cardIdNumber={(mealCategory[0] + id + keyIndex1.toString() + index.toString())}
                    img={!isFiltered ? item.meal.image : item.image}
                    meal={!isFiltered ? item.meal : item}
                    key={"CardID" + keyIndex2.toString() + index.toString()}
                    customizeCardClicked={props.customizeCardClicked}
                    populateLocalStorageOnCustomizeIt={() => populateLocalStorage(mealName,
                        (mealCategory[0] + id + keyIndex1.toString() + index.toString()))}
                    removeItemFromCart={props.removeItemFromCart}
                    removeItemFromScheduleItems={props.removeItemFromScheduleItems}
                    increaseServings={props.increaseServings}
                    decreaseServings={props.decreaseServings}
                    mealCustomizeOptions={!isFiltered ? item.meal.mealCustomizeOptions : item.mealCustomizeOptions}
                    isUserSubscribed={props.isUserSubscribed}
                    userSubscriptionData={props.userSubscriptionData}
                    scheduleAMealHandler={props.scheduleAMealHandler}
                />

            </li>
        });

    }

    let populateLocalStorage = (mealName, cardIdNumber) => {
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
        let menu = props.menu;

        if (menuName === "Adventurous") {
            menu = convertMealToRightFormat(menu[0], menuName)
        } else if (menuName === "Quick and Simple") {
            menu = convertMealToRightFormat(menu[1], menuName)
        } else if (menuName === "Low-Cal") {
            menu = convertMealToRightFormat(menu[2], menuName)
        } else if (menuName === "Carb-Conscious") {
            menu = convertMealToRightFormat(menu[3], menuName)
        } else if (menuName === "Vegetarian") {
            menu = convertMealToRightFormat(menu[4], menuName)
        }
        // console.log(menu)
        return menu;
    }

    let checkHowManyRows = () => {
        return Math.ceil(props.menuFiltered.slice(0, 9).length / 3);
    }

// render() {

    let rows = [];

    if (props.isMenuExist && !props.isMenuFiltered) {
        let menu = [];
        if (props.isMix) {
            let mixMenu = convertMealToRightFormat(props.mixRows[0], "Mix")
            for (let i = 0; i < 3; i++) {
                rows.push(createCardRow(mixMenu, (i + 1), false));
            }
        } else {
            menu = checkMenuName(props.mealMenuFilter);
            for (let i = 0; i < 3; i++) {
                rows.push(createCardRow(menu, (i + 1), false));
            }
        }
    }
    if (props.isMenuFiltered) {

        let numberOfRows = checkHowManyRows();

        for (let i = 0; i < numberOfRows; i++) {
            rows[i] = createCardRow(props.menuFiltered.slice(0, 9), (i + 1), true)

            if (i === 0 && rows[i].length === 2) {
                rows[i].push(<li key={"temp-3" + i} className="col"></li>)
            }

            if (rows[i].length === 1) {
                rows[i].push(<li key={"temp-2" + i} className="col mx-3"></li>)
                rows[i].push(<li key={"temp-3" + i} className="col"></li>)
            }

        }

    }

    return (

        <Aux>

            <h1 className="text-center py-5">Weekly Menu</h1>

            <div className="wm-nav">

                <div className="wm-nav-right-menu d-flex align-items-center justify-content-end">

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

            <div className="wm-calories d-flex flex-column align-items-baseline pt-2">

                <div className="d-flex align-items-baseline">

                    <h5 className="pr-2">Calorie Filter</h5>
                    {/*calorieFilterHandler*/}
                    <div className="wm-calories-filter-arrow"
                         onClick={props.calorieFilterHandler}>
                        {props.doesCalorieFilterEnabled ?
                            <ArrowUpIcon/>
                            :
                            <ArrowRightIcon/>
                        }
                    </div>


                </div>

                <div className="d-flex flex-column">

                    {props.doesCalorieFilterEnabled && <p className="font-size-2 text-danger">Max: 2500 kcal</p>}

                    {props.doesCalorieFilterEnabled && <div className="wm-calories-filter d-flex ">

                        <div className="">
                            <label className="text-color-green">From:</label>
                            <input name="calories-filter-from" type="number"
                                   min="0" max="2500" className="ml-2 btn-calories-filter"
                                   value={props.caloriesFilter.caloriesFrom !== 9999 && props.caloriesFilter.caloriesFrom}
                                   onChange={props.caloriesFilterHandler}
                            />
                        </div>

                        <div className="ml-3">
                            <label className="text-color-green">To:</label>
                            <input name="calories-filter-to" type="number"
                                   min="0" max="2500" className="ml-2 btn-calories-filter"
                                   value={props.caloriesFilter.caloriesTo !== 9999 && props.caloriesFilter.caloriesTo}
                                   onChange={props.caloriesFilterHandler}
                            />
                        </div>

                        <div className="col d-flex align-items-baseline ml-3">
                            <button type="button" className="btn-apply-order-history"
                                    onClick={props.onApplyCallCaloriesFilter}
                            >Apply
                            </button>
                        </div>

                    </div>}

                </div>

            </div>

            <div>
                <hr/>
                <h3 className="pb-2">Meal Kits</h3>
            </div>

            <div className="wm-menu-cards">

                <div className="row">


                    {
                        props.isMenuExist && !props.isMenuFiltered && <ul>
                            {
                                rows.map((item, index) => {
                                    if (!(index === rows.length - 1)) {
                                        return <div key={"menu-" + index} className="row">{item}</div>
                                    } else {
                                        return <div key={"menu-" + index} className="row py-4">{item}</div>
                                    }
                                })
                            }
                        </ul>
                    }

                    {
                        !props.isMenuExist && <div className="col py-5 text-center">
                            <h1 className="text-danger ">
                                <span className="d-block">
                                    Sorry!
                                </span>
                                <span className="font-size-3">
                                    The menu is not available at this moment!
                                </span>
                            </h1>
                        </div>
                    }

                    {
                        props.isMenuFiltered &&
                        <ul>
                            {
                                rows.map((item, index) => {
                                    if (!(index === rows.length - 1)) {
                                        return <div key={"menu-" + index} className="row">{item}</div>
                                    } else {
                                        return <div key={"menu-" + index} className="row py-4">{item}</div>
                                    }
                                })
                            }
                        </ul>
                    }

                    {
                        props.menuFiltered.length === 0 && props.isMenuFiltered &&
                        <div className="col py-5 text-center">
                            <h1 className="text-danger ">
                                        <span className="font-size-3">
                                            Please, set another calories range.
                                        </span>
                            </h1>
                        </div>
                    }

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