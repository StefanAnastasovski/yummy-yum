import React from "react";
import PopUp from "./PopUp";

const SubscribePopUp = (props) => {

    return (

        <PopUp
            message = {props.message}
            clicked={props.clicked}
            isSubscribeFieldCorrect={props.isSubscribeFieldCorrect}
            isRedirectedToHome = {props.isRedirectedToHome}
        />

    )

}

export default SubscribePopUp;
