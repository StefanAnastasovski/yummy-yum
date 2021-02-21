import React from "react";

const HeaderUsername = (props) => {


    let hrefDestination = "";
    let isAdmin = localStorage.getItem("isAdmin");

    if(isAdmin === "YES"){
        hrefDestination = "admin"
    } else if(isAdmin === "NO"){
        hrefDestination = "user"
    }


    return (

        <div className="nav-menu-right d-flex">

            {/*nav-menu right side*/}
            <p className="align-self-center">
                <a href={"/dashboard/"+hrefDestination} className="text-decoration-none font-size-1">
                    <span>Username: </span>
                    <span className="border-bottom">{localStorage.getItem("username")}</span>
                </a>
            </p>

            {localStorage.getItem("isAdmin") === "YES" ?
                <a className="btn-log-out ml-2 align-self-center text-decoration-none"
                   href={"/dashboard/" +hrefDestination}>
                    <span className="d-flex align-self-center ">
                        DASHBOARD
                    </span>
                </a>
                :
                ""}

            <input type="button"
                   className="btn-log-out ml-2 align-self-center"
                   value="Log Out"
                    onClick={props.logOut}/>

        </div>

    )

};

export default HeaderUsername;