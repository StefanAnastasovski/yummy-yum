import React from "react";

import './Main.css';

import Section1 from "./Sections/Section1";
import Section6 from "./Sections/Section6";
import Section2 from "./Sections/Section2";
import Section3 from "./Sections/Section3";
import Section4 from "./Sections/Section4";
import Section5 from "./Sections/Section5";

const Main = () => {

    return (

        <div>

            <div className="main-wrapper">

                {/*Main Section 1*/}
                <Section1/>

                {/*Main Section 3 - 2*/}
                <Section2/>

                {/*Main Section 4 - 3*/}
                <Section3/>

                {/*Main Section 5 - 4 -> class component*/}
                <Section4/>

                {/*Main Section 6 -5*/}
                <Section5/>

                {/*Main Section 2 - 6*/}
                <Section6/>

            </div>


        </div>
    )

};

export default Main;