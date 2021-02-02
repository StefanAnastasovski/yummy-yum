import React from "react";

import './Header.css';

import YYLogo1 from '../../../../images/Logo/yy-logo-8.svg'
import HeaderComponent from "./HeaderComponents/HeaderComponent";
import HeaderUsername from "./HeaderComponents/HeaderUsername";

const Header = (props) => {
    return (

        <div className="header-wrapper">

            <div className="h-menu d-flex px-5 justify-content-between">

                {/*nav-menu left side*/}
                <div className="nav-menu-left">

                    <ul className="nav navbar-nav flex-row nav-menu align-items-center font-weight-bold">
                        <li className="px-2">
                            <a href="/" className="no-border">
                                <img className="yylogo-menu"
                                     src={YYLogo1}
                                     alt="Yummy Yum"
                                     width="100%"
                                     height="100%"
                                />
                            </a>
                        </li>
                        <li className="pl-1"><a href="/">Our Plans</a></li>
                        <li><a href="/">How It Works</a></li>
                        <li><a href="/">Pricing</a></li>
                    </ul>

                </div>

                {
                    localStorage.getItem("isLoggedIn") === "YES"
                    ?
                    <HeaderUsername logOut={props.logOut} /> :
                    <HeaderComponent/>
                }

            </div>

        </div>
    )

};

export default Header;