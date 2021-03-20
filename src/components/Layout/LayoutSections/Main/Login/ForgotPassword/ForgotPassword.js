import React, {Component} from "react";

import './ForgotPassword.css';
import passwordHash from 'password-hash';

import ForgotPasswordForm from "./ForgotPasswordForm/ForgotPasswordForm";
import MailSent from "./MailSent/MailSent";
import EmailCalls from "./../../../../../../repository/get/getEmail";
import postForgotPassword from "../../../../../../repository/post/postForgotPassword";
import ForgotPasswordCalls from "../../../../../../repository/get/getForgotPassword";
import UpdateNewPassword from "./ForgotPasswordForm/UpdateNewPassword";
import UserCalls from "../../../../../../repository/post/postUser";

import {Redirect} from "react-router-dom";

class ForgotPassword extends Component {

    state = {
        isSent: false,
        isEmailValid: false,
        emailError: "",
        email: "",
        resetCode: "",
        isCodeCorrect: null,
        wrongEmailMessage: false,
        newPassword: false,
        newPasswordInputField: "",
        confirmNewPasswordInputField: "",
        isPasswordsMatch: null,
        redirect: false,
        validationErrors: {
            passwordError: "",
        },
        isPasswordValid: true,

    }

    onSubmit = async (event) => {

        event.preventDefault();

        await this.validateForm(this.state.email)

        if (this.state.isEmailValid) {
            await EmailCalls.fetchIsEmailExist(this.state.email).then((response) => {
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

        if (this.state.isSent) {

            try {
                let email = {
                    email: this.state.email.toString()
                }
                await postForgotPassword.createResetCode(email).then((response) => {
                    // console.log(response.data.code);
                })
            } catch (e) {
                console.log(e);
            }

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
            email: event.target.value.toLowerCase()
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

    handleResetCode = async (event) => {
        try {
            await ForgotPasswordCalls.fetchResetCodeByEmail(this.state.email).then((response => {
                if (this.state.resetCode !== response.data.code) {

                    this.setState({
                        isCodeCorrect: false
                    })

                } else if (this.state.resetCode === response.data.code) {
                    this.setState({
                        isCodeCorrect: true,
                        newPassword: true,
                        isSent: false
                    })
                }

            }))
        } catch (e) {
            console.log(e);
        }
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }

    handleSavePassword = async (event) => {

        event.preventDefault();


        let isMatched = this.state.newPasswordInputField === this.state.confirmNewPasswordInputField;
        let isPasswordValid = await this.validatePassword(this.state.newPasswordInputField, isMatched);

        if (isPasswordValid && isMatched) {
            let newPasswordForm = {
                password: passwordHash.generate(this.state.newPasswordInputField),
                email: this.state.email.toString()
            }
            await UserCalls.updatePassword(newPasswordForm).then((response) => {
                // console.log(response.data)
            })
            this.setState({
                isPasswordsMatch: true
            })
            this.props.handlePassword();
            this.setRedirect();

        } else if (!isMatched) {
            this.setState({
                isPasswordsMatch: false,
                confirmNewPasswordInputField: ""
            })
        }

    }

    onChangeNewPassword = (event) => {

        this.setState({
            newPasswordInputField: event.target.value
        })


    }

    onChangeConfirmPassword = (event) => {

        this.setState({
            confirmNewPasswordInputField: event.target.value
        })

    }

    validatePassword = (password, isMatched) => {
        let isPasswordValid = true;
        let isPasswordLengthGraterThanSix = password.length > 6;

        if (!isPasswordLengthGraterThanSix) {
            let obj = {
                ...this.state.validationErrors,
                passwordError: "Please enter valid password."
            }
            if (isMatched) {
                this.setState({
                    validationErrors: obj
                })
            } else {
                this.setState({
                    validationErrors: obj,
                    confirmNewPasswordInputField: ""
                })
            }
            isPasswordValid = false;
        } else {
            let obj = {
                ...this.state.validationErrors,
                passwordError: ""
            }
            this.setState({
                validationErrors: obj,
            })
        }
        return isPasswordValid;
    }


    render() {

        if(this.state.redirect)
            return <Redirect to="/" />

        return (

            <div className="forgot-password-wrapper">


                <div className="forgot-password-container container">

                    <div className="forgot-password">

                        {
                            !this.state.isSent && !this.state.newPassword && <ForgotPasswordForm
                                onChange={this.onChangeEmail}
                                errorMessage={this.state.emailError}
                                wrongEmailMessage={this.state.wrongEmailMessage}
                                clicked={this.onSubmit}/>
                        }

                        {this.state.isSent &&
                        <MailSent
                            onChange={this.onChangeResetCode}
                            isCodeCorrect={this.state.isCodeCorrect}
                            handleResetCode={this.handleResetCode}
                        />}

                        {
                            this.state.newPassword &&
                            <UpdateNewPassword
                                onChangeNewPassword={this.onChangeNewPassword}
                                onChangeConfirmPassword={this.onChangeConfirmPassword}
                                handleSavePassword={this.handleSavePassword}
                                isPasswordsMatch={this.state.isPasswordsMatch}
                                confirmPasswordValue={this.state.confirmNewPasswordInputField}
                                passwordError={this.state.validationErrors.passwordError}
                            />

                        }

                    </div>

                </div>


            </div>
        )

    }

};

export default ForgotPassword;