import React from "react";

import './Main.css';

import IMG1 from '../../../images/MainSection/ms1-img-1.jpg'
import IMG2 from '../../../images/MainSection/ms2-img-2.jpg'
import CustomizeIcon from './SYMIcons/CustomizeIcon'
import MenuChooseIcon from './SYMIcons/MenuChooseIcon'
import DeliveryIcon from './SYMIcons/DeliveryIcon'
import EnjoyIcon from './SYMIcons/EnjoyIcon'


const Main = () => {

    return (

        <div>

            <div className="main-wrapper">

                {/*Main Section 1*/}
                <div className="main-section-1">

                    <div className="ms1-img">

                        <img className="ms1-img-1"
                             src={IMG1}
                             alt="main img"
                             width="100%"
                             height="100%"
                        />

                    </div>

                    <div className="ms1-btn">

                        <div className="container text-center">

                            <h5>

                                Make Your Cooking
                                <span className="d-block">
                                    Easier and Faster
                                </span>
                                With Our Services


                            </h5>

                            <button type="submit" className="d-btn pick-your-meal">
                                Pick Your Meal
                            </button>

                        </div>

                    </div>

                </div>

                {/*Main Section 3*/}
                <div className="main-section-3 pt-3 pb-5">

                    <div className="container">

                        <div className="ms3-simplify-your-meal">

                            <h2 className="text-uppercase text-center">Simplify Your Meal</h2>
                            <p className="text-center text-color-green font-size-1 w-75 container">
                                Fresh weekly meal kits customized to your
                                liking and starting at
                                $6.99 per serving.
                            </p>

                            <div className="ms3-sym-icons pt-5">

                                <div className="row">

                                    <div className="col text-center">

                                        <MenuChooseIcon className="ms3-sym-menuchooseicon"/>

                                        <h5 className="pt-1">
                                            Select
                                        </h5>
                                        <p className="pt-1 font-size-2 px-2">
                                            Carb conscious, calorie conscious, vegetarian – we’ve got lots of options to
                                            fit your schedule and diet.
                                        </p>

                                    </div>

                                    <div className="col text-center">

                                        <CustomizeIcon className="ms3-sym-customizeicon"/>

                                        <h5 className="pt-1">
                                            Customize It
                                        </h5>
                                        <p className="pt-1 font-size-2 px-2">
                                            Use our Customize It feature to upgrade, swap, or double up proteins on
                                            select meals.
                                        </p>

                                    </div>

                                    <div className="col text-center">

                                        <DeliveryIcon className="ms3-sym-deliveryicon"/>

                                        <h5 className="pt-1">
                                            Delivery
                                        </h5>
                                        <p className="pt-1 font-size-2 px-2">
                                            If you are tired of going to the store,
                                            you will enjoy having
                                            everything you need delivered to your door.
                                        </p>

                                    </div>

                                    <div className="col text-center">

                                        <EnjoyIcon className="ms3-sym-enjoyicon"/>

                                        <h5 className="pt-1">
                                            Enjoy
                                        </h5>
                                        <p className="pt-1 font-size-2 px-2">
                                            Effortlessly create and plate your meals in no time.
                                            Meal is on the table within a second!
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                {/*Main Section 2*/}
                <div className="main-section-2 my-5">

                    <div className="container">

                        <div className="row">

                            <div className="col-6 ms2-left-side d-flex flex-column  justify-content-center">

                                <h3 className="text-center py-6 mb-2">
                                    We believe eating healthy and fresh
                                    should be easy for everyone.
                                </h3>
                                <p className="pr-5 text-color-green">
                                    That’s why we do the work of making
                                    food ready when you are with both
                                    nutrition and taste in mind.
                                </p>

                                <div className="ms2-ls-btn text-center mt-2">

                                    <button className="ms2-lr-btn w-50" type="submit">
                                        Learn More
                                    </button>

                                </div>

                            </div>

                            <div className="col-6 ms2-right-side">

                                <div className="ms2-img">

                                    <img className="ms2-img-2"
                                         src={IMG2}
                                         alt="Eating Healthy and Fresh "
                                         width="100%"
                                         height="100%"
                                    />

                                </div>

                            </div>

                        </div>

                    </div>


                </div>

                <div className="container py-3">
                </div>

            </div>


        </div>
    )

};

export default Main;