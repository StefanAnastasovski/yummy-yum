import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import Aux from "../../../../hoc/Auxilliary";

import Home from "../../LayoutSections/Main/Home/Home";
import CustomizeMeal from "../../LayoutSections/Main/CustomizeMeal/CustomizeMeal";
import WeeklyMenu from "../../LayoutSections/Main/WeeklyMenu/WeeklyMenu";


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

                </Router>

            </Aux>

        )

    }

}

export default MainRouter;
