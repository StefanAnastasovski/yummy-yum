import React from "react";

import './HowItWorks.css';
import ManageDeliveryIcon from "./HIWIcons/ManageDeliveryIcon";
import OrderIcon from "./HIWIcons/OrderIcon";
import MealBoxIcon from "./HIWIcons/MealBoxIcon";

const HowItWorks = (props) => {

    return (

        <div className="how-it-works-wrapper">

            <div className="hiw">

                <div className="hiw-header">

                    <div className="container d-flex justify-content-center align-items-center h-100">
                        <h1 className="text-color-green font-header-size-1">How It Works</h1>
                    </div>

                </div>

                <div className="container pb-5">

                    <div className="row hiw-steps pt-5">

                        <div className="row w-100">

                            <div className="col bg-dark mr-2">
                                d
                            </div>

                            <div className="col ml-2">

                                <h1 className="text-color-green">1. Pick Your Meals</h1>
                                <p>Select recipes each week that fit your preferences and dietary restrictions. Accept
                                    our
                                    suggestions or choose your own!</p>

                            </div>

                        </div>

                        <div className="row w-100 pt-5">

                            <div className="col mr-2">

                                <h1 className="text-color-green">2. Customize Your Plate</h1>
                                <p>Use our Customize It feature to upgrade, swap, or double up your favorite protein on
                                    select
                                    recipes.</p>

                            </div>

                            <div className="col bg-dark ml-2">
                                d
                            </div>

                        </div>

                        <div className="row w-100 pt-5">

                            <div className="col bg-dark mr-2">
                                d
                            </div>


                            <div className="col ml-2">

                                <h1 className="text-color-green">3. Cook And Enjoy!</h1>
                                <p>Fresh, pre-portioned ingredients delivered right to your door – effortlessly create
                                    and
                                    plate
                                    exciting dishes with our step-by-step recipe cards.</p>

                            </div>

                        </div>

                    </div>

                </div>


                <div className="hiw-manage-deliveries py-5 my-5">

                    <div className="container ">

                        <div className="row hiw-md">

                            <div className="col text-center">
                                <div className="hiw-md-icon m-auto">
                                    <ManageDeliveryIcon className="hiw-md-manage-delivery-icon"/>
                                </div>
                                <h4 className="pt-2 text-color-green">
                                    Manage your deliveries.</h4>
                                <p>Skip deliveries or pause your account anytime.</p>
                            </div>

                            <div className="col text-center">
                                <div className="hiw-md-icon m-auto">
                                    <OrderIcon className="hiw-md-manage-delivery-icon"/>
                                </div>
                                <h4 className="pt-2 text-color-green">Order only what you want.</h4>
                                <p>Add meals and edit your servings.</p>
                            </div>

                            <div className="col text-center">
                                <div className="hiw-md-icon m-auto">
                                    <MealBoxIcon className="hiw-md-manage-delivery-icon"/>
                                </div>
                                <h4 className="pt-2 text-color-green">Fit it to your lifestyle.</h4>
                                <p>We’ve got lots of options for dietary preferences!</p>
                            </div>

                        </div>

                    </div>


                </div>

                <div className="container pb-5">

                    <div className="hiw-build-box">

                        <h2 className="text-center text-color-green">Build Your Box &
                            <span className="d-block">Receive It at Your Door</span>
                        </h2>

                        <p className="pt-2 text-center">With a different menu each week, there’s always new recipes to
                            discover! Find the cooking
                            experience you desire.</p>

                        <h4 className="text-center pt-5 text-color-mlgreen">Order Online</h4>

                        <p className="text-center">
                            We make it easy – pick delivery dates or skip weeks to work with your schedule.
                        </p>

                        <div className="text-center my-3 py-2 hiw-btn-pick-meal">

                            <a href="/choices">
                                <button className="btn-pick-meal font-weight-bold">Pick Your Meals</button>
                            </a>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    )

};

export default HowItWorks;