import React from "react";

import './Main.css';

import MainRouter from "../../Routers/MainRouter/MainRouter";


const Main = (props) => {

    return (

        <div className="main-wrapper">

            {/*MainRouter - Routing Main components*/}
            <MainRouter logIn={props.logIn}
                        isLoggedIn={props.isLoggedIn}
                        isRedirectedToHome={props.isRedirectedToHome}
                        handleLogin={props.handleLogin}
                        addUsername={props.addUsername}
            />

        </div>

    )

};

export default Main;