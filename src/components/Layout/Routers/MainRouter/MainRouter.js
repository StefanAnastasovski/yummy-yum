import React, {Component} from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';

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
import AccountCreated from "../../LayoutSections/Main/SignUp/AccountCreated/AccountCreated";
import HowItWorks from "../../LayoutSections/Main/HowItWorks/HowItWorks";

class MainRouter extends Component {

    // state = {};

    // method = () => {
    //
    // };

    redirectToHome = () => {
        return <Redirect to="/" />
    }

    render() {


        return (

            <Aux>

                <Router>

                    {this.props.isRedirectedToHome ? this.redirectToHome() : null}

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

                        <Route exact path="/how-it-works">

                            <HowItWorks/>

                        </Route>

                    </Switch>

                    <Switch>

                        <Route exact path="/why-yummyyum">

                            <WhyYummyYum/>

                        </Route>

                    </Switch>

                    <Switch>

                        <Route exact path="/weekly-menu">

                            <WeeklyMenu
                            />

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

                            <Login logIn={this.props.logIn}
                                   isLoggedIn={this.props.isLoggedIn}
                                   handleLogin={this.props.handleLogin}
                                   addUsername={this.props.addUsername}
                            />

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

                        <Route exact path="/joined">

                            <AccountCreated/>

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

                        <Route exact path="/dashboard/admin">

                            <AdminDashboard routeComponent="Dashboard"/>

                        </Route>

                    </Switch>

                    <Switch>

                        <Route exact path="/dashboard/admin/create-recipe">

                            <AdminDashboard routeComponent="Create Recipe"/>

                        </Route>

                    </Switch>

                    <Switch>

                        <Route exact path="/dashboard/admin/create-menu">

                            <AdminDashboard routeComponent="Create Menu"/>

                        </Route>

                    </Switch>

                    <Switch>

                        <Route exact path="/dashboard/admin/send-email">

                            <AdminDashboard routeComponent="Send Email"/>

                        </Route>

                    </Switch>

                </Router>

            </Aux>

        )

    }

}

export default MainRouter;
