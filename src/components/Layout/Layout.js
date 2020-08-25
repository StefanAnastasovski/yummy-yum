import React, {Component} from "react";

import Header from "./Header/Header"
import Footer from "./Footer/Footer";
import Main from "./Main/Main";

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
