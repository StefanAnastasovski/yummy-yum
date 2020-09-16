import React, {Component} from "react";

import Header from "./LayoutSections/Header/Header"
import Footer from "./LayoutSections/Footer/Footer";
import Main from "./LayoutSections/Main/Main";

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
                <Main/>

                {/*Footer*/}
                <Footer/>

            </div>

        )

    }

}

export default Layout;
