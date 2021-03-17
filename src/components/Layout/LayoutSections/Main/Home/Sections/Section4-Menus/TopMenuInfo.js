import React from "react";

import TopMenu from "./TopMenu";

const TopMenuInfo = (props) => {

    let menuInfo;
    if (props.MenuName === "Adventurous")
        menuInfo = props.menu[0];
    else if (props.MenuName === "Carb-Conscious")
        menuInfo = props.menu[1];
    else if (props.MenuName === "Low-Cal")
        menuInfo = props.menu[2];
    else if (props.MenuName === "Quick and Simple")
        menuInfo = props.menu[3];
    else if (props.MenuName === "Vegetarian")
        menuInfo = props.menu[4];

    return (
        <TopMenu
            menuInfo = {menuInfo}
            onClick = {props.onClick.bind(this)}
        />

    )

}

export default TopMenuInfo;
