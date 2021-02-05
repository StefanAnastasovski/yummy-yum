import React from "react";

import IMG2 from '../../../../../../images/HomeComponent/ms6-images/ms6-img-1.jpg'

const Section6 = () => {

        return (

            <div className="main-section-6 py-5">

                <div className="container">

                    <div className="row">

                        <div className="col-6 ms6-left-side d-flex flex-column  justify-content-center">

                            <h3 className="text-center py-6 mb-2">
                                We believe eating healthy and fresh
                                should be easy for everyone.
                            </h3>
                            <p className="pr-5 text-color-green">
                                That’s why we do the work of making
                                food ready when you are with both
                                nutrition and taste in mind.
                            </p>

                            <div className="ms6-ls-btn text-center mt-4">

                                <a href="/why-yummyyum" className="ms6-lr-btn py-2 px-5 text-decoration-none ">
                                    Learn More
                                </a>

                            </div>

                        </div>

                        <div className="col-6 ms6-right-side">

                            <div className="ms6-img">

                                <img className="ms6-img-2"
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

        )

}

export default Section6;