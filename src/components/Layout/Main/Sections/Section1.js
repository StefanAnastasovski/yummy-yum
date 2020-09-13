import React from "react";

import IMG1 from '../../../../images/MainSection/ms1-images/ms1-img-1.jpg'

const Section1 = () => {

    return (

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

                    <h2>

                        Make Your Cooking
                        <span className="d-block">
                                    Easier and Faster
                                </span>
                        With Our Services


                    </h2>

                    <button type="submit" className="d-btn pick-your-meal">
                        Pick Your Meal
                    </button>

                </div>

            </div>

        </div>

    )

};

export default Section1;