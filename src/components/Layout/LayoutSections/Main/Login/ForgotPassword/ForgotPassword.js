import React, {Component} from "react";

import './ForgotPassword.css';
import ForgotPasswordForm from "./ForgotPasswordForm/ForgotPasswordForm";
import MailSent from "./MailSent/MailSent";
import EmailCalls from "./../../../../../../repository/get/getEmail"

class ForgotPassword extends Component {

    state = {
        isSent: false,
        isEmailValid: false,
        emailError: "",
        email: "",
        resetCode: "",
        isCodeCorrect: true,
        wrongEmailMessage: false
    }

    onSubmit = async (event) => {

        event.preventDefault();
        await this.validateForm(this.state.email)
        if (this.state.isEmailValid) {
            await EmailCalls.fetchIsEmailExist(this.state.email).then((response) => {
                console.log(response.data.success)
                if (response.data.success) {
                    this.setState({
                        isSent: !this.state.isSent
                    })
                } else if (!response.data.success) {
                    this.setState(prevState => ({
                        wrongEmailMessage: "The Email is not existing! Please, enter the correct email."
                    }))
                }
            })

        }

    }

    validateForm = (userInfo) => {

        let isEmailValid = true;
        let errors = "";

        const pattern =
            new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        let isEmailLengthGraterThanSix = userInfo.split("@")[0].length > 6;

        if (!pattern.test(userInfo) || !isEmailLengthGraterThanSix) {
            isEmailValid = false;
            errors = "Please enter valid email address.";
        }


        this.setState({
            emailError: errors,
            isEmailValid: isEmailValid

        })


    }

    onChangeEmail = (event) => {

        this.setState({
            email: event.target.value
        })

    }

    onChangeResetCode = (event) => {

        this.setState({
            resetCode: event.target.value
        })

    }

    checkIsCodeCorrect = (code) => {

        this.setState(prevState => ({
            isCodeCorrect: !prevState.isCodeCorrect
        }))

    }

    handleResetCode = () => {

    }

    render() {

        return (

            <div className="forgot-password-wrapper">

                <div className="forgot-password-container container">

                    <div className="forgot-password">

                        {!this.state.isSent && <ForgotPasswordForm
                            onChange={this.onChangeEmail}
                            errorMessage={this.state.emailError}
                            wrongEmailMessage={this.state.wrongEmailMessage}
                            clicked={this.onSubmit}/>}

                        {this.state.isSent &&
                        <MailSent
                            onChange={this.onChangeResetCode}
                            isCodeCorrect={this.state.isCodeCorrect}
                            handleResetCode={this.handleResetCode}
                        />}

                    </div>

                </div>


            </div>
        )

    }

};

export default ForgotPassword;