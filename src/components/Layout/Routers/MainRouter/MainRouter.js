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
import ForgotPassword from "../../LayoutSections/Main/Login/ForgotPassword/ForgotPassword";
import MealRecipe from "../../LayoutSections/Main/WeeklyMenu/MealRecipe/MealRecipe";
import AdminDashboard from "../../LayoutSections/AdminDashboard/AdminDashboard";
import AccountCreated from "../../LayoutSections/Main/SignUp/AccountCreated/AccountCreated";
import HowItWorks from "../../LayoutSections/Main/HowItWorks/HowItWorks";
import Cart from "../../LayoutSections/Main/Cart/Cart";
import Checkout from "../../LayoutSections/Main/Checkout/Checkout";
import Payment from "../../LayoutSections/Main/Checkout/Payment/Payment";
import PaymentSuccessful from "../../LayoutSections/Main/Checkout/Payment/PaymentSuccessful/PaymentSuccessful";
import OrderDetails from "../../LayoutSections/AdminDashboard/AdminDashboardComponents/Components/Orders/OrderDetails";
import UserDashboard from "../../LayoutSections/UserDashboard/UserDashboard";

class MainRouter extends Component {

    // state = {};

    // method = () => {
    //
    // };

    redirectToHome = () => {
        return <Redirect to="/"/>
    }

    render() {


        return (

            <Aux>

                <Router>

                    {
                        this.props.isRedirectedToHome ? this.redirectToHome() : null
                    }

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

                        <Route exact path="/weekly-menu">

                            <WeeklyMenu
                                menu={this.props.menu}
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

                            <ForgotPassword
                                handlePassword={this.props.handlePassword}
                            />

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

                    {/*Admin Dashboard*/}
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

                    <Switch>

                        <Route exact path="/dashboard/admin/create-coupon">

                            <AdminDashboard routeComponent="Create Coupon"/>

                        </Route>

                    </Switch>

                    <Switch>

                        <Route exact path="/dashboard/admin/create-subscription-plan">

                            <AdminDashboard routeComponent="Create Subscription Plan"/>

                        </Route>

                    </Switch>

                    <Switch>

                        <Route exact path="/dashboard/admin/manage-coupon">

                            <AdminDashboard routeComponent="Manage Coupon"/>

                        </Route>

                    </Switch>

                    <Switch>

                        <Route exact path="/dashboard/admin/manage-subscription-plan">

                            <AdminDashboard routeComponent="Manage Subscription Plan"/>

                        </Route>

                    </Switch>

                    <Switch>

                        <Route exact path="/dashboard/admin/orders">

                            <AdminDashboard routeComponent="Orders"/>

                        </Route>

                    </Switch>

                    <Route exact path='/dashboard/admin/orders/order-details/order-id=:orderId'>

                        <OrderDetails/>

                    </Route>

                    <Switch>

                        <Route exact path="/dashboard/user">

                            <UserDashboard routeComponent="Dashboard"/>

                        </Route>

                    </Switch>

                    <Switch>

                        <Route exact path="/dashboard/user/personal-information">

                            <UserDashboard routeComponent="Personal Information"/>

                        </Route>

                    </Switch>

                    <Switch>

                        <Route exact path="/dashboard/user/billing-information">

                            <UserDashboard routeComponent="Billing Information"/>

                        </Route>

                    </Switch>

                    <Switch>

                        <Route exact path="/dashboard/user/shipping-information">

                            <UserDashboard routeComponent="Shipping Information"/>

                        </Route>

                    </Switch>

                    <Switch>

                        <Route exact path="/dashboard/user/subscription">

                            <UserDashboard routeComponent="Subscription"/>

                        </Route>

                    </Switch>

                    <Switch>

                        <Route exact path="/dashboard/user/order-history">

                            <UserDashboard routeComponent="Order History"/>

                        </Route>

                    </Switch>

                    <Switch>

                        <Route exact path="/dashboard/user/subscription/cart/pay-now">

                            <UserDashboard routeComponent="Payment"/>

                        </Route>

                    </Switch>

                    <Switch>

                        <Route exact path="/dashboard/user/subscription/cart/payment-successful">

                            <PaymentSuccessful isSubscription={true}/>

                        </Route>

                    </Switch>

                    <Switch>

                        <Route exact path="/cart">

                            <Cart/>

                        </Route>

                    </Switch>

                    <Switch>

                        <Route exact path="/cart/checkout">

                            <Checkout/>

                        </Route>

                    </Switch>

                    <Switch>

                        <Route exact path="/cart/pay-now">

                            <Payment/>

                        </Route>

                    </Switch>

                    <Switch>

                        <Route exact path="/cart/payment-successful">

                            <PaymentSuccessful/>

                        </Route>

                    </Switch>

                    <Switch>

                        <Route exact path="/cart/schedule">

                            <PaymentSuccessful isSubscription={true}/>

                        </Route>

                    </Switch>

                </Router>

            </Aux>

        )

    }

}

export default MainRouter;
