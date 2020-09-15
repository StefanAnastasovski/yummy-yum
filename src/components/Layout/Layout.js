import React, {Component} from "react";

import Header from "./Header/Header"
import Footer from "./Footer/Footer";
import Home from "./Main/Home/Home";

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

                {/*Main*/}
                <Home/>

                {/*Footer*/}
                <Footer/>

            </div>

        )

    }

}

export default Layout;
