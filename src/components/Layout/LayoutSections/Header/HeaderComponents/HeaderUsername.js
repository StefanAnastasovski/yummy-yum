import React from "react";

import CartIcon from "./CartIcon/CartIcon";
import DownIcon from "./DownIcon/DownIcon";

const HeaderUsername = (props) => {


    let hrefDestination = "";
    let isAdmin = localStorage.getItem("isAdmin");

    if (isAdmin === "YES") {
        hrefDestination = "admin"
    } else if (isAdmin === "NO") {
        hrefDestination = "user/personal-information"
    }


    return (

        <div className="nav-menu-right ">

            {/*nav-menu right side*/}

            <div className="header-cart-icon mr-2 d-flex justify-content-center cursor-pointer">

                <a href="/cart" className="align-self-center sel">

                    <CartIcon/>

                </a>

            </div>

            <ul className="nav-menu-right-dd">

                {/*<li className="d-flex" onClick={props.showDDMenuHandler}>*/}
                <li className="d-flex">

                    <div className="d-flex cursor-pointer">

                        <p className="border-bottom align-self-center">{localStorage.getItem("username")}</p>

                        <div className="header-down-icon align-self-center pl-2">
                            <DownIcon/>
                        </div>

                    </div>

                </li>

                <li>
                    {/*<ul className={"user-dd-menu " + props.showDDMenu}>*/}
                    <ul className={"user-dd-menu"}>
                        <li className="w-100 py-2">
                            {localStorage.getItem("isLoggedIn") === "YES" ?
                                <a className="btn-log-out py-2 justify-content-center text-decoration-none"
                                   href={"/dashboard/" + hrefDestination}>
                                    <span className="d-flex align-self-center ">
                                        DASHBOARD
                                    </span>
                                </a>
                                :
                                ""}
                        </li>
                        <li className="w-100 py-2">
                            <div>
                                <input type="button"
                                       className="btn-log-out w-100 py-2 justify-content-center align-self-center"
                                       value="Log Out"
                                       onClick={props.logOut}/>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>


        </div>

    )

};

export default HeaderUsername;