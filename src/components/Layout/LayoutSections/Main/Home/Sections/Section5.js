import React from "react";

import Img1 from "../../../../../../images/HomeComponent/ms5-images/ms5-img1.jpg"
import Img2 from "../../../../../../images/HomeComponent/ms5-images/ms5-img2.jpg"
import Img3 from "../../../../../../images/HomeComponent/ms5-images/ms5-img3.jpg"

const Section5 = () => {

        return (

            <div className="main-section-5 pt-5 pb-5">

                <div className="container">

                    <div className="ms5-title">

                        <h1 className="text-center">
                            More Than a Meal Kit
                        </h1>

                        <h5 className="text-center text-color-green w-50 m-auto py-2">
                            Weekly recipe rotations for
                            all skill levels and dietary
                            preferences means there's
                            always something new and
                            exciting to cook.
                        </h5>

                    </div>

                    <div className="ms5-meal-kit pt-5">

                        <div className="ms5-mk-1 row py-4">

                            <div className="col d-flex flex-column justify-content-center">

                                <h2 className="text-uppercase">Make It Yours</h2>

                                <p className="text-color-green text-left w-75 pt-2 font-size-1">
                                    Make meals uniquely yours. Upgrade, double-up, add or swap protein on select meals.
                                    You’re in control of your dinstiny.

                                    <span className="d-block">

                                    ***dinstiny(n): a combination of dinner and destiny

                                </span>

                                </p>

                                <div className="ms5-mk-build-your-box-btn pt-3">
                                    <a href="/weekly-menu" className="ms5-mk-btn text-decoration-none my-2">
                                        Build Your Box
                                    </a>
                                </div>

                            </div>

                            <div className="col pl-5 ms5-img">

                                <img className="ms5-img1"
                                     src={Img1}
                                     alt=""
                                     width="100%"
                                     height="100%"
                                />

                            </div>

                        </div>

                        <div className="ms5-mk-2 row py-4">

                            <div className="col pr-5 ms5-img">

                                <img className="ms5-img2"
                                     src={Img2}
                                     alt=""
                                     width="100%"
                                     height="100%"
                                />

                            </div>

                            <div className="col d-flex flex-column justify-content-center">

                                <h2 className="text-uppercase">Change It Up</h2>

                                <p className="text-color-green text-left w-75 pt-2 font-size-1">
                                    Add meals. Edit servings. Or take a week off and fly to Tahiti. Plans and
                                    preferences
                                    change — we keep up
                                </p>

                                <div className="ms5-mk-plan-your-week-btn pt-3">
                                    <a href="/weekly-menu" className="ms5-mk-btn text-decoration-none my-2">
                                        Plan Your First Week
                                    </a>
                                </div>

                            </div>


                        </div>

                        <div className="ms5-mk-3 row py-4">

                            <div className="col d-flex flex-column justify-content-center">

                                <h2 className="text-uppercase">Get Dinner Done</h2>

                                <p className="text-color-green text-left w-75 pt-2 font-size-1">
                                    If your routine isn’t quite “routine,” worry not. From 5-minute meals to 30+ minute
                                    masterpieces with options for veggie, low-carb or cal-conscious – you’ll find tons
                                    of
                                    meals that fit your changing schedule and tastes.
                                </p>

                                <div className="ms5-mk-dig-in-btn pt-3">
                                    <a href="/weekly-menu" className="ms5-mk-btn text-decoration-none my-2">
                                        Dig In
                                    </a>
                                </div>

                            </div>

                            <div className="col pl-5 ms5-img">

                                <img className="ms5-img3"
                                     src={Img3}
                                     alt=""
                                     width="100%"
                                     height="100%"
                                />

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        )

}

export default Section5;