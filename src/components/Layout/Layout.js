import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import Aux from "../../hoc/Auxilliary";


import Header from "./LayoutSections/Header/Header"
import Footer from "./LayoutSections/Footer/Footer";
import MainRouter from "./Routers/MainRouter/MainRouter";

import './Layout.css';

class Layout extends Component {

    // state = {};

    // method = () => {
    //
    // };

    render() {

        return (

            <div className="container-wrapper">

                {/*Header*/}
                <Header/>

                {/*MainRouter - Routing Main components*/}
                <MainRouter/>

                {/*Footer*/}
                <Footer/>

            </div>

        )

    }

}

export default Layout;
