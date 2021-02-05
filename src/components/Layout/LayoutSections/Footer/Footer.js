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


class Footer extends Component {

    handleSubmit(event) {
        event.preventDefault();
        if(!(!this.props.showBorderDanger && this.props.showPopUp))
            event.target.reset()
    }

    render() {

        let showFooterNavMenu = "";

            if (window.location.pathname !== "/") {
                showFooterNavMenu = "d-none";
            }


        return (

            <Aux>

                <div className="footer-wrapper py-3">

                    <div className="container">

                        {/*nav-menu footer*/}
                        <div className={"nav-menu-footer " + showFooterNavMenu}>

                            <div className="row py-2">

                                {/*nav-menu footer left side - information*/}
                                <div className="col-8 nav-menu-footer-left">

                                    <div className="row">

                                        <div className="col">

                                            <h5 className="text-uppercase text-color-green">Service</h5>
                                            <ul className="nav navbar-nav nav-menu">

                                                <li><a href="/">Our Menu</a></li>
                                                <li><a href="/">How It Works</a></li>
                                                <li><a href="/">Gift Cards</a></li>
                                                <li><a href="/log-in">Login</a></li>
                                                <li><a href="/join-now">Sign Up</a></li>
                                                <li><a href="/">Students</a></li>
                                                <li><a href="/terms">Terms of Service</a></li>
                                                <li><a href="/privacy-policy">Privacy Policy</a></li>
                                                <li><a href="/">Do Not Sell My Info</a></li>

                                            </ul>

                                        </div>

                                        <div className="col">

                                            <h5 className="text-uppercase text-color-green">Resources</h5>
                                            <ul className="nav navbar-nav  nav-menu">

                                                <li><a href="/">The Table</a></li>
                                                <li><a href="/">Recipe Categories</a></li>
                                                <li><a href="/">Kitchenware</a></li>
                                                <li><a href="/"> FAQs & Support</a></li>

                                            </ul>

                                        </div>

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
                                                    ((!this.props.showBorderDanger && this.props.showPopUp)
                                                        ? " border-danger border" : "")
                                                    }
                                                    placeholder="Email"
                                                    type="email"
                                                    onChange={this.props.isFieldCorrectHandler}
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
                                    <FontAwesomeIcon icon={faTwitter} className="fa-2x">facebook</FontAwesomeIcon>
                                </a></li>

                                <li><a href="https://www.gmail.com/">
                                    <FontAwesomeIcon icon={faMailBulk} className="fa-2x">facebook</FontAwesomeIcon>
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