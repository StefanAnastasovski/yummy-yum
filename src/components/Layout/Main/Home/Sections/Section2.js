import React from "react";

import CustomizeIcon from '../SYMIcons/CustomizeIcon'
import MenuChooseIcon from '../SYMIcons/MenuChooseIcon'
import DeliveryIcon from '../SYMIcons/DeliveryIcon'
import EnjoyIcon from '../SYMIcons/EnjoyIcon'

const Section2 = () => {

    return (

        <div className="main-section-2 py-5">

            <div className="container">

                <div className="ms2-simplify-your-meal pb-5">

                    <h2 className="text-uppercase text-center">Simplify Your Meal</h2>

                    <p className="text-center text-color-green font-size-1 w-75 container">
                        Fresh weekly meal kits customized to your
                        liking and starting at
                        $6.99 per serving.
                    </p>

                    <div className="ms2-sym-icons pt-5">

                        <div className="row">

                            <div className="col text-center">

                                <MenuChooseIcon className="ms2-sym-menuchooseicon"/>

                                <h5 className="pt-1">
                                    Select
                                </h5>

                                <p className="pt-1 font-size-2 px-2">
                                    Carb conscious, calorie conscious, vegetarian – we’ve got lots of options to
                                    fit your schedule and diet.
                                </p>

                            </div>

                            <div className="col text-center">

                                <CustomizeIcon className="ms2-sym-customizeicon"/>

                                <h5 className="pt-1">
                                    Customize It
                                </h5>

                                <p className="pt-1 font-size-2 px-2">
                                    Use our Customize It feature to upgrade, swap, or double up proteins on
                                    select meals.
                                </p>

                            </div>

                            <div className="col text-center">

                                <DeliveryIcon className="ms2-sym-deliveryicon"/>

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

                                <EnjoyIcon className="ms2-sym-enjoyicon"/>

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

    )

};

export default Section2;