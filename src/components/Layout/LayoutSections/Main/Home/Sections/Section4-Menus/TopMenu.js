import React from "react";

import TopMenuAllImages from "./TopMenuAllImages";

import Aux from "../../../../../../../hoc/Auxilliary";

const TopMenu = (props) => {

    return (

        <Aux>

            {/*menu card #1*/}
            <div className="col card card-1 mx-1 py-1">

                <div className="card-body">

                    <div className="card-img-top">

                        <TopMenuAllImages menuName={props.menuInfo.menuName} imgNumber="1"
                                          shortenMenuNameLowercase={props.menuInfo.shortenMenuNameLowercase}
                                          alt={props.menuInfo.mealName1}/>

                    </div>

                    <div className="card-text text-left">

                        <span className="text-center card-title py-2 m-0 text-color-green d-block font-size-1">
                            {props.menuInfo.mealName1}
                        </span>
                        {props.menuInfo.mealText1}

                    </div>

                </div>

            </div>

            {/*menu card #2*/}
            <div className="col card card-2 mx-1 py-1">

                <div className="card-body">

                    <div className="card-img-top">

                        <TopMenuAllImages menuName={props.menuInfo.menuName} imgNumber="2"
                                          shortenMenuNameLowercase={props.menuInfo.shortenMenuNameLowercase}
                                          alt={props.menuInfo.mealName2}/>

                    </div>

                    <div className="card-text text-left">

                        <span className="text-center card-title py-2 m-0 text-color-green d-block font-size-1">
                            {props.menuInfo.mealName2}
                        </span>
                        {props.menuInfo.mealText2}

                    </div>

                </div>

            </div>

            {/*menu card #3*/}
            <div className="col card card-3 mx-1 py-1">

                <div className="card-body">

                    <div className="card-img-top">

                        <TopMenuAllImages menuName={props.menuInfo.menuName} imgNumber="3"
                                          shortenMenuNameLowercase={props.menuInfo.shortenMenuNameLowercase}
                                          alt={props.menuInfo.mealName3}/>

                    </div>

                    <div className="card-text text-left">

                        <span className="text-center card-title py-2 m-0 text-color-green d-block font-size-1">
                            {props.menuInfo.mealName3}
                        </span>
                        {props.menuInfo.mealText3}

                    </div>

                </div>

            </div>

            {/*menu card #4*/}
            <div className="col card card-4 mx-1 py-1">

                <div className="card-body">

                    <div className="card-img-top">

                        <TopMenuAllImages menuName={props.menuInfo.menuName} imgNumber="4"
                                          shortenMenuNameLowercase={props.menuInfo.shortenMenuNameLowercase}
                                          alt={props.menuInfo.mealName4}/>

                    </div>

                    <div className="card-text text-left">

                        <span className="text-center card-title py-2 m-0 text-color-green d-block font-size-1">
                            {props.menuInfo.mealName4}
                        </span>
                        {props.menuInfo.mealText4}

                    </div>

                </div>

            </div>

        </Aux>
    )

};

export default TopMenu;

