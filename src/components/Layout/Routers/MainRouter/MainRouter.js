import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Aux from "../../../../hoc/Auxilliary";

import Home from "../../LayoutSections/Main/Home/Home";
import CustomizeMeal from "../../LayoutSections/Main/CustomizeMeal/CustomizeMeal";
import WeeklyMenu from "../../LayoutSections/Main/WeeklyMenu/WeeklyMenu";
import SignUp from "../../LayoutSections/Main/SignUp/SignUp";
import Login from "../../LayoutSections/Main/Login/Login";
import Terms from "../../LayoutSections/Main/Terms/Terms";
import PrivacyPolicy from "../../LayoutSections/Main/PrivacyPolicy/PrivacyPolicy";
import WhyYummyYum from "../../LayoutSections/Main/WhyYummYum/WhyYummyYum";
import ForgotPassword from "../../LayoutSections/Main/Login/ForgotPassword/ForgotPassword";
import MealRecipe from "../../LayoutSections/Main/WeeklyMenu/MealRecipe/MealRecipe";
import AdminDashboard from "../../LayoutSections/AdminDashboard/AdminDashboard";

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

                        <Route exact path="/why-yummyyum">

                            <WhyYummyYum/>

                        </Route>

                    </Switch>

                    <Switch>

                        <Route exact path="/weekly-menu">

                            <WeeklyMenu/>

                        </Route>

                        <Route exact path='/meals/:mealName'>

                            <MealRecipe/>

                        </Route>

                        <Route exact path='/meals'>

                            <MealRecipe/>

                        </Route>

                    </Switch>

                    <Switch>

                        <Route exact path="/log-in">

                            <Login/>

                        </Route>

                    </Switch>

                    <Switch>

                        <Route exact path="/forgot-password">

                            <ForgotPassword/>

                        </Route>

                    </Switch>

                    <Switch>

                        <Route exact path="/join-now">

                            <SignUp/>

                        </Route>

                    </Switch>

                    <Switch>

                        <Route exact path="/terms">

                            <Terms/>

                        </Route>

                        <Route exact path="/privacy-policy">

                            <PrivacyPolicy/>

                        </Route>

                    </Switch>

                    <Switch>

                        <Route exact path="/admin/dashboard">

                            <AdminDashboard routeComponent="Dashboard"/>

                        </Route>

                    </Switch>

                    <Switch>

                        <Route exact path="/admin/dashboard/create-recipe">

                            <AdminDashboard routeComponent="Create Recipe"/>

                        </Route>

                    </Switch>

                    <Switch>

                        <Route exact path="/admin/dashboard/create-menu">

                            <AdminDashboard routeComponent="Create Menu"/>

                        </Route>

                    </Switch>

                    <Switch>

                        <Route exact path="/admin/dashboard/send-email">

                            <AdminDashboard routeComponent="Send Email"/>

                        </Route>

                    </Switch>

                </Router>

            </Aux>

        )

    }

}

export default MainRouter;
