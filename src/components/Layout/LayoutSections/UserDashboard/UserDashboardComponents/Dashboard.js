import React from "react";
import UserPersonalInformation from "./Components/UserPersonalInformation";
import UserMenuOptions from "./Components/UserMenuOptions";

const Dashboard = (props) => {

    // let onChangeToDateHandler = (event) => {
    //     props.onChangeToDateHandler(event.target.value)
    // }
    // let onChangeFromDateHandler = (event) => {
    //     props.onChangeFromDateHandler(event.target.value)
    // }
    let userComponent = null;
    console.log(props)
    if (props.userComponent === "Personal Information") {
        userComponent = <UserPersonalInformation
            info={props.userComponentInfo}
        />
    } else if (props.userComponent === "Billing Information") {

    } else if (props.userComponent === "Shipping Information") {

    } else if (props.userComponent === "Subscription") {

    } else if (props.userComponent === "Order History") {

    }


    return (

        <div className="dashboard-wrapper px-5 pt-5">

            <div className="user-menu col-4">

                <UserMenuOptions
                    title={props.userComponent}
                    onClickChangeTitle={props.onClickChangeTitle}
                />

            </div>

            <div className="user-menu-body col-8">

                <div className="user-menu-body-title col-1">
                    <p>{props.userComponent}</p>
                </div>

                {userComponent}

            </div>

        </div>

    )

}

export default Dashboard;