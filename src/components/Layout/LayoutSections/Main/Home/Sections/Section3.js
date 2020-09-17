import React from "react";

import SaveTimeIcon from './WHYYYIcons/SaveTimeIcon'
import SaveMoneyIcon from './WHYYYIcons/SaveMoneyIcon'
import EasyToCookIcon from './WHYYYIcons/EasyToCookIcon'

const Section3 = () => {

    return (

        <div className="main-section-3 py-5">

            <div className="container">

                <div className="ms3-why-yummyyum">

                    <h2 className="text-center"><span className="text-uppercase">Why</span> YummyYum</h2>

                    <div className="row ms3-wyy-reasons py-5">

                        <div className="col d-flex">

                            <div className="col-3 px-2">

                                <SaveTimeIcon className="save-time-icon w-100 h-100"/>

                            </div>

                            <div className="col-9">

                                <h5 className="text-color-green text-center">
                                    SAVE TIME
                                </h5>

                                <p className="pt-2">
                                    Skip the tedious trips to the grocery store
                                </p>

                            </div>

                        </div>

                        <div className="col d-flex">

                            <div className="col-3 px-2">

                                <SaveMoneyIcon className="save-money-icon w-100 h-100"/>

                            </div>

                            <div className="col-9">

                                <h5 className="text-color-green text-center">
                                    SAVE MONEY
                                </h5>

                                <p className="pt-2">
                                    Enjoy tasty dinners that won’t break the bank, at only $6.99 per serving
                                </p>

                            </div>

                        </div>

                        <div className="col d-flex">

                            <div className="col-3 px-2">

                                <EasyToCookIcon className="easy-to-cook-icon w-100 h-100"/>

                            </div>

                            <div className="col-9">

                                <h5 className="text-color-green text-center">
                                    EASY TO COOK
                                </h5>

                                <p className="pt-2">
                                    Our recipes have only 6 simple steps and will turn you into a chef
                                </p>

                            </div>

                        </div>


                    </div>


                </div>

            </div>

        </div>

    )

};

export default Section3;