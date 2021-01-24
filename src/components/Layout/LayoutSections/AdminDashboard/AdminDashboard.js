import React, {Component} from "react";

import "./AdminDashboard.css";
import CreateRecipe from "./AdminDashboardComponents/CreateRecipe";
import Dashboard from "./AdminDashboardComponents/Dashboard";
import CreateMenu from "./AdminDashboardComponents/CreateMenu";
import SendEmail from "./AdminDashboardComponents/SendEmail";

class AdminDashboard extends Component {

    state = {
        routeComponent: "Dashboard"
    }

    componentDidMount() {
        this.setState({
            routeComponent: this.props.routeComponent
        })
        window.scrollTo(0, 0);

    }

    onSubmitRoute = (event) => {

        let route;
        if (event.target.value) {
            route = event.target.value;
        } else {
            route = event.target.innerHTML.toString();
        }

        if (route === "Create Recipe") {
            this.setState({
                routeComponent: route
            })
            window.history.pushState({}, null, "http://localhost:3000/admin/dashboard/create-recipe");
        } else if (route === "Create Menu") {
            this.setState({
                routeComponent: route
            })
            window.history.pushState({}, null, "http://localhost:3000/admin/dashboard/create-menu");

        } else if (route === "Send Email") {
            this.setState({
                routeComponent: route
            })
            window.history.pushState({}, null, "http://localhost:3000/admin/dashboard/create-email");

        } else if (route === "<< Go Back to Dashboard") {
            route = "Dashboard";
            this.setState({
                routeComponent: route
            })
            window.history.pushState({}, null, "http://localhost:3000/admin/dashboard");

        }

    }

    render() {

        let routeComponent;

        if (this.state.routeComponent === "Create Recipe") {
            routeComponent = <CreateRecipe route={this.state.routeComponent}
                                           onSubmitRoute={this.onSubmitRoute}
            />
        } else if (this.state.routeComponent === "Create Menu") {
            routeComponent = <CreateMenu route={this.state.routeComponent} onSubmitRoute={this.onSubmitRoute}/>

        } else if (this.state.routeComponent === "Send Email") {
            routeComponent = <SendEmail route={this.state.routeComponent} onSubmitRoute={this.onSubmitRoute}/>

        } else {
            routeComponent = <Dashboard route={this.state.routeComponent} onSubmitRoute={this.onSubmitRoute}/>
        }

        return (

            <div className="admin-dashboard-wrapper py-5">

                <div className="container d-flex flex-column">
                    <h1 className="text-center border-bottom border-success">Admin Dashboard</h1>
                </div>

                <div className="px-5 pt-4 pb-3">
                    {routeComponent}
                </div>

            </div>

        )

    }
}

export default AdminDashboard;