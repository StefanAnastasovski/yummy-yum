import React from "react";

import './PopUp.css';

import CloseIcon from "./Icons/CloseIcon";

const PopUp = (props) => {


    return (


        <div className="footer-pop-up">

            <div className="f-pop-up-center ">

                <div className={
                    props.isSubscribeFieldCorrect ? "f-pop-up w-25 " : "w-25 f-pop-up-danger"
                } >

                    <div className="f-pu-close" onClick={props.clicked}>

                        <CloseIcon/>

                    </div>

                    {props.isSubscribeFieldCorrect ?
                        < p className="p-5 text-center">
                            We are so happy you joined our family!
                            We'll shoot you an email every now and then with our menus, free recipes and special offers.
                            Thanks for subscribing!
                        </p> :
                        < p className="p-5 text-center">
                            <span className="d-block">Sorry!</span>
                            <span className="d-block">Something went wrong.</span>
                            Please make sure that you enter the correct email address.
                             <span className="d-block">Thanks!</span>

                        </p>

                    }

                </div>

            </div>

        </div>

    )


}

export default PopUp;
