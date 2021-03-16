import React from "react";


import CheckIcon from "./CheckIcon/CheckIcon";


const MailSent = (props) => {

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

            <div className="d-flex w-50 flex-column mt-2">

                <label className="text-center">Enter 6 digit code: </label>

                <input type="text"
                       className={"text-center w-25 align-self-center "}
                       maxLength="6"
                       minLength="6"
                       onChange={props.onChange}
                />
                {
                    !props.isCodeCorrect && props.isCodeCorrect !== null ?
                        <p className="text-danger text-center">
                            Wrong code!
                        </p> :
                        null
                }

                <button type="button"
                        onClick={props.handleResetCode}
                        className="w-50 align-self-center mt-2 btn-reset-code">
                    Submit
                </button>

            </div>

        </div>

    )

};

export default MailSent;