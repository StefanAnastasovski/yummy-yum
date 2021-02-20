import React, {Component} from "react";
import {Redirect} from 'react-router-dom';

import './SignUp.css';

import passwordHash from 'password-hash';

import UserCalls from "../../../../../repository/get/getUser"
import EmailCalls from "../../../../../repository/get/getEmail"
import postUser from "../../../../../repository/post/postUser";


class SignUp extends Component {

    state = {
        newUser: {
            firstName: "",
            lastName: "",
            password: "",
            passwordLength: 0,
            username: "",
            signUpDate: "",
            email: {
                email: "",
                isUser: true
            }

        },
        users: [],
        isUserExist: false,
        userByEmail: "",
        userByUsername: "",
        isEmailExist: false,
        isAccountCreated: false,
        validationErrors: {
            emailError: "",
            passwordError: "",
            firstNameError: "",
            lastNameError: ""
        },
        isEmailValid: true,
        isPasswordValid: true,
        isFirstNameValid: true,
        isLastNameValid: true


    };

    onChange = async (event) => {

        let obj = {
            firstName: "",
            lastName: "",
            password: "",
            email: {
                email: ""
            }
        }

        if (event.target.name === "su-firstName") {
            obj = {
                ...this.state.newUser,
                firstName: event.target.value,
            }
            this.setState({
                newUser: obj
            })
        } else if (event.target.name === "su-lastName") {
            obj = {
                ...this.state.newUser,
                lastName: event.target.value,
            }
            this.setState({
                newUser: obj
            })
        } else if (event.target.name === "su-email") {
            obj = {
                ...this.state.newUser,
                email: {
                    email: event.target.value
                }
            }

            this.setState({
                newUser: obj
            })
        } else if (event.target.name === "su-password") {
            const hashedPassword = passwordHash.generate(event.target.value);
            obj = {
                ...this.state.newUser,
                password: hashedPassword,
                passwordLength: event.target.value.length
            }

            this.setState({
                newUser: obj
            })
        }


    }

    handleSubmit = async (event) => {
        event.preventDefault();

        let isValidateFormValid = await this.validateForm(this.state.newUser);

        if (isValidateFormValid) {
            await EmailCalls.fetchIsEmailExist(this.state.newUser.email.email).then((response) => {
                if (!response.data.success || response.data.success) {
                    this.setState({
                        isEmailExist: response.data.success,
                    })
                }
            })

            if (this.state.isEmailExist === false) {

                let firstName = this.state.newUser.firstName;
                let lastName = this.state.newUser.lastName;
                let newUser;
                let flag = false;
                let i = 1;

                firstName = firstName.toLowerCase()[0].toUpperCase() + firstName.toLowerCase().slice(1, firstName.length);
                lastName = lastName.toLowerCase()[0].toUpperCase() + lastName.toLowerCase().slice(1, lastName.length);
                let username = firstName + "." + lastName;

                while (!flag) {

                    await UserCalls.fetchIsUserExist(username).then((response) => {
                        this.setState({
                            isUserExist: response.data.success
                        });
                    })

                    if (!this.state.isUserExist) {
                        let email = {
                            email: this.state.newUser.email.email.toLowerCase()
                        }
                        newUser = {
                            ...this.state.newUser,
                            username: username,
                            firstName: firstName,
                            lastName: lastName,
                            signUpDate: new Date(),
                            email: email
                        }
                        postUser.addUser(newUser).then(response => {
                            // console.log(response.data);
                        });
                        flag = true;
                    } else {
                        username = username.concat(i.toString());

                    }
                }
                this.setState(prevState => ({
                    isAccountCreated: !prevState.isAccountCreated
                }))

            }

        }

    };

    validateForm = (userInfo) => {

        let isEmailValid = true;
        let errors = "";
        let validationErrors = {...this.state.validationErrors};

        const pattern =
            new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        let isEmailLengthGraterThanSix = userInfo.email.email.split("@")[0].length > 6;
        if (!pattern.test(userInfo.email.email) || !isEmailLengthGraterThanSix) {
            isEmailValid = false;
            errors = "Please enter valid email address.";
            validationErrors = {
                ...this.state.validationErrors,
                emailError: errors,
            }
        }

        let isPasswordValid;

        let isPasswordLengthGraterThanSix = userInfo.passwordLength > 6;

        if (!isPasswordLengthGraterThanSix) {

            isPasswordValid = false;
            errors = "Please enter valid password.";

            if (validationErrors.emailError.length > 0) {
                validationErrors = {
                    ...this.state.validationErrors,
                    emailError: validationErrors.emailError,
                    passwordError: errors,
                }
            } else {
                validationErrors = {
                    ...this.state.validationErrors,
                    passwordError: errors,
                }
            }

        } else {
            isPasswordValid = true;
        }

        const namePattern = new RegExp(/^[A-Za-z]+$/);
        let isFirstNameValid = true;
        let isLastNameValid = true;

        if (!namePattern.test(userInfo.firstName)) {
            isFirstNameValid = false;
            errors = "Please enter valid first name.";

            let isEmailErrorExist = validationErrors.emailError.length > 0;
            let isPasswordErrorExist = validationErrors.passwordError > 0;
            let isLastNameErrorExist = validationErrors.lastNameError.length > 0;

            if (isEmailErrorExist) {
                if (isPasswordErrorExist && isLastNameErrorExist) {
                    validationErrors = {
                        emailError: validationErrors.emailError,
                        passwordError: validationErrors.passwordError,
                        lastNameError: validationErrors.lastNameError,
                        firstNameError: errors,
                    }
                } else if (isPasswordErrorExist) {
                    validationErrors = {
                        ...this.state.validationErrors,
                        emailError: validationErrors.emailError,
                        passwordError: validationErrors.passwordError,
                        firstNameError: errors,
                    }
                } else if (isLastNameErrorExist) {
                    validationErrors = {
                        ...this.state.validationErrors,
                        emailError: validationErrors.emailError,
                        lastNameError: validationErrors.lastNameError,
                        firstNameError: errors,
                    }
                } else {
                    validationErrors = {
                        ...this.state.validationErrors,
                        emailError: validationErrors.emailError,
                        firstNameError: errors,
                    }
                }
            } else if (isPasswordErrorExist) {
                if (isLastNameErrorExist) {
                    validationErrors = {
                        ...this.state.validationErrors,
                        passwordError: validationErrors.passwordError,
                        lastNameError: validationErrors.lastNameError,
                        firstNameError: errors,
                    }
                } else {
                    validationErrors = {
                        ...this.state.validationErrors,
                        passwordError: validationErrors.passwordError,
                        firstNameError: errors,
                    }
                }
            } else if (isLastNameErrorExist) {
                validationErrors = {
                    ...this.state.validationErrors,
                    lastNameError: validationErrors.lastNameError,
                    firstNameError: errors,
                }
            } else {
                validationErrors = {
                    ...this.state.validationErrors,
                    firstNameError: errors,
                }
            }

        }

        if (!namePattern.test(userInfo.lastName)) {
            isLastNameValid = false;
            errors = "Please enter valid last name.";
            validationErrors = {
                ...this.state.validationErrors,
                lastNameError: errors,
            }
        }

        this.setState({
            validationErrors: validationErrors,
            isEmailValid: isEmailValid,
            isPasswordValid: isPasswordValid,
            isFirstNameValid: isFirstNameValid,
            isLastNameValid: isLastNameValid
        })

        return isEmailValid && isPasswordValid && isLastNameValid && isLastNameValid;

    }


    render() {

        if (this.state.isAccountCreated) {
            return <Redirect to="/joined"/>
        }

        return (

            <div className="sign-up-wrapper">

                <div className="signup-container container">

                    <div className="sign-up-card d-flex justify-content-center py-5">

                        <div className="card p-5">

                            <div>

                                <h2 className="text-center">

                                    <span className="d-block">Sign Up</span>
                                    <span className="font-size-3 text-color-mlgreen">
                                    Taste delicious meals from our menu or customize one by yourself!
                                    </span>

                                </h2>


                                <div>

                                    <hr/>


                                    <form onSubmit={this.handleSubmit}>

                                        <div className="pt-5 pb-3 d-flex align-items-center flex-column">

                                            <div className="su-fields">

                                                <div className="row mb-3">

                                                    <div className="col mr-1">
                                                        <label className="m-0 text-color-green">First Name: </label>
                                                        <input type="text" required
                                                               onChange={this.onChange}
                                                               name="su-firstName"
                                                               className="sign-up-first-name-btn w-100 py-2 px-1"
                                                               placeholder="John"/>
                                                        {!this.state.isFirstNameValid ?
                                                            <span
                                                                className="font-size-2 d-block text-danger mt-1">
                                                                {this.state.validationErrors.firstNameError}
                                                            </span>
                                                            :
                                                            ""}
                                                    </div>

                                                    <div className="col ml-1">
                                                        <label className="m-0 text-color-green">Last Name: </label>
                                                        <input type="text" required
                                                               onChange={this.onChange}
                                                               name="su-lastName"
                                                               className="sign-up-last-name-btn w-100 py-2 px-1"
                                                               placeholder="Doe"/>
                                                        {!this.state.isLastNameValid ?
                                                            <span
                                                                className="font-size-2 d-block text-danger mt-1">
                                                                {this.state.validationErrors.lastNameError}
                                                            </span>
                                                            :
                                                            ""}
                                                    </div>

                                                </div>

                                                <div className="row mb-3">

                                                    <div className="col mr-1">
                                                        <label className="m-0 text-color-green">Email Address: </label>
                                                        <input type="email" required
                                                               onChange={this.onChange}
                                                               name="su-email"
                                                               className="sign-up-email-btn w-100 py-2 px-1"
                                                               placeholder="JohnDoe@domain.com"/>
                                                        {!this.state.isEmailValid ?
                                                            <span
                                                                className="font-size-2 d-block text-danger mt-1">
                                                                {this.state.validationErrors.emailError}
                                                            </span>
                                                            :
                                                            ""}
                                                    </div>

                                                    <div className="col ml-1">
                                                        <label className="m-0 text-color-green">Password: </label>

                                                        <input type="password" required
                                                               onChange={this.onChange}
                                                               name="su-password"
                                                               className="sign-up-password-btn w-100 py-2 px-1"
                                                               placeholder="Password"/>
                                                        {!this.state.isPasswordValid ?
                                                            <span
                                                                className="font-size-2 d-block text-danger mt-1">
                                                                {this.state.validationErrors.passwordError}
                                                            </span>
                                                            :
                                                            ""}
                                                    </div>

                                                </div>

                                            </div>

                                            {this.state.isEmailExist ?
                                                <div className="w-100">

                                                    <p className="text-danger text-left font-size-2">
                                                        This email is already in use!
                                                        <a href="forgot-password" className="d-block font-size-2">
                                                            Forgot Password?
                                                        </a>
                                                        Use another email to create
                                                        a new account
                                                    </p>

                                                </div> : ""}

                                            <input type="submit" className="sign-up-submit-btn w-50 py-2 my-2"
                                                   value="Sign Up"/>

                                        </div>

                                    </form>

                                    <hr/>

                                </div>

                                <div className="">

                                    <div className="text-center">

                                        <p className="font-size-3 d-inline text-color-green">
                                            By continuing,
                                            I accept the <span className="font-weight-bolder">YummyYum</span>
                                            <a href="/terms" className="text-decoration-none"> Terms </a>
                                            and
                                            <a href="/privacy-policy" className="text-decoration-none"> Privacy
                                                Policy</a> .
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        )

    }

}

export default SignUp;