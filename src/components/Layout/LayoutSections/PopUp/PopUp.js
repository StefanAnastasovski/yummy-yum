import React from "react";

import './PopUp.css';

import CloseIcon from "./Icons/CloseIcon";

const PopUp = (props) => {


    return (

        <div className="footer-pop-up">

            <div className="f-pop-up-center ">

                <div className={
                    props.isSubscribeFieldCorrect || props.isRedirectedToHome ? "f-pop-up w-25 " : "w-25 f-pop-up-danger"
                }>


                    <div className="f-pu-close" onClick={props.clicked}>

                        <CloseIcon/>

                    </div>


                    {props.isSubscribeFieldCorrect ?
                        props.message[0] : props.message[1] ||
                        props.isRedirectedToHome ?
                            props.message[0] : null
                    }

                </div>

            </div>

        </div>

    )


}

export default PopUp;
