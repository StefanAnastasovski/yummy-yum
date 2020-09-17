import React from "react";

import './Home.css';

import Section1 from "./Sections/Section1";
import Section6 from "./Sections/Section6";
import Section2 from "./Sections/Section2";
import Section3 from "./Sections/Section3";
import Section4 from "./Sections/Section4";
import Section5 from "./Sections/Section5";

const Home = () => {

    return (

            <div className="yy-main-wrapper">

                {/*Home Section 1*/}
                <Section1/>

                {/*Home Section 2*/}
                <Section2/>

                {/*Home Section 3*/}
                <Section3/>

                {/*Home Section 4*/}
                <Section4/>

                {/*Home Section 5*/}
                <Section5/>

                {/*Home Section 6*/}
                <Section6/>

            </div>

    )

};

export default Home;