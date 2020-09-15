import React, {Component} from "react";
import {Redirect} from 'react-router-dom';



import IMG1 from '../../../../../images/MainSection/ms1-images/ms1-img-1.jpg'

class Section1 extends Component {

    onSubmit = () => {
        // return <Redirect to="/123" />
    }

    render() {

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

                        <input type="submit" onClick={this.onSubmit} value="Pick Your Meal"
                               className="ms1-pym-btn pick-your-meal w-25"/>
                    </div>

                </div>

            </div>

        )

    }

};

export default Section1;