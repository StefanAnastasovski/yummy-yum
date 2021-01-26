import React, {Component} from "react";
import {Redirect} from "react-router-dom";

class AccountCreated extends Component {

    state = {
        goToLogIn: false
    }

    goToLogIn = () => {
        this.setState(prevState => ({
            goToLogIn: !prevState.goToLogIn
        }))
    }

    render() {

        if (this.state.goToLogIn) {
            return <Redirect to="/log-in"/>
        }

        return (

            <div className="sign-up-success-wrapper">

                <div className="signup-container container d-flex justify-content-center align-items-center ">

                    <div className="sign-up-success d-flex justify-content-center  py-5 flex-column w-50">

                        <p className="text-success text-center pb-3">
                            Your account has been created successfully!
                        </p>

                        <div className="d-flex justify-content-center go-to-login">
                            <input className="btn-go-to-login w-50 "
                                   type="button"
                                   name="go-to-login"
                                   value="Go to Log In"
                                   onClick={this.goToLogIn}
                            />
                        </div>

                    </div>

                </div>

            </div>

        )
    }


}

export default AccountCreated;