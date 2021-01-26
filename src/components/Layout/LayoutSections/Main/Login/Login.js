import React from "react";

import './Login.css';


const Login = () => {


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

                                <div className="pt-5 pb-3">

                                    <label className="m-0 text-color-green">Email Address: </label>
                                    <input type="email" className="log-in-email-btn w-100 py-2 px-1 mb-3"
                                           placeholder="JohnDoe@domain.com"/>

                                    <div className="d-flex justify-content-between">

                                        <label className="m-0 text-color-green">Password: </label>
                                        <a href="/forgot-password" className="font-size-3 d-flex align-items-center">Forgot
                                            Password?</a>

                                    </div>

                                    <input type="password" className="log-in-password-btn w-100 py-2 px-1 mb-2"
                                           placeholder="Password"/>
                                    <input type="submit" className="log-in-submit-btn w-100 py-2 my-2" value="Log In"/>

                                    <hr/>

                                </div>

                                <div className="">

                                    <div className="text-center">
                                        <p className="font-size-2 d-inline text-color-green">Don’t have an
                                            account?</p>
                                        <a href="join-now" className="font-size-2 pl-1"> Get Started </a></div>
                                </div>


                            </div>

                        </div>

                    </div>

                </div>

            </div>


        </div>
    )

};

export default Login;