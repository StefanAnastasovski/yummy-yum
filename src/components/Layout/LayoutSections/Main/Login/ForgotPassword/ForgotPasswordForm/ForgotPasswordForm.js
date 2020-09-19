import React from "react";

const ForgotPasswordForm = (props) => {


    return (

        <div className="forgot-password-card d-flex justify-content-center py-5">

            <div className="card p-5">

                <div>

                    <h2 className="text-center">
                        Forgot Password
                    </h2>

                    <div className="pt-5 pb-3">

                        <form>

                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1"
                                       aria-describedby="emailHelp" placeholder="Enter email"/>
                            </div>

                            <button type="submit" onClick={props.clicked}
                                    className="forgot-password-submit-btn w-100">Submit
                            </button>

                        </form>


                    </div>


                </div>

            </div>

        </div>

    )

}

export default ForgotPasswordForm;

