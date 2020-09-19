import React, {Component} from "react";

import './ForgotPassword.css';
import ForgotPasswordForm from "./ForgotPasswordForm/ForgotPasswordForm";
import CheckIcon from "./MailSent/CheckIcon/CheckIcon";


class ForgotPassword extends Component {

    state = {
        isSent: false
    }

    onSubmit = () => {

        this.setState({
            isSent: !this.state.isSent
        })

    }


    render() {

        let mailSent = (

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

        return (

            <div className="forgot-password-wrapper">

                <div className="forgot-password-container container">

                    <div className="forgot-password">

                        {!this.state.isSent && <ForgotPasswordForm clicked={this.onSubmit}/>}

                        {this.state.isSent && mailSent}

                    </div>

                </div>


            </div>
        )

    }

};

export default ForgotPassword;