import React, {Component} from "react";

import './ManageCoupon.css'

import postCoupon from "../../../../../../../repository/post/postCoupon";
import getCoupon from "../../../../../../../repository/get/getCoupon";
import CouponInfo from "./CouponInfo";

class ManageCoupon extends Component {

    state = {
        couponName: "",
        oldName: "",
        percentageDiscount: null,
        fixedAmountDiscount: null,
        isActive: true,
        activationDate: "",
        deactivationDate: "",
        isCouponActive: true,
        shouldPercentageDiscountBeDisabled: false,
        shouldFixedAmountDiscountBeDisabled: false,
        datesError: "",
        couponNameError: "",
        isCreated: false,
        isCreatedMessage: "The Coupon Was Successfully Updated!",
        allCoupons: [],
        isEdit: false,
        rerenderComp: false

    }

    isCreatedFalse = async (event) => {
        if (this.state.isCreated) {
            this.setState({
                isCreated: false
            })
        }
        if (event.target.name === "back-to-coupons") {
            await this.getAllCoupons();
        }
    }

    async componentDidMount() {
        await this.getAllCoupons();
    }

    getAllCoupons = async () => {
        await getCoupon.fetchCoupons().then((response) => {
            this.setState({
                allCoupons: response.data
            });
        });
    }

    onChangeCouponNameHandler = (event) => {
        this.isCreatedFalse(event);
        this.setState({
            couponName: event.target.value
        })
    }

    onChangePercentageDiscountHandler = (event) => {
        this.isCreatedFalse(event);

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
        this.isCreatedFalse(event);

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
        this.isCreatedFalse(event);

        this.setState({
            activationDate: event.target.value
        })
    }

    onChangeDeactivationDateHandler = (event) => {
        this.isCreatedFalse(event);

        this.setState({
            deactivationDate: event.target.value
        })
    }

    onChangeIsCouponActive = (event) => {
        this.isCreatedFalse(event);

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

    updateCoupon = async () => {
        let obj = {
            couponName: this.state.couponName,
            percentageDiscount: this.state.percentageDiscount,
            fixedAmountDiscount: this.state.fixedAmountDiscount,
            isActive: this.state.isActive,
            activationDate: this.state.activationDate,
            deactivationDate: this.state.deactivationDate,
        }

        await postCoupon.updateCoupon(obj, this.state.oldName).then(response => {
            this.setState({
                isCreated: true,
                isEdit: false
            })
        }).catch(error => {
            console.log(error)
        })
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

    editCoupon = (coupon, oldName) => {
        this.setState({
            isEdit: true
        })

        this.setState({
            couponName: "",
            oldName: "",
            percentageDiscount: null,
            fixedAmountDiscount: null,
            isActive: true,
            isCouponActive: true,
            activationDate: "",
            deactivationDate: ""
        })
        let percentageDiscount;
        let fixedDiscount;

        if (coupon.percentageDiscount === null || coupon.percentageDiscount === undefined) {
            this.setState({
                shouldPercentageDiscountBeDisabled: true
            })
            percentageDiscount = null;
            fixedDiscount = coupon.fixedAmountDiscount;
        } else if (coupon.fixedAmountDiscount === null || coupon.fixedAmountDiscount === undefined) {
            this.setState({
                shouldFixedAmountDiscountBeDisabled: true
            })
            percentageDiscount = coupon.percentageDiscount;
            fixedDiscount = null;
        }
        if (this.state.deactivationDate < this.state.activationDate) {
            this.setState({
                datesError: "End Date Must Be Greater Than Start Date!"
            })
        } else {
            this.setState({
                datesError: ""
            })
        }
        this.setState({
            couponName: coupon.couponName,
            oldName: oldName,
            percentageDiscount: percentageDiscount,
            fixedAmountDiscount: fixedDiscount,
            isActive: coupon.isActive,
            isCouponActive: coupon.isActive,
            activationDate: coupon.activationDate.split("T")[0],
            deactivationDate: coupon.deactivationDate.split("T")[0]
        })


    }

    handleSubmit = async (event) => {

        event.preventDefault();
        // let isDates = this.compareStartAndEndDates();
        let isCouponName = this.couponNameValidator();
        if (isCouponName)
            await this.updateCoupon();

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
                            <h3 className="text-center">Coupons</h3>

                            {
                                this.state.isEdit && <div className="row flex-column">

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
                                                                              value={this.state.couponName}
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

                                                <div className="col-8">
                                                    {
                                                        this.state.percentageDiscount === null ?
                                                            <input type="number"
                                                                   max="100"
                                                                   required
                                                                   value=""
                                                                   className="w-75 px-1 coupon-percentage-discount-field"
                                                                   placeholder="15"
                                                                   disabled={this.state.shouldPercentageDiscountBeDisabled}
                                                                   onChange={this.onChangePercentageDiscountHandler}
                                                            /> :
                                                            <input type="number"
                                                                   max="100"
                                                                   required
                                                                   value={this.state.percentageDiscount}
                                                                   className="w-75 px-1 coupon-percentage-discount-field"
                                                                   placeholder="15"
                                                                   disabled={this.state.shouldPercentageDiscountBeDisabled}
                                                                   onChange={this.onChangePercentageDiscountHandler}
                                                            />
                                                    }
                                                </div>

                                            </div>

                                            <div className="col d-flex flex-row pb-2">

                                                <div className="col-4">
                                                    <label>Discount $:</label>
                                                </div>

                                                <div className="col-8">
                                                    {this.state.fixedAmountDiscount === null ?
                                                        <input type="number"
                                                               required
                                                               value=""
                                                               className="w-75 px-1 coupon-fixed-discount-field"
                                                               placeholder="15.00"
                                                               disabled={this.state.shouldFixedAmountDiscountBeDisabled}
                                                               onChange={this.onChangeFixedAmountDiscountHandler}/> :
                                                        <input type="number"
                                                               required
                                                               value={this.state.fixedAmountDiscount}
                                                               className="w-75 px-1 coupon-fixed-discount-field"
                                                               placeholder="15.00"
                                                               disabled={this.state.shouldFixedAmountDiscountBeDisabled}
                                                               onChange={this.onChangeFixedAmountDiscountHandler}/>
                                                    }
                                                </div>

                                            </div>


                                        </div>

                                        <div className="col">

                                            <div className="col d-flex flex-row pb-2">

                                                <div className="col-4">
                                                    <label>Start Date:</label>
                                                </div>

                                                <div className="col-8"><input type="date"
                                                                              value={this.state.activationDate}
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
                                                           value={this.state.deactivationDate}
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
                                        <button className="w-25 btn-coupon" type="submit"
                                                name="update-coupon"
                                        >Update Coupon!
                                        </button>
                                    </div>

                                </div>
                            }

                            <div className="coupons d-flex mt-5">
                                <div className="col coupons-col">
                                    <p className="py-2">Coupon Name</p>
                                </div>
                                <div className="col coupons-col">
                                    <p className="py-2">Discount %</p>
                                </div>
                                <div className="col coupons-col">
                                    <p className="py-2">Discount $(fixed)</p>
                                </div>
                                <div className="col coupons-col">
                                    <p className="py-2">Start Date</p>
                                </div>
                                <div className="col coupons-col">
                                    <p className="py-2">End Date</p>
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
                                    this.state.allCoupons.reverse().map((item, index) => {
                                        return <li key={"coupon-id-" + index}><CouponInfo
                                            keyEl={"coupon-id-" + index}
                                            couponName={item.couponName}
                                            percentageDiscount={item.percentageDiscount}
                                            fixedAmountDiscount={item.fixedAmountDiscount}
                                            activationDate={item.activationDate}
                                            deactivationDate={item.deactivationDate}
                                            isActive={item.isActive}
                                            editCoupon={this.editCoupon.bind(this)}
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
                                        name="back-to-coupons">
                                    Back To Coupons
                                </button>
                            </div>
                        </div>
                    }

                </div>

            </div>

        )

    }

}

export default ManageCoupon;