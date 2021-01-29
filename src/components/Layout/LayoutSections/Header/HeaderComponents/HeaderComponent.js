import React from "react";

const HeaderComponent = () => {

    return (

        <div className="nav-menu-right d-flex">

            {/*nav-menu right side*/}

            <ul className="nav navbar-nav flex-row nav-menu align-items-center font-weight-bold">

                <li className="pl-2">
                    <a href="/log-in">Log In</a>
                </li>

                <li className="pl-2">
                    <a href="/join-now">Sign Up</a>
                </li>

            </ul>

        </div>

    )

};

export default HeaderComponent;