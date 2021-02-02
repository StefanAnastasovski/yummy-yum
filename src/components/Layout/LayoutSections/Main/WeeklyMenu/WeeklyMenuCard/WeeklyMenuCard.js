import React from "react";

import TopMenuAllImages from "../../Home/Sections/Section4-Menus/TopMenuAllImages";


const WeeklyMenuCard = (props) => {

    let mealIngretientTags = props.meal.mealIngredientTag.split(", ");

    return (

        <div className="card" id={props.id} onClick={props.clicked}>

            <TopMenuAllImages menuName="Adventurous" imgNumber="1"/>

            <div className="card-body">

                <h4 className="card-title">
                    {props.meal.mealName}
                </h4>

                <p className="card-text text-color-green">
                    {props.meal.mealDescription}
                </p>

            </div>

            <div className="card-footer d-flex align-items-center">

                <ul className="wm-tags">
                    <li className="wm-tags-time">
                        <small className="text-muted">
                            {props.meal.mealTimeTag}
                        </small>
                    </li>
                </ul>

                <ul className="wm-tags-ingredients d-flex justify-content-between mr-1">

                    {mealIngretientTags.map(item => {
                        return <li key={item} className="">
                            <small className="text-muted">{item}</small>
                        </li>
                    })
                    }

                </ul>

            </div>

        </div>

    )
}

export default WeeklyMenuCard;