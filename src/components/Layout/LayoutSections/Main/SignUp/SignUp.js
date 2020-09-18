import React from "react";

import './SignUp.css';


const SignUp = () => {

    return (

        <div className="sign-up-wrapper">

            <div className="signup-container container">

                <div className="sign-up-card d-flex justify-content-center py-5">

                    <div className="card p-5">

                        <div>

                            <h2 className="text-center">

                                <span className="d-block">Sign Up</span>
                                <span className="font-size-3 text-color-mlgreen">
                                    taste delicious meals from our menu or customize one by yourself!
                                </span>

                            </h2>


                            <div className="pt-5 pb-3 d-flex align-items-center flex-column">

                                <hr/>

                                <div className="row">

                                    <div className="col mr-1">
                                        <label className="m-0 text-color-green">First Name: </label>
                                        <input type="text" className="sign-up-first-name-btn w-100 py-2 px-1 mb-3"
                                               placeholder="John"/>

                                        <label className="m-0 text-color-green">Last Name: </label>
                                        <input type="email" className="sign-up-last-name-btn w-100 py-2 px-1 mb-3"
                                               placeholder="Doe"/>

                                    </div>

                                    <div className="col ml-1">

                                        <label className="m-0 text-color-green">Email Address: </label>
                                        <input type="email" className="sign-up-email-btn w-100 py-2 px-1 mb-3"
                                               placeholder="JohnDoe@domain.com"/>

                                        <label className="m-0 text-color-green">Password: </label>

                                        <input type="password" className="sign-up-password-btn w-100 py-2 px-1 mb-2"
                                               placeholder="Password"/>

                                    </div>

                                </div>

                                <input type="submit" className="sign-up-submit-btn w-50 py-2 my-2" value="Sign Up"/>

                                <hr/>

                            </div>

                            <div className="">

                                <div className="text-center">

                                    <p className="font-size-3 d-inline text-color-green">
                                        By continuing,
                                        I accept the <span className="font-weight-bolder">YummyYum</span>
                                        <a href="/terms" className="text-decoration-none"> Terms </a>
                                        and
                                        <a href="/privacy-policy" className="text-decoration-none"> Privacy Policy</a> .
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    )

};
// By continuing, I accept the YummyYum Terms and Privacy Policy.
export default SignUp;