import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import Aux from "../../../../hoc/Auxilliary";

import Home from "../../LayoutSections/Main/Home/Home";
import CustomizeMeal from "../../LayoutSections/Main/CustomizeMeal/CustomizeMeal";
import WeeklyMenu from "../../LayoutSections/Main/WeeklyMenu/WeeklyMenu";
import SignUp from "../../LayoutSections/Main/SignUp/SignUp";
import Login from "../../LayoutSections/Main/Login/Login";


class MainRouter extends Component {

    // state = {};

    // method = () => {
    //
    // };

    render() {

        return (

            <Aux>

                <Router>

                    <Switch>

                        <Route exact path="/">

                            <Home/>

                        </Route>

                    </Switch>

                    <Switch>

                        <Route exact path="/choices">

                            <CustomizeMeal/>

                        </Route>

                    </Switch>

                    <Switch>

                        <Route exact path="/weekly-menu">

                            <WeeklyMenu/>

                        </Route>

                    </Switch>

                    <Switch>

                        <Route exact path="/login">

                            <Login/>

                        </Route>

                    </Switch>

                    <Switch>

                        <Route exact path="/sign-up">

                            <SignUp/>

                        </Route>

                    </Switch>

                </Router>

            </Aux>

        )

    }

}

export default MainRouter;
