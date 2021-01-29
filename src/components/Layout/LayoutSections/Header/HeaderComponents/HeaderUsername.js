import React from "react";

const HeaderUsername = (props) => {

    return (

        <div className="nav-menu-right d-flex">

            {/*nav-menu right side*/}
            <p className="align-self-center">
                <a href="/" className="text-decoration-none font-size-1">
                    <span>Username: </span>
                    <span className="border-bottom">{localStorage.getItem("username")}</span>
                </a>
            </p>

            <input type="button"
                   className="btn-log-out ml-2 align-self-center"
                   value="Log Out"
                    onClick={props.logOut}/>

        </div>

    )

};

export default HeaderUsername;