import React, {Component} from "react";

import Header from "./LayoutSections/Header/Header"
import Footer from "./LayoutSections/Footer/Footer";
import Main from "./LayoutSections/Main/Main";

import './Layout.css';
import PopUpBox from "./LayoutSections/PopUp/PopUpBox";
import SubscribedMessage from "./LayoutSections/PopUp/PopUpMessages/SubscribedMessage";
import LoggedOutMessage from "./LayoutSections/PopUp/PopUpMessages/LoggedOutMessage";
import UpdatePasswordMessage from "./LayoutSections/PopUp/PopUpMessages/UpdatePasswordMessage";

class Layout extends Component {
//
    state = {
        showPopUp: false,
        isLoggedIn: false,
        isRedirectedToHome: false,
        isRedirectedFromUpdatePassword: false,
        isSubscribeFieldCorrect: false,
        menu: [],
        allMenu: [],
        mixMenu: [],
        isRows: false,
        rows: [],
        isMixCreated: false,
        loading: true,
        isWeeklyMenu: false
    }

    async componentDidMount() {
        console.log(window.location.pathname)
    }

    isSubscribeFieldIsCorrectPopUpBoxHandler = (value) => {
        this.setState({
            isSubscribeFieldCorrect: value
        })
    }


    changeMixCreated = () => {
        this.setState({
            isMixCreated: true
        })
    }

    showPopUpHandler = (popUpName) => {

        if (popUpName === "logged-in") {
            this.setState({
                isRedirectedToHome: !this.state.isRedirectedToHome
            })
        } else if (popUpName === "password-changed") {
            this.setState({
                isRedirectedFromUpdatePassword: !this.state.isRedirectedFromUpdatePassword
            })
        } else {
            this.setState({
                showPopUp: !this.state.showPopUp
            })
        }

    }

    handleLogin = () => {
        this.setState(prevState => ({
            isLogin: !prevState.isLogin
        }))
    }

    addUsername = (username) => {
        this.setState({
            username: username
        })
    }

    removeLocalStorage = () => {

        localStorage.removeItem("shoppingCartItems");
        localStorage.removeItem("scheduleCartItems");
        localStorage.removeItem("subscriptionPayment");
        localStorage.removeItem("subscription");
        localStorage.removeItem("orderSummary");
        localStorage.removeItem("checkoutPrice");


    }

    onClickLogOut = () => {

        this.removeLocalStorage();

        localStorage.setItem("username", "")
        localStorage.setItem("isLoggedIn", "NO")
        localStorage.setItem("userInformation", JSON.stringify({}))

        this.setState({
            isLoggedIn: false,
            isRedirectedToHome: true
        })


    }

    handleUpdatePassword = () => {
        this.setState({
            isRedirectedFromUpdatePassword: true
        })
    }

    onClickLogIn = () => {
        this.setState({
            isLoggedIn: true
        })
    }


    render() {

        return (

            <div className="container-wrapper">

                {/*MRHeader*/}
                <Header
                    logOut={this.onClickLogOut.bind(this)}
                    isLoggedIn={this.state.isLoggedIn}
                />

                {/*Main*/}
                <Main
                    logIn={this.onClickLogIn}
                    isLoggedIn={this.state.isLoggedIn}
                    isRedirectedToHome={this.state.isRedirectedToHome}
                    isRedirectedFromUpdatePassword={this.state.isRedirectedFromUpdatePassword}
                    handleUpdatePassword={this.handleUpdatePassword.bind(this)}
                    handleLogin={this.handleLogin.bind(this)}
                    addUsername={this.addUsername.bind(this)}/>

                {
                    this.state.isRedirectedFromUpdatePassword &&
                    <PopUpBox
                        message={UpdatePasswordMessage}
                        isRedirectedFromUpdatePassword={this.state.isRedirectedFromUpdatePassword}
                        showPopUp={this.state.showPopUp}
                        clicked={this.showPopUpHandler.bind(this, "password-changed")}/>

                }

                {

                    this.state.isRedirectedToHome &&
                    <PopUpBox
                        message={LoggedOutMessage}
                        showPopUp={this.state.showPopUp}
                        isRedirectedToHome={this.state.isRedirectedToHome}
                        clicked={this.showPopUpHandler.bind(this, "logged-in")}/>

                }

                {/*Subscribe Pop Up*/}
                {
                    this.state.showPopUp &&

                    <PopUpBox
                        message={SubscribedMessage}
                        showPopUp={this.state.showPopUp}
                        clicked={this.showPopUpHandler}
                        isSubscribeFieldCorrect={this.state.isSubscribeFieldCorrect}
                    />

                }

                {/*Footer*/}
                <Footer
                    showPopUp={this.state.showPopUp}
                    clicked={this.showPopUpHandler}
                    subscribeFieldHandler={this.isSubscribeFieldIsCorrectPopUpBoxHandler.bind(this)}
                />


            </div>
            //
        )

    }

}

export default Layout;
