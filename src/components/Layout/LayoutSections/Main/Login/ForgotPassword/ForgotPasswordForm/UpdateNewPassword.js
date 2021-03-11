import React from "react";

const UpdateNewPassword = (props) => {

    let passwordDidntMatch = null;
    if (!props.isPasswordsMatch && props.isPasswordsMatch !== null) {
        passwordDidntMatch = "border-danger";
    }
    return (
        <div className="forgot-password-card d-flex justify-content-center py-5">

            <div className="card p-5">

                <div>

                    <h2 className="text-center">
                        Change Password
                    </h2>

                    <div className="pt-5 pb-3">

                        <form>

                            <p className="pb-4">Create a strong password</p>

                            <div className="form-group">
                                <input type="password" className="form-control" id="newPassword"
                                       required
                                       onChange={props.onChangeNewPassword}
                                       aria-describedby="newPassword" placeholder="New password"
                                />
                                {
                                    props.passwordError.length > 0 ?
                                        <p className="text-danger font-size-2">
                                            {props.passwordError}
                                        </p> : null
                                }
                            </div>

                            <div className="form-group">
                                <input type="password" className={"form-control " + passwordDidntMatch}
                                       id="confirmPassword"
                                       required
                                       onChange={props.onChangeConfirmPassword}
                                       aria-describedby="confirmPassword" placeholder="Confirm password"
                                       value={props.confirmPasswordValue}
                                />

                            </div>

                            {
                                !props.isPasswordsMatch && props.isPasswordsMatch !== null ?
                                    <p className="text-danger font-size-3">
                                        Those passwords didn’t match. Try again.
                                    </p> : null
                            }

                            <button type="submit" onClick={props.handleSavePassword}
                                    className="forgot-password-submit-btn w-100 mt-4">Save Password
                            </button>

                        </form>


                    </div>


                </div>

            </div>

        </div>

    )

}

export default UpdateNewPassword;

