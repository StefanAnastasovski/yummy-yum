import React, {Component} from "react";
import {Redirect} from "react-router-dom";

import './Login.css';

import passwordHash from 'password-hash';
import UserCalls from "../../../../../repository/get/getUser"
import postLogin from "../../../../../repository/post/postLogin";

class Login extends Component {

    state = {
        isEmailExist: false,
        username: "",
        loginEmail: "",
        loginPassword: "",
        dbPassword: "",
        isAdmin: false,
        isPasswordCorrect: null

    }

    handleSubmitLogin = async (event) => {

        event.preventDefault();
        let email = this.state.loginEmail.toLowerCase();

        await UserCalls.fetchUserByEmail(email).then((response) => {
            if (response.data) {
                let isAdmin = false;
                if (response.data.username === "admin") {
                    isAdmin = true;
                }
                this.setState({
                    dbPassword: response.data.password,
                    username: response.data.username,
                    isAdmin: isAdmin
                })
            }

        })

        if (passwordHash.verify(this.state.loginPassword, this.state.dbPassword) || this.state.loginPassword === this.state.dbPassword) {
            localStorage.setItem("username", this.state.username)
            localStorage.setItem("isLoggedIn", "YES")
            this.state.isAdmin ? localStorage.setItem("isAdmin", "YES") : localStorage.setItem("isAdmin", "NO");
            this.setState({
                isPasswordCorrect: true
            })

            let emailLogin = {
                email: email
            }
            let newLogin = {
                loginDate: new Date(),
                email: emailLogin
            }
            postLogin.createLogin(newLogin).then(response => {
            });

            this.props.logIn()

        } else {
            this.setState({
                isPasswordCorrect: false
            })
        }


    };

    onChangeHandle = (event) => {

        let value = event.target.name;
        if (value === "login-email") {
            this.setState({
                loginEmail: event.target.value
            })
        } else if (value === "login-password") {
            this.setState({
                loginPassword: event.target.value
            })
        }

    }

    render() {

        if (this.props.isLoggedIn) {
            if (this.state.isAdmin)
                return <Redirect to="/admin/dashboard"/>
            else
                return <Redirect to="/"/>
        }

        return (

            <div className="log-in-wrapper">

                <div className="log-in-container container">

                    <div className="log-in">

                        <div className="log-in-card d-flex justify-content-center py-5">

                            <div className="card p-5">

                                <div>

                                    <h2 className="text-center">
                                        Log in
                                    </h2>

                                    <form onSubmit={this.handleSubmitLogin}>

                                        <div className="pt-5 pb-3">

                                            <label className="m-0 text-color-green">Email Address: </label>
                                            <input type="email" className="log-in-email-btn w-100 py-2 px-1 mb-3"
                                                   name="login-email"
                                                   onChange={this.onChangeHandle}
                                                   placeholder="JohnDoe@domain.com"/>

                                            <div className="d-flex justify-content-between">

                                                <label className="m-0 text-color-green">Password: </label>
                                                <a href="/forgot-password"
                                                   className="font-size-3 d-flex align-items-center">Forgot
                                                    Password?</a>

                                            </div>

                                            <input type="password" className="log-in-password-btn w-100 py-2 px-1 mb-2"
                                                   name="login-password"
                                                   onChange={this.onChangeHandle}
                                                   placeholder="Password"/>

                                            <div>
                                                {this.state.isPasswordCorrect === false ?
                                                    <p className="py-2 text-danger font-size-2">
                                                        Your account or password is incorrect.
                                                        If you don't remember your password,
                                                        <span> </span><a href="/forgot-password">reset it now.</a>
                                                    </p>
                                                    : null}
                                            </div>

                                            <input type="submit" className="log-in-submit-btn w-100 py-2 my-2"
                                                   value="Log In"
                                            />

                                            <hr/>

                                        </div>

                                    </form>

                                    <div className="">

                                        <div className="text-center">
                                            <p className="font-size-2 d-inline text-color-green">Don’t have an
                                                account?</p><span> </span>
                                            <a href="join-now" className="font-size-2 pl-1">Get Started </a></div>
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

export default Login;