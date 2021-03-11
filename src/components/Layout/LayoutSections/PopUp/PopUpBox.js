import React from "react";
import PopUp from "./PopUp";

const PopUpBox = (props) => {

    return (

        <PopUp
            message = {props.message}
            clicked={props.clicked}
            isSubscribeFieldCorrect={props.isSubscribeFieldCorrect}
            isRedirectedToHome = {props.isRedirectedToHome}
            isRedirectedFromUpdatePassword={props.isRedirectedFromUpdatePassword}
        />

    )

}

export default PopUpBox;
