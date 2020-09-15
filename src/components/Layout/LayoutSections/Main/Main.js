import React from "react";
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import './Main.css';

import Aux from "../../../../hoc/Auxilliary";

import Home from "./Home/Home";


const Main = () => {

    return (

        <Aux>

            <Home/>

        </Aux>

    )

};

export default Main;