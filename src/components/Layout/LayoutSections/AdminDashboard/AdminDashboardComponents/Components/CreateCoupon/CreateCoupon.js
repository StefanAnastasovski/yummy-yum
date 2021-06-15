import React, {Component} from "react";

import postCoupon from "../../../../../../../repository/post/postCoupon";
import {Redirect} from "react-router";

class CreateCoupon extends Component {

    state = {
        couponName: "",
        percentageDiscount: null,
        fixedAmountDiscount: null,
        isActive: true,
        activationDate: null,
        deactivationDate: null,
        isCouponActive: true,
        shouldPercentageDiscountBeDisabled: false,
        shouldFixedAmountDiscountBeDisabled: false,
        datesError: "",
        couponNameError: "",
        isCreated: false,
        isCreatedMessage: "The Coupon Was Successfully Created!",
        redirect: false

    }

    isCratedFalse = () => {
        if (this.state.isCreated) {
            this.setState({
                isCreated: false
            })
        }
    }

    redirectToManageCoupons = () => {
        this.setState({
            redirect: true
        })
    }

    onChangeCouponNameHandler = (event) => {
        this.isCratedFalse();
        this.setState({
            couponName: event.target.value
        })
    }

    onChangePercentageDiscountHandler = (event) => {
        this.isCratedFalse();

        this.setState({
            percentageDiscount: event.target.value
        })
        if (event.target.value.length > 0) {
            this.setState({
                shouldFixedAmountDiscountBeDisabled: true
            })
        } else if (event.target.value.length <= 0) {
            this.setState({
                shouldFixedAmountDiscountBeDisabled: false
            })
        }

    }

    onChangeFixedAmountDiscountHandler = (event) => {
        this.isCratedFalse();

        this.setState({
            fixedAmountDiscount: event.target.value
        })

        if (event.target.value.length > 0) {
            this.setState({
                shouldPercentageDiscountBeDisabled: true
            })
        } else if (event.target.value.length <= 0) {
            this.setState({
                shouldPercentageDiscountBeDisabled: false
            })
        }

    }

    onChangeActivationDateHandler = (event) => {
        this.isCratedFalse();

        this.setState({
            activationDate: event.target.value
        })
    }

    onChangeDeactivationDateHandler = (event) => {
        this.isCratedFalse();

        this.setState({
            deactivationDate: event.target.value
        })
    }

    onChangeIsCouponActive = (event) => {
        this.isCratedFalse();

        if (event.target.value === "YES" && !this.state.isCouponActive) {
            if (!this.state.isCouponActive) {
                this.setState({
                    isCouponActive: true,
                    isActive: true
                })
            }
        } else if (event.target.value === "NO" && this.state.isCouponActive) {
            if (this.state.isCouponActive) {
                this.setState({
                    isCouponActive: false,
                    isActive: false
                })
            }
        }
    }

    createCoupon = async () => {
        let obj = {
            couponName: this.state.couponName,
            percentageDiscount: this.state.percentageDiscount,
            fixedAmountDiscount: this.state.fixedAmountDiscount,
            isActive: this.state.isActive,
            activationDate: this.state.activationDate,
            deactivationDate: this.state.deactivationDate,
        }

        await postCoupon.createCoupon(obj).then(response => {
            this.setState({
                isCreated: true
            })
        }).catch(error => {
            console.log(error)
        })
    }

    compareStartAndEndDates = () => {
        if (this.state.deactivationDate < this.state.activationDate) {
            this.setState({
                datesError: "End Date Must Be Greater Than Start Date!"
            })
            return false;
        } else {
            this.setState({
                datesError: ""
            })
            return true;
        }
    }

    couponNameValidator = () => {
        if (this.state.couponName.length <= 2) {
            this.setState({
                couponNameError: "Coupon Name Must Have More Than 2 Characters!"
            })
            return false;
        } else {
            this.setState({
                couponNameError: ""
            })
            return true;
        }
    }

    handleSubmit = async (event) => {

        event.preventDefault();
        let isDates = this.compareStartAndEndDates();
        let isCouponName = this.couponNameValidator();
        if (isDates && isCouponName)
            await this.createCoupon();

    }

    render() {

        if (this.state.redirect)
            return <Redirect to="/dashboard/admin/manage-coupon"/>;

        return (

            <div className="create-coupon-wrapper py-5">

                <div className="button-go-back-to-dashboard">
                    <input type="button" className="btn-go-back-to-dashboard"
                           value="<< Go Back to Dashboard" onClick={this.props.onSubmitRoute}/>
                </div>

                <div className="cr-coupon py-3 ">

                    {!this.state.isCreated ? <form onSubmit={this.handleSubmit}>

                            <div className="row flex-column">

                                <h3 className="text-center">Create Coupon</h3>

                                <div className="col">
                                    <p className="text-danger">You Can Set Only One Of Discounts!</p>

                                    <p className="text-danger">Is Active Should Be "YES"!</p>
                                </div>

                                <div className="col d-flex">

                                    <div className="col">

                                        <div className="col d-flex flex-row pb-2">

                                            <div className="col-4">
                                                <label>Coupon Name:</label>
                                            </div>

                                            <div className="col-8"><input type="text"
                                                                          required
                                                                          className="w-75 px-1"
                                                                          placeholder="DISCOUNT15"
                                                                          onChange={this.onChangeCouponNameHandler}/>
                                            </div>

                                        </div>

                                        <div className="col d-flex flex-row pb-2">

                                            <div className="col-4">
                                                <label>Discount %:</label>
                                            </div>

                                            <div className="col-8"><input type="number"
                                                                          max="100"
                                                                          required
                                                                          className="w-75 px-1 coupon-percentage-discount-field"
                                                                          placeholder="15"
                                                                          disabled={this.state.shouldPercentageDiscountBeDisabled}
                                                                          onChange={this.onChangePercentageDiscountHandler}
                                            />
                                            </div>

                                        </div>

                                        <div className="col d-flex flex-row pb-2">

                                            <div className="col-4">
                                                <label>Discount $:</label>
                                            </div>

                                            <div className="col-8"><input type="number"
                                                                          required
                                                                          className="w-75 px-1 coupon-fixed-discount-field"
                                                                          placeholder="15.00"
                                                                          disabled={this.state.shouldFixedAmountDiscountBeDisabled}
                                                                          onChange={this.onChangeFixedAmountDiscountHandler}/>
                                            </div>

                                        </div>


                                    </div>

                                    <div className="col">

                                        <div className="col d-flex flex-row pb-2">

                                            <div className="col-4">
                                                <label>Start Date:</label>
                                            </div>

                                            <div className="col-8"><input type="date"
                                                                          required
                                                                          className="w-75 px-1"
                                                                          onChange={this.onChangeActivationDateHandler}/>
                                            </div>

                                        </div>

                                        <div className="col d-flex flex-row pb-2">

                                            <div className="col-4">
                                                <label>End Date:</label>
                                            </div>

                                            <div className="col-8">
                                                <input type="date"
                                                       required
                                                       className="w-75 px-1 coupon-percentage-discount-field"
                                                       onChange={this.onChangeDeactivationDateHandler}/>
                                            </div>

                                        </div>

                                        <div className="col d-flex flex-row pb-2">

                                            <div className="col-4">
                                                <label>Is Active:</label>
                                            </div>

                                            <div className="col-8">

                                                <div className="d-flex justify-content-around w-75">

                                                    <div>
                                                        <input type="radio"
                                                               className="cursor-pointer"
                                                               value="YES"
                                                               checked={this.state.isCouponActive}
                                                               name="coupon-is-active mr-1"
                                                               onChange={this.onChangeIsCouponActive}
                                                               onClick={this.onChangeIsCouponActive}
                                                        />
                                                        <label>YES</label>
                                                    </div>

                                                    <div>
                                                        <input type="radio"
                                                               className="cursor-pointer mr-1"
                                                               value="NO"
                                                               checked={!this.state.isCouponActive}
                                                               name="coupon-is-inactive"
                                                               onChange={this.onChangeIsCouponActive}
                                                               onClick={this.onChangeIsCouponActive}
                                                        />
                                                        <label>NO</label>
                                                    </div>

                                                </div>

                                            </div>

                                        </div>


                                    </div>

                                </div>

                                {
                                    this.state.couponNameError.length > 2 &&
                                    <p className="text-danger font-size-2 text-center">{this.state.couponNameError}</p>
                                }

                                {
                                    this.state.datesError.length > 0 &&
                                    <p className="text-danger font-size-2 text-center">
                                        {this.state.datesError}
                                    </p>
                                }


                                <div className="row d-flex justify-content-center pt-4">
                                    <button className="w-25 btn-coupon" type="submit">Create Coupon!</button>
                                </div>

                            </div>

                        </form> :
                        <div>
                            <p className="text-success font-size-1 text-center">
                                {this.state.isCreatedMessage}
                            </p>

                            <div className="row d-flex justify-content-center pt-4">
                                <button className="w-25 btn-coupon" type="button"
                                        onClick={this.isCratedFalse}>
                                    Create New Coupon
                                </button>
                            </div>
                            <div className="row d-flex justify-content-center pt-4">
                                <button className="w-25 btn-coupon" type="button"
                                        onClick={this.redirectToManageCoupons}>
                                    Manage Coupons
                                </button>
                            </div>
                        </div>
                    }

                </div>

            </div>

        )

    }

}

export default CreateCoupon;