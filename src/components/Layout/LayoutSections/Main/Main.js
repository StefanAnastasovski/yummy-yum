import React from "react";

import './Main.css';

import Aux from "../../../../hoc/Auxilliary";

import MainRouter from "../../Routers/MainRouter/MainRouter";


const Main = () => {

    return (

        <Aux>

            {/*MainRouter - Routing Main components*/}
            <MainRouter/>

        </Aux>

    )

};

export default Main;