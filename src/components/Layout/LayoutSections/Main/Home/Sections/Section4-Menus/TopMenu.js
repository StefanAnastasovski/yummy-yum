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

                        <TopMenuAllImages menuName={props.MenuInf.menuName} imgNumber = "1"
                                         shortenMenuNameLowercase = {props.MenuInf.shortenMenuNameLowercase}
                                          alt = {props.MenuInf.mealName1} />

                    </div>

                    <div className="card-text text-left">

                        <span className="text-center card-title py-2 m-0 text-color-green d-block font-size-1">
                            {props.MenuInf.mealName1}
                        </span>
                        {props.MenuInf.mealText1}

                    </div>

                </div>

            </div>

            {/*menu card #2*/}
            <div className="col card card-2 mx-1 py-1">

                <div className="card-body">

                    <div className="card-img-top">

                       <TopMenuAllImages menuName={props.MenuInf.menuName} imgNumber = "2"
                                         shortenMenuNameLowercase = {props.MenuInf.shortenMenuNameLowercase}
                                          alt = {props.MenuInf.mealName2} />

                    </div>

                    <div className="card-text text-left">

                        <span className="text-center card-title py-2 m-0 text-color-green d-block font-size-1">
                            {props.MenuInf.mealName2}
                        </span>
                        {props.MenuInf.mealText2}

                    </div>

                </div>

            </div>

            {/*menu card #3*/}
            <div className="col card card-3 mx-1 py-1">

                <div className="card-body">

                    <div className="card-img-top">

                      <TopMenuAllImages menuName={props.MenuInf.menuName} imgNumber = "3"
                                         shortenMenuNameLowercase = {props.MenuInf.shortenMenuNameLowercase}
                                          alt = {props.MenuInf.mealName3} />

                    </div>

                    <div className="card-text text-left">

                        <span className="text-center card-title py-2 m-0 text-color-green d-block font-size-1">
                            {props.MenuInf.mealName3}
                        </span>
                        {props.MenuInf.mealText3}

                    </div>

                </div>

            </div>

            {/*menu card #4*/}
            <div className="col card card-4 mx-1 py-1">

                <div className="card-body">

                    <div className="card-img-top">

                     <TopMenuAllImages menuName={props.MenuInf.menuName} imgNumber = "4"
                                         shortenMenuNameLowercase = {props.MenuInf.shortenMenuNameLowercase}
                                          alt = {props.MenuInf.mealName4} />

                    </div>

                    <div className="card-text text-left">

                        <span className="text-center card-title py-2 m-0 text-color-green d-block font-size-1">
                            {props.MenuInf.mealName4}
                        </span>
                        {props.MenuInf.mealText4}

                    </div>

                </div>

            </div>

        </Aux>

    )

};

export default TopMenu;
