import React, {Component} from "react";

import postSubscriptionPlan from "../../../../../../repository/post/postSubscriptionPlan";

class CreateSubscriptionPlan extends Component {

    state = {
        subscriptionPlan: "",
        numberOfWeeklyMeals: 1,
        servingsPerMeal: 1,
        weeklyDeliveryDay: 1,
        isActive: true,
        isSubscriptionPlanActive: true,
        subscriptionPlanError: "",
        isCreated: false,
        isCreatedMessage: "The Subscription Plan Was Successfully Created!"

    }

    isCratedFalse = () => {
        if (this.state.isCreated) {
            this.setState({
                isCreated: false
            })
        }
    }

    onChangeSubscriptionPlanHandler = (event) => {
        this.isCratedFalse();
        this.setState({
            subscriptionPlan: event.target.value
        })
    }

    onChangeNumberOfWeeklyMealsHandler = (event) => {
        this.isCratedFalse();

        this.setState({
            numberOfWeeklyMeals: parseInt(event.target.value)
        })

    }

    onChangeServingsPerMealHandler = (event) => {
        this.isCratedFalse();

        this.setState({
            servingsPerMeal: parseInt(event.target.value)
        })
    }

    onChangeWeeklyDeliveryDayHandler = (event) => {
        this.isCratedFalse();

        this.setState({
            weeklyDeliveryDay: parseInt(event.target.value)
        })
    }

    onChangeIsSubscriptionPlanActive = (event) => {
        this.isCratedFalse();

        if (event.target.value === "YES" && !this.state.isSubscriptionPlanActive) {
            if (!this.state.isSubscriptionPlanActive) {
                this.setState({
                    isSubscriptionPlanActive: true,
                    isActive: true
                })
            }
        } else if (event.target.value === "NO" && this.state.isSubscriptionPlanActive) {
            if (this.state.isSubscriptionPlanActive) {
                this.setState({
                    isSubscriptionPlanActive: false,
                    isActive: false
                })
            }
        }
    }

    createSubscriptionPlan = async () => {
        let obj = {
            name: this.state.subscriptionPlan,
            numberOfWeeklyMealsLimit: this.state.numberOfWeeklyMeals,
            servingsPerMealLimit: this.state.servingsPerMeal,
            weeklyDeliveryDayLimit: this.state.weeklyDeliveryDay,
            isActive: this.state.isActive,
        }

        await postSubscriptionPlan.createSubscriptionPlan(obj).then(response => {
            this.setState({
                isCreated: true
            })
        }).catch(error => {
            console.log(error)
        })
    }

    subscriptionPlanValidator = () => {
        if (this.state.subscriptionPlan.length <= 5) {
            this.setState({
                subscriptionPlanError: "Subscription Plan Must Have More Than 5 Characters!"
            })
            return false;
        } else {
            this.setState({
                subscriptionPlanError: ""
            })
            return true;
        }
    }

    handleSubmit = async (event) => {

        event.preventDefault();
        let isSubscriptionPlan = this.subscriptionPlanValidator();
        if (isSubscriptionPlan)
            await this.createSubscriptionPlan();

    }

    render() {

        return (

            <div className="create-coupon-wrapper py-5">

                <div className="button-go-back-to-dashboard">
                    <input type="button" className="btn-go-back-to-dashboard"
                           value="<< Go Back to Dashboard" onClick={this.props.onSubmitRoute}/>
                </div>

                <div className="cr-coupon py-3 ">

                    {!this.state.isCreated ? <form onSubmit={this.handleSubmit}>

                            <div className="row flex-column">

                                <h3 className="text-center pb-4">Create Subscription Plan</h3>

                                <div className="col d-flex">

                                    <div className="col">

                                        <div className="col d-flex flex-row pb-2">

                                            <div className="col-6">
                                                <label>Subscription Plan:</label>
                                            </div>

                                            <div className="col-8"><input type="text"
                                                                          required
                                                                          className="w-75 px-1"
                                                                          placeholder="Yummy Yum Plan"
                                                                          onChange={this.onChangeSubscriptionPlanHandler}/>
                                            </div>

                                        </div>

                                        <div className="col d-flex flex-row pb-2">

                                            <div className="col-6">
                                                <label>Number Of Weekly Meals:</label>
                                            </div>

                                            <div className="col-4"><input type="number"
                                                                          max="30"
                                                                          required
                                                                          className="w-75 px-1 subscription-plan-field"
                                                                          placeholder="2"
                                                                          onChange={this.onChangeNumberOfWeeklyMealsHandler}
                                            />
                                            </div>

                                        </div>

                                        <div className="col d-flex flex-row pb-2">

                                            <div className="col-6">
                                                <label>Servings Per Meal:</label>
                                            </div>

                                            <div className="col-4"><input type="number"
                                                                          required
                                                                          className="w-75 px-1 subscription-plan-field"
                                                                          placeholder="1"
                                                                          onChange={this.onChangeServingsPerMealHandler}/>
                                            </div>

                                        </div>

                                        <div className="col d-flex flex-row pb-2">

                                            <div className="col-6">
                                                <label>Weekly Delivery Day:</label>
                                            </div>

                                            <div className="col-4"><input type="number"
                                                                          required
                                                                          className="w-75 px-1 subscription-plan-field"
                                                                          placeholder="3"
                                                                          onChange={this.onChangeWeeklyDeliveryDayHandler}/>
                                            </div>

                                        </div>

                                        <div className="col d-flex flex-row pb-2">

                                            <div className="col-6">
                                                <label>Is Active:</label>
                                            </div>

                                            <div className="col-4">

                                                <div className="d-flex justify-content-between">

                                                    <div>
                                                        <input type="radio"
                                                               className="cursor-pointer"
                                                               value="YES"
                                                               checked={this.state.isSubscriptionPlanActive}
                                                               name="subscription-plan-is-active mr-1"
                                                               onChange={this.onChangeIsSubscriptionPlanActive}
                                                               onClick={this.onChangeIsSubscriptionPlanActive}
                                                        />
                                                        <label>YES</label>
                                                    </div>

                                                    <div>
                                                        <input type="radio"
                                                               className="cursor-pointer mr-1"
                                                               value="NO"
                                                               checked={!this.state.isSubscriptionPlanActive}
                                                               name="subscription-plan-is-inactive"
                                                               onChange={this.onChangeIsSubscriptionPlanActive}
                                                               onClick={this.onChangeIsSubscriptionPlanActive}
                                                        />
                                                        <label>NO</label>
                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                                {
                                    this.state.subscriptionPlanError.length > 5 &&
                                    <p className="text-danger font-size-2 text-center">{this.state.subscriptionPlanError}</p>
                                }

                                <div className="row d-flex justify-content-center pt-4">
                                    <button className="w-50 btn-create-subscription-plan" type="submit">Create Subscription Plan!</button>
                                </div>

                            </div>

                        </form> :
                        <div>
                            <p className="text-success font-size-1 text-center">
                                {this.state.isCreatedMessage}
                            </p>

                            <div className="row d-flex justify-content-center pt-4">
                                <button className="w-25 btn-create-subscription-plan" type="button"
                                        onClick={this.isCratedFalse}>
                                    Create New Subscription Plan
                                </button>
                            </div>
                        </div>
                    }

                </div>

            </div>

        )

    }

}

export default CreateSubscriptionPlan;