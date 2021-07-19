import React from "react";

import IMG1 from '../../../../../../images/HomeComponent/ms1-images/ms1-img-1.jpg'

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

                    {/*<h2>*/}

                    {/*    Make Your Cooking*/}
                    {/*    <span className="d-block">*/}
                    {/*                Easier and Faster*/}
                    {/*            </span>*/}
                    {/*    With Our Services*/}


                    {/*</h2>*/}

                    <h2>

                        Hassle-Free
                        <span className="d-block">
                                   Home Cooked Meals
                        </span>

                    </h2>

                    <div className="my-4">
                        <a href="/weekly-menu" className="ms1-pym-btn pick-your-meal px-5 py-3 text-decoration-none ">
                            Pick Your Meal
                        </a>
                    </div>

                </div>

            </div>

        </div>

    )

};

export default Section1;