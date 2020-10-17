import React from "react";
import PopUp from "./PopUp";

const SubscribePopUp = (props) => {

    return (

        <PopUp
            clicked={props.clicked}
            isSubscribeFieldCorrect={props.isSubscribeFieldCorrect}
        />

    )

}

export default SubscribePopUp;
