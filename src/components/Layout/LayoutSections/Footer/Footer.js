import React, {Component} from "react";

import './Footer.css';
import '../../../../index.css';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook} from "@fortawesome/free-brands-svg-icons";
import {faInstagram} from "@fortawesome/free-brands-svg-icons";
import {faTwitter} from "@fortawesome/free-brands-svg-icons";
import {faMailBulk} from "@fortawesome/free-solid-svg-icons";

import SubscribePic from '../../../../images/Footer/Subscribe/subscribe-pic.jpg'
import Aux from "../../../../hoc/Auxilliary";

import SubscribeEmailCalls from '../../../../repository/get/getSubscribeEmail';
import postSubscribeEmail from '../../../../repository/post/postSubscribeEmail';

class Footer extends Component {


    state = {
        subscribeEmail: "",
        isSubscribeEmailExist: false,
        showBorderDanger: false,
        isSubscribeEmailFormatCorrect: false
    }


    isSubscribeFieldCorrectHandler = async (event) => {

        let fieldValue = event.target.value;

        let emailRegex =
            new RegExp(
                /[a-zA-Z][\w.][\w.][\w.][\w.][\w.]+@[a-zA-Z][a-zA-Z][a-zA-Z]+\.[a-zA-Z][a-zAZ]+/, "gi"
            );
        let value = false;
        if (fieldValue.match(emailRegex)) {
            if (!value) {
                value = true;
                this.setState({
                    showBorderDanger: true,
                    isSubscribeEmailFormatCorrect: value
                })

            }
        } else {
            value = false;
            this.setState({
                showBorderDanger: false,
                isSubscribeEmailFormatCorrect: value
            })
        }

        this.emailFieldHandler(fieldValue);
    }

    emailFieldHandler = (emailValue) => {
        this.setState({
            subscribeEmail: emailValue
        })
    }

    getSubscribeEmail = async () => {

        await SubscribeEmailCalls.fetchSubscribeEmailByEmail(this.state.subscribeEmail).then(response => {
            if (response.data) {
                this.setState({
                    isSubscribeEmailExist: true
                })
            } else {
                this.setState({
                    isSubscribeEmailExist: false
                })
            }

        }).catch(e => {
            // console.log(e)
        })
    }

    postSubscribeEmailHandler = (subscribeEmail) => {
        let obj = {
            email: {
                email: subscribeEmail
            }
        }
        postSubscribeEmail.createSubscribeEmail(obj).then(response => {
            // console.log(response)
        }).catch(e => {
            // console.log(e)
        })
    }

    isSubscribedEmailExist = (isEmailExist) => {
        let value;
        if (isEmailExist) {
            this.setState({
                showBorderDanger: false,
            })
            value = false;
        } else {
            this.setState({
                showBorderDanger: true,
            })
            value = true;
        }
        this.props.subscribeFieldHandler(value);

    }

    handleSubmit = async (event) => {
        event.preventDefault();

        await this.getSubscribeEmail();
        await this.isSubscribedEmailExist(this.state.isSubscribeEmailExist)
        if (!this.state.isSubscribeEmailExist) {
            this.postSubscribeEmailHandler(this.state.subscribeEmail);
            document.getElementById("subscribe-email-field").value = "";
        }
        // if (!(!this.props.showBorderDanger && this.props.showPopUp))
        //     event.target.reset()

    }

    render() {

        let showFooterNavMenu = "";
        let showFooter = "";

        if (window.location.pathname !== "/") {
            showFooterNavMenu = "d-none";
        }

        if (window.location.pathname.includes("dashboard/user") ||
            window.location.pathname.includes("dashboard/admin")) {
            showFooter = "d-none";
        }


        return (

            <Aux>

                <div className={"footer-wrapper py-3 " + showFooter} >

                    <div className="container">

                        {/*nav-menu footer*/}
                        <div className={"nav-menu-footer " + showFooterNavMenu}>

                            <div className="row py-2">

                                {/*nav-menu footer left side - information*/}
                                <div className="col-8 nav-menu-footer-left">

                                    <div className="row text-center">

                                        <div className="col">

                                            <h5 className="text-uppercase text-color-green">Service</h5>
                                            <ul className="nav navbar-nav nav-menu">

                                                <li><a href="/weekly-menu">Our Menu</a></li>
                                                <li><a href="/how-it-works">How It Works</a></li>
                                                <li><a href="/log-in">Login</a></li>
                                                <li><a href="/join-now">Sign Up</a></li>
                                                <li><a href="/terms">Terms of Service</a></li>
                                                <li><a href="/privacy-policy">Privacy Policy</a></li>

                                            </ul>

                                        </div>

                                        {/*<div className="col">*/}

                                        {/*    <h5 className="text-uppercase text-color-green">Resources</h5>*/}
                                        {/*    <ul className="nav navbar-nav  nav-menu">*/}

                                        {/*        <li><a href="/">The Table</a></li>*/}
                                        {/*        <li><a href="/">Recipe Categories</a></li>*/}
                                        {/*        <li><a href="/">Kitchenware</a></li>*/}
                                        {/*        <li><a href="/"> FAQs & Support</a></li>*/}

                                        {/*    </ul>*/}

                                        {/*</div>*/}

                                        <div className="col">

                                            <h5 className="text-uppercase text-color-green">About Us</h5>
                                            <ul className="nav navbar-nav  nav-menu">

                                                <li><a href="/">Our Goal</a></li>
                                                <li><a href="/">Meet the Team</a></li>

                                            </ul>

                                        </div>

                                    </div>

                                </div>

                                {/*footer - subscribe section*/}
                                {/*nav-menu footer right side - subscribe*/}
                                <div className="col-4 subscribe-wrapper px-2">

                                    <div>

                                        <img className="footer-subscribe-pic"
                                             src={SubscribePic}
                                             alt="meal"
                                             width="100%"
                                             height="100%"
                                        />

                                    </div>

                                    <h5 className="text-center py-2">
                                        Get free recipes and special
                                        offers delivered to your inbox every week!
                                    </h5>

                                    <form className="subscribe-email" onSubmit={this.handleSubmit.bind(this)}>

                                        <div className="d-flex w-100 btn-section border-">

                                            <div className="col-8 p-0">

                                                <input
                                                    className={"subscribe-email-btn px-2     w-100 no-border" +
                                                    ((!this.state.showBorderDanger && this.props.showPopUp)
                                                        ? " border-danger border" : "")
                                                    }
                                                    id="subscribe-email-field"
                                                    placeholder="Email"
                                                    type="email"
                                                    onChange={this.isSubscribeFieldCorrectHandler}
                                                />

                                            </div>

                                            <div className="col-4 p-0 ml-1">

                                                <input className="submit-email-btn w-100"
                                                       onClick={this.props.clicked}
                                                       type="submit"/>

                                            </div>

                                        </div>

                                    </form>

                                </div>

                            </div>

                        </div>

                        {/*footer - copyrights*/}
                        <div className="cr-section mx-5">

                            <p className="text-center w-100 px-5 pt-3">
                                ©2020 YummyYum Inc. YummyYum is a meal delivery service supplying
                                weekly deliveries of fresh, perfectly
                                portioned ingredients and chef-designed recipes.
                            </p>

                        </div>

                        {/*footer - social media icons*/}
                        <div className="social-media-icons pt-4">

                            <ul className="nav navbar-nav flex-row justify-content-center nav-menu">

                                <li><a href="http://www.facebook.com/">
                                    <FontAwesomeIcon icon={faFacebook} className="fa-2x">facebook</FontAwesomeIcon>
                                </a></li>

                                <li><a href="https://www.instagram.com/">
                                    <FontAwesomeIcon icon={faInstagram}
                                                     className="fa-2x">instagram</FontAwesomeIcon>
                                </a></li>

                                <li><a href="http://www.twitter.com/">
                                    <FontAwesomeIcon icon={faTwitter} className="fa-2x">twitter</FontAwesomeIcon>
                                </a></li>

                                <li><a href="https://gmail.com">
                                    <FontAwesomeIcon icon={faMailBulk} className="fa-2x">email</FontAwesomeIcon>
                                </a></li>

                            </ul>

                        </div>

                    </div>

                </div>

            </Aux>


        )

    }

}

export default Footer;