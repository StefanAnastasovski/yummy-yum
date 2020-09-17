import React from "react";

import './Main.css';

import MainRouter from "../../Routers/MainRouter/MainRouter";


const Main = () => {

    return (

        <div className="main-wrapper">

            {/*MainRouter - Routing Main components*/}
            <MainRouter/>

        </div>

    )

};

export default Main;