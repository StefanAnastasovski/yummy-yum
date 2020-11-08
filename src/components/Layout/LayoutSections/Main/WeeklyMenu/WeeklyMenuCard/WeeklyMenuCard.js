import React from "react";

import TopMenuAllImages from "../../Home/Sections/Section4-Menus/TopMenuAllImages";


const WeeklyMenuCard = (props) => {

    return (

        <div className="card" id={props.id} onClick={props.clicked}>

            <TopMenuAllImages menuName="Adventurous" imgNumber="1"/>

            <div className="card-body">

                <h4 className="card-title">Card title</h4>

                <p className="card-text text-color-green">This is a wider card with supporting text
                    below as a
                    natural lead-in to additional content. This content is a little bit
                    longer.</p>

            </div>

            <div className="card-footer d-flex align-items-center">

                <ul className="wm-tags">
                    <li className="wm-tags-time">
                        <small className="text-muted">35-45 Min</small>
                    </li>
                </ul>

                <ul className="wm-tags-ingredients d-flex justify-content-between mr-1">
                    <li className="">
                        <small className="text-muted">milk</small>
                    </li>

                    <li className="">
                        <small className="text-muted">fish</small>
                    </li>

                    <li>
                        <small className="text-muted">wheat</small>
                    </li>

                </ul>

            </div>

        </div>

    )
}

export default WeeklyMenuCard;