import React, {Component} from "react";

// import './ManageSubscriptionPlan.css'

import postSubscriptionPlan from "../../../../../../../repository/post/postSubscriptionPlan";
import getSubscriptionPlan from "../../../../../../../repository/get/getSubscriptionPlan";
import SubscriptionPlanInfo from "./SubscriptionPlanInfo";

class ManageSubscriptionPlan extends Component {

    state = {
        subscriptionPlan: "",
        oldName: "",
        numberOfWeeklyMeals: 0,
        servingsPerMeal: 0,
        weeklyDeliveryDay: 0,
        isActive: true,
        isSubscriptionPlanActive: true,
        subscriptionPlanError: "",
        isCreated: false,
        isCreatedMessage: "The Subscription Plan Was Successfully Updated!",
        allSubscriptionPlans: []

    }

    isCreatedFalse = async (event) => {
        if (this.state.isCreated) {
            this.setState({
                isCreated: false
            })
        }
        if (event.target.name === "back-to-subscription-plan") {
            await this.getAllSubscriptionPlans();
        }
    }

    async componentDidMount() {
        await this.getAllSubscriptionPlans();
    }

    getAllSubscriptionPlans = async () => {
        await getSubscriptionPlan.fetchAllSubscriptionPlans().then((response) => {
            this.setState({
                allSubscriptionPlans: response.data
            });
        });
    }

    onChangeSubscriptionPlanNameHandler = (event) => {
        this.isCreatedFalse(event);
        this.setState({
            subscriptionPlan: event.target.value
        })
    }

    onChangeNumberOfWeeklyMealsHandler = (event) => {
        this.isCreatedFalse(event);

        this.setState({
            numberOfWeeklyMeals: parseInt(event.target.value)
        })

    }

    onChangeServingsPerMealHandler = (event) => {
        this.isCreatedFalse(event);

        this.setState({
            servingsPerMeal: parseInt(event.target.value)
        })
    }

    onChangeWeeklyDeliveryDayHandler = (event) => {
        this.isCreatedFalse(event);

        this.setState({
            weeklyDeliveryDay: parseInt(event.target.value)
        })
    }

    onChangeIsSubscriptionPlanActive = (event) => {
        this.isCreatedFalse(event);

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

    updateSubscriptionPlan = async () => {

        let obj = {
            name: this.state.subscriptionPlan,
            numberOfWeeklyMealsLimit: this.state.numberOfWeeklyMeals,
            servingsPerMealLimit: this.state.servingsPerMeal,
            weeklyDeliveryDayLimit: this.state.weeklyDeliveryDay,
            isActive: this.state.isActive
        }

        await postSubscriptionPlan.updateSubscriptionPlan(obj, this.state.oldName).then(response => {
            this.setState({
                isCreated: true,
                isEdit: false
            })
        }).catch(error => {
            console.log(error)
        })
    }

    editSubscriptionPlan = (subscriptionPlan, oldName) => {

        this.setState({
            isEdit: true
        })

        this.setState({
            subscriptionPlan: subscriptionPlan.subscriptionPlan,
            oldName: oldName,
            numberOfWeeklyMeals: subscriptionPlan.numberOfWeeklyMeals,
            servingsPerMeal: subscriptionPlan.servingsPerMeal,
            weeklyDeliveryDay: subscriptionPlan.weeklyDeliveryDay,
            isActive: subscriptionPlan.isActive
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
            await this.updateSubscriptionPlan();

    }

    render() {

        return (

            <div className="create-coupon-wrapper py-5">

                <div className="button-go-back-to-dashboard">
                    <input type="button" className="btn-go-back-to-dashboard"
                           value="<< Go Back to Dashboard" onClick={this.props.onSubmitRoute}
                           name="go-back-to-dashboard"
                    />
                </div>

                <div className="cr-coupon py-3 ">

                    {!this.state.isCreated ? <form onSubmit={this.handleSubmit}>
                            <h3 className="text-center pb-5">Subscription Plans</h3>

                            {
                                this.state.isEdit && <div className="row flex-column">

                                    <div className="col d-flex">
                                        <div className="col">

                                            <div className="col d-flex flex-row pb-2">

                                                <div className="col-6">
                                                    <label>Subscription Plan:</label>
                                                </div>

                                                <div className="col-4">
                                                    {
                                                        this.state.subscriptionPlan !== "" ?
                                                            <input type="text"
                                                                   required
                                                                   value={this.state.subscriptionPlan}
                                                                   className="w-75 px-1"
                                                                   placeholder="Yummy Yum Plan"
                                                                   onChange={this.onChangeSubscriptionPlanNameHandler}/> :
                                                            <input type="text"
                                                                   required
                                                                   value=""
                                                                   className="w-75 px-1"
                                                                   placeholder="Yummy Yum Plan"
                                                                   onChange={this.onChangeSubscriptionPlanNameHandler}/>
                                                    }
                                                </div>

                                            </div>

                                            <div className="col d-flex flex-row pb-2">

                                                <div className="col-6">
                                                    <label>Number Of Weekly Meals:</label>
                                                </div>

                                                <div className="col-4">
                                                    {
                                                        this.state.numberOfWeeklyMeals > 0 ?
                                                            <input type="number"
                                                                   max="30"
                                                                   required
                                                                   value={this.state.numberOfWeeklyMeals}
                                                                   className="w-75 px-1 subscription-plan-field"
                                                                   placeholder="2"
                                                                   onChange={this.onChangeNumberOfWeeklyMealsHandler}/> :
                                                            <input type="number"
                                                                   max="30"
                                                                   required
                                                                   value=""
                                                                   className="w-75 px-1 subscription-plan-field"
                                                                   placeholder="2"
                                                                   onChange={this.onChangeNumberOfWeeklyMealsHandler}/>
                                                    }

                                                </div>

                                            </div>

                                            <div className="col d-flex flex-row pb-2">

                                                <div className="col-6">
                                                    <label>Servings Per Meal:</label>
                                                </div>

                                                <div className="col-4">
                                                    {
                                                        this.state.servingsPerMeal > 0 ?

                                                            <input type="number"
                                                                   required
                                                                   value={this.state.servingsPerMeal}
                                                                   className="w-75 px-1 subscription-plan-field"
                                                                   placeholder="1"
                                                                   onChange={this.onChangeServingsPerMealHandler}/> :
                                                            <input type="number"
                                                                   required
                                                                   value=""
                                                                   className="w-75 px-1 subscription-plan-field"
                                                                   placeholder="1"
                                                                   onChange={this.onChangeServingsPerMealHandler}/>
                                                    }
                                                </div>

                                            </div>

                                            <div className="col d-flex flex-row pb-2">

                                                <div className="col-6">
                                                    <label>Weekly Delivery Day:</label>
                                                </div>

                                                <div className="col-4">
                                                    {
                                                        this.state.weeklyDeliveryDay ?
                                                            <input type="number"
                                                                   required
                                                                   value={this.state.weeklyDeliveryDay}
                                                                   className="w-75 px-1 subscription-plan-field"
                                                                   placeholder="3"
                                                                   onChange={this.onChangeWeeklyDeliveryDayHandler}/> :
                                                            <input type="number"
                                                                   required
                                                                   value=""
                                                                   className="w-75 px-1 subscription-plan-field"
                                                                   placeholder="3"
                                                                   onChange={this.onChangeWeeklyDeliveryDayHandler}/>

                                                    }
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

                                    <div className="row d-flex justify-content-center pt-4">
                                        <button className="w-50 btn-create-subscription-plan" type="submit">
                                            Update Subscription Plan!
                                        </button>
                                    </div>

                                </div>

                            }

                            <div className="coupons d-flex mt-5">
                                <div className="col coupons-col">
                                    <p className="py-2">Subscription Plan</p>
                                </div>
                                <div className="col coupons-col">
                                    <p className="py-2">Number Of Weekly Meals</p>
                                </div>
                                <div className="col coupons-col">
                                    <p className="py-2">Servings Per Meal</p>
                                </div>
                                <div className="col coupons-col">
                                    <p className="py-2">Weekly Delivery Day</p>
                                </div>
                                <div className="col coupons-col">
                                    <p className="py-2">Is Active</p>
                                </div>
                                <div className="col coupons-col">
                                    <p className="py-2">Action</p>
                                </div>
                            </div>

                            <ul className="list-unstyled">
                                {
                                    this.state.allSubscriptionPlans.reverse().map((item, index) => {
                                        return <li key={"subscription-plan-id-" + index}>
                                            <SubscriptionPlanInfo
                                                keyEl={"subscription-plan-id-" + index}
                                                subscriptionPlan={item.name}
                                                numberOfWeeklyMeals={item.numberOfWeeklyMealsLimit}
                                                servingsPerMeal={item.servingsPerMealLimit}
                                                weeklyDeliveryDay={item.weeklyDeliveryDayLimit}
                                                isActive={item.isActive}
                                                editSubscriptionPlan={this.editSubscriptionPlan.bind(this)}
                                            />
                                        </li>
                                    })
                                }
                            </ul>

                        </form> :

                        <div>
                            <p className="text-success font-size-1 text-center">
                                {this.state.isCreatedMessage}
                            </p>

                            <div className="row d-flex justify-content-center pt-4">
                                <button className="w-25 btn-coupon" type="button"
                                        onClick={this.isCreatedFalse}
                                        name="back-to-subscription-plan">
                                    Back To Subscription Plans
                                </button>
                            </div>
                        </div>
                    }

                </div>

            </div>

        )

    }

}

export default ManageSubscriptionPlan;