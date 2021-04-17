import React from "react";

import TopMenu from "./TopMenu";
import Aux from "../../../../../../../hoc/Auxilliary";

const TopMenuInfo = (props) => {
    const menuLength = props.menu.length;
    let menuInfo;

    if (props.menuName === "Adventurous") {
        if (menuLength !== 0)
            menuInfo = props.menu[0]
    } else if (props.menuName === "Carb-Conscious") {
        if (menuLength !== 0)
            menuInfo = props.menu[1];
    } else if (props.menuName === "Low-Cal") {
        if (menuLength !== 0)
            menuInfo = props.menu[2];
    } else if (props.menuName === "Quick and Simple") {
        if (menuLength !== 0)
            menuInfo = props.menu[3];
    } else if (props.menuName === "Vegetarian") {
        if (menuLength !== 0)
            menuInfo = props.menu[4];
    }

    return (

        <Aux>
            <TopMenu
                menuInfo={menuInfo}
                menuName={props.menuName}
                menuDate={props.menuDate}
                onClick={props.onClick.bind(this)}
            />
        </Aux>

    )

}

export default TopMenuInfo;
