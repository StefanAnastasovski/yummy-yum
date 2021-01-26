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
        isAccountCreated: false

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
            const hashedPassword = passwordHash.generate(this.state.newUser.password);
            obj = {
                ...this.state.newUser,
                password: hashedPassword,
            }

            this.setState({
                newUser: obj
            })
        }


    }

    handleSubmit = async (event) => {
        event.preventDefault();

        await EmailCalls.fetchIsEmailExist(this.state.newUser.email.email).then((response) => {
            if (!response.data.success || response.data.success) {
                this.setState({
                    isEmailExist: response.data.success,
                })
            }
            console.log(response.data.success)
            console.log(this.state.isEmailExist)
        })

        console.log(this.state.isEmailExist)
        if (this.state.isEmailExist === false) {
            console.log("!isEmailExist")
            let firstName = this.state.newUser.firstName;
            let lastName = this.state.newUser.lastName;
            let username = firstName + "." + lastName;
            let newUser;
            let flag = false;
            let i = 1;
            while (!flag) {

                await UserCalls.fetchIsUserExist(username).then((response) => {
                    this.setState({
                        isUserExist: response.data.success
                    });
                })

                if (!this.state.isUserExist) {
                    newUser = {
                        ...this.state.newUser,
                        username: username,
                        signUpDate: new Date()
                    }
                    postUser.addUser(newUser).then(response => {
                        console.log(response.data);
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


    };

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

                                            <div className="row">

                                                <div className="col mr-1">
                                                    <label className="m-0 text-color-green">First Name: </label>
                                                    <input type="text" required
                                                           onChange={this.onChange}
                                                           name="su-firstName"
                                                           className="sign-up-first-name-btn w-100 py-2 px-1 mb-3"
                                                           placeholder="John"/>

                                                    <label className="m-0 text-color-green">Last Name: </label>
                                                    <input type="text" required
                                                           onChange={this.onChange}
                                                           name="su-lastName"
                                                           className="sign-up-last-name-btn w-100 py-2 px-1 mb-3"
                                                           placeholder="Doe"/>

                                                </div>

                                                <div className="col ml-1">

                                                    <label className="m-0 text-color-green">Email Address: </label>
                                                    <input type="email" required
                                                           onChange={this.onChange}
                                                           name="su-email"
                                                           className="sign-up-email-btn w-100 py-2 px-1 mb-3"
                                                           placeholder="JohnDoe@domain.com"/>

                                                    <label className="m-0 text-color-green">Password: </label>

                                                    <input type="password" required
                                                           onChange={this.onChange}
                                                           name="su-password"
                                                           className="sign-up-password-btn w-100 py-2 px-1 mb-2"
                                                           placeholder="Password"/>

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