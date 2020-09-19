import React from "react";


import CheckIcon from "./CheckIcon/CheckIcon";


const MailSent = () => {


    return (

        <div className="d-flex align-items-center flex-column ">

            <div className="fp-mail-sent w-50 p-5 ">

                <h4 className="my-2">Forgot Password</h4>

                <div className="fp-ms-section d-flex">

                    <div>

                        <CheckIcon className="fp-ms-check-icon"/>

                    </div>

                    <p className="text-color-green pl-3">
                        You should soon receive an email allowing you to reset your password.
                        Please make sure to check your spam and trash if you can't find the email.
                    </p>

                </div>


            </div>

        </div>

    )

};

export default MailSent;