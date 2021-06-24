import React from "react";

import './Main.css';

import MainRouter from "../../Routers/MainRouter/MainRouter";


const Main = (props) => {

    return (

        <div className="main-wrapper">

            {/*MainRouter - Routing Main SubscriptionPlanComponents*/}
            <MainRouter logIn={props.logIn}
                        isLoggedIn={props.isLoggedIn}
                        isRedirectedToHome={props.isRedirectedToHome}
                        isRedirectedFromUpdatePassword={props.isRedirectedFromUpdatePassword}
                        handlePassword={props.handleUpdatePassword}
                        handleLogin={props.handleLogin}
                        addUsername={props.addUsername}
                        menu={props.menu}
            />

        </div>

    )

};

export default Main;