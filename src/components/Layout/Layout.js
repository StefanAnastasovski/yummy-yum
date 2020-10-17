import React, {Component} from "react";

import Header from "./LayoutSections/Header/Header"
import Footer from "./LayoutSections/Footer/Footer";
import Main from "./LayoutSections/Main/Main";

import './Layout.css';
import SubscribePopUp from "./LayoutSections/PopUp/SubscribePopUp";

class Layout extends Component {

    state = {
        showPopUp: false,
        isSubscribeFieldCorrect: false,
        showBorderDanger: false
    }

    showPopUpHandler = () => {
        this.setState({
            showPopUp: !this.state.showPopUp
        })
    }

    isSubscribeFieldCorrectHandler = (event) => {

        let fieldValue = event.target.value;

        let emailRegex =
            new RegExp(
                /[a-zA-Z][\w.][\w.][\w.][\w.][\w.]+@[a-zA-Z][a-zA-Z][a-zA-Z]+\.[a-zA-Z][a-zAZ]+/, "gi"
            );

        if (fieldValue.match(emailRegex)) {
            if (!this.state.isSubscribeFieldCorrect) {
                this.setState({
                    isSubscribeFieldCorrect: !this.state.isSubscribeFieldCorrect,
                    showBorderDanger: true
                })
            }
        } else {
            this.setState({
                isSubscribeFieldCorrect: false,
                showBorderDanger: false,
            })
        }
    }

    render() {

        return (

            <div className="container-wrapper">

                {/*Header*/}
                <Header/>

                {/*Main*/}
                <Main/>

                {/*Subscribe Pop Up*/}
                {
                    this.state.showPopUp &&

                    <SubscribePopUp
                        showPopUp={this.state.showPopUp}
                        clicked={this.showPopUpHandler}
                        isSubscribeFieldCorrect={this.state.isSubscribeFieldCorrect}
                    />

                }

                {/*Footer*/}
                <Footer
                    showPopUp={this.state.showPopUp}
                    clicked={this.showPopUpHandler}
                    isFieldCorrect={this.state.isSubscribeFieldCorrect}
                    showBorderDanger={this.state.showBorderDanger}
                    isFieldCorrectHandler={this.isSubscribeFieldCorrectHandler}
                />


            </div>

        )

    }

}

export default Layout;
