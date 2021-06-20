import React from "react";

const UserPersonalInformation = (props) => {

    return (

        <div className="user-menu-body-main col">
            <div className="container">
                <div className="row d-flex flex-column">
                    <div className="col d-flex py-3">
                        <p className="col-3">
                            Full Name:
                        </p>
                        <p className="col text-color-green">
                            {props.info.firstName + " " + props.info.lastName}
                        </p>
                    </div>
                    <div className="col d-flex py-3">
                        <p className="col-3">
                            Username:
                        </p>
                        <p className="col text-color-green">
                            {props.info.username}
                        </p>
                    </div>
                    <div className="col d-flex py-3">
                        <p className="col-3">
                            Email:
                        </p>
                        <p className="col text-color-green">
                            {props.info.email.email}
                        </p>
                    </div>
                    <div className="col d-flex py-3">
                        <p className="col-3">
                            Forgot Password:
                        </p>
                        <p className="col"><a href="/forgot-password" className="text-color-green">Click Here </a></p>
                    </div>
                </div>
            </div>
        </div>

    )

}

export default UserPersonalInformation;