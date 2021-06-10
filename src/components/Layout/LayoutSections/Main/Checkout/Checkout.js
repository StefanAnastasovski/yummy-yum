import React, {Component} from "react";

import './Checkout.css';

import getCouponCalls from '../../../../../repository/get/getCoupon';

class Checkout extends Component {

    state = {
        orderSummary: [],
        orderItems: [],
        loading: true,
        couponName: "",
        couponObj: {},
        isCouponSet: false,
        couponError: "",
        isOldTotalExist: false
    };


    async componentDidMount() {
        await this.populateBillInfo();
        await this.populateTotalCost();
    }

    getCoupon = async () => {
        await getCouponCalls.fetchCouponByCouponName(this.state.couponName).then((response) => {

            response.data ? this.setState({
                    couponObj: response.data
                })
                :
                this.setState({
                    couponError: "Coupon is not valid!"
                })

            response.data.isActive ? this.setState({
                    isCouponSet: true
                }) :
                this.setState({
                    couponError: "Coupon is not valid!"
                })
        }).catch(
            function (error) {
                console.log(error)
            }
        )
    }

    populateBillInfo = async () => {

        let orderSummary = JSON.parse(localStorage.getItem("orderSummary"));
        let itemList = [];

        orderSummary.items.forEach((item, index) => {
            itemList.push({
                mealName: ["Meal: ", item.mealName],
                deliveryDate: ["Delivery Date: ", item.deliveryDate],
                deliveryTime: ["Delivery Time: ", item.deliveryTime],
                servings: ["Servings:", item.servings]
            })
        })

        this.setState({
            orderSummary: orderSummary,
            orderItems: itemList,
            loading: false
        })

    }

    populateTotalCost = async () => {
        let orderSummary = JSON.parse(localStorage.getItem('orderSummary'));
        let checkoutPrice = JSON.parse(localStorage.getItem('checkoutPrice'));
        if (checkoutPrice === null || Object.keys(checkoutPrice).length < 2)
            localStorage.setItem('checkoutPrice', JSON.stringify({"total": orderSummary.total}));
        else {
            this.setState({
                isOldTotalExist: true,
                isCouponSet: true
            })
        }
    }

    onChangeCouponHandler = (event) => {
        this.setState({
            couponName: event.target.value
        })
    }

    onClickCouponHandler = async (event) => {
        await this.getCoupon();
        localStorage.setItem("coupon", JSON.stringify(this.state.couponObj))
        await this.couponHandler();
    }

    includeDiscount = (isPercentage, isFixedAmount, discountValue) => {
        let checkoutPrice = JSON.parse(localStorage.getItem('checkoutPrice'));
        checkoutPrice = {
            ...checkoutPrice,
            "oldTotal": checkoutPrice.total
        }
        if (isPercentage) {
            checkoutPrice.total = parseFloat((checkoutPrice.total - checkoutPrice.total * (discountValue / 100)).toFixed(2));
        } else if (isFixedAmount) {
            checkoutPrice.total = parseFloat((checkoutPrice.total - discountValue).toFixed(2));
        }

        localStorage.setItem('checkoutPrice', JSON.stringify(checkoutPrice));
        this.setState({
            isOldTotalExist: true
        })
    }

    couponHandler = () => {
        let isPercentage = false;
        let isFixedAmount = false;
        let discountValue = 0;
        if (this.state.couponObj.percentageDiscount !== null) {
            isPercentage = true;
            discountValue = this.state.couponObj.percentageDiscount;
        } else if (this.state.couponObj.fixedAmountDiscount !== null) {
            isFixedAmount = true;
            discountValue = this.state.couponObj.fixedAmountDiscount;
        }

        if (this.state.couponObj.isActive) {
            this.includeDiscount(isPercentage, isFixedAmount, discountValue,)
        }

    }

    onClickCouponCloseHandler = () => {
        this.setState({
            isOldTotalExist: false,
            isCouponSet: false
        })
        localStorage.setItem('checkoutPrice', JSON.stringify({"total": this.state.orderSummary.total}));
    }

    render() {

        return (

            <div className="checkout-wrapper">

                <div className="checkout-container container">

                    <div className="checkout">

                        <h3 className="text-center">Order Summary</h3>

                        <div className="row checkout-meals">

                            <div className="col">
                                <p>Meals Per Week</p>
                                <p className="text-color-green">{this.state.orderSummary.meals}</p>
                            </div>

                            <div className="col">
                                <p>Servings Per Meal</p>
                                <p className="text-color-green">{this.state.orderSummary.servings}</p>
                            </div>

                        </div>

                        <hr/>

                        <div className="row checkout-delivery-time">

                            <ul className="list-unstyled">

                                {!this.state.loading && this.state.orderItems.map((item, index) => {
                                    let mealBorder = "";

                                    if (this.state.orderItems.length > 1 && index < this.state.orderItems.length - 1) {
                                        mealBorder = "cdt-border"
                                    }

                                    return <li key={"co-info-" + index + 1} className={mealBorder}>

                                        <div className="col mt-2">
                                            <p>{item.mealName[0]} #{index + 1}</p>
                                            <p className="text-color-green">{item.mealName[1]}</p>
                                        </div>

                                        <div className="col">
                                            <p>{item.servings[0]}</p>
                                            <p className="text-color-green">{item.servings[1]}</p>
                                        </div>

                                        <div className="col">
                                            <p>{item.deliveryDate[0]}</p>
                                            <p className="text-color-green">{item.deliveryDate[1]}</p>
                                        </div>

                                        <div className="col mb-2">
                                            <p>{item.deliveryTime[0]}</p>
                                            <p className="text-color-green">{item.deliveryTime[1]}</p>
                                        </div>

                                    </li>
                                })}

                            </ul>


                        </div>

                        <hr/>

                        <div className="row checkout-bill">

                            {
                                !this.state.isCouponSet ? <div className="col py-1">
                                        <div className="col-8 pr-2 coupon-mf">
                                            <input type="text" className="w-100 pr-2 coupon-field" placeholder="Coupon"
                                                   onChange={this.onChangeCouponHandler}
                                            />
                                            {
                                                this.state.couponError.length > 0 &&
                                                <p className="text-danger font-size-2">{this.state.couponError}</p>
                                            }
                                        </div>
                                        <div className="col-4">
                                            <button type="button" className="w-100 btn-coupon"
                                                    onClick={this.onClickCouponHandler}>Apply
                                            </button>
                                        </div>
                                    </div> :
                                    <div className="coupon-mt">
                                        <p>{JSON.parse(localStorage.getItem('coupon')).couponName}</p>
                                        <button type="button" className="btn-coupon-mt-close"
                                                onClick={this.onClickCouponCloseHandler}
                                        >X
                                        </button>
                                    </div>

                            }

                            <div className="col">
                                <p>Subtotal</p>
                                <p className="text-color-green">${this.state.orderSummary.subtotal}</p>
                            </div>

                            <div className="col">
                                <p>Shipping</p>
                                <p className="text-color-green">${this.state.orderSummary.shipping}</p>
                            </div>

                            <div className="col mt-1">
                                <h4>Total</h4>
                                {
                                    !this.state.isOldTotalExist ? <p className="text-color-green font-size-1">
                                            ${this.state.orderSummary.total}
                                        </p> :
                                        <p className="text-color-green font-size-1">
                                            {/*old total*/}
                                            <del className="text-danger pr-2">${this.state.orderSummary.total}</del>
                                            ${JSON.parse(localStorage.getItem("checkoutPrice")).total}
                                        </p>
                                }
                            </div>

                        </div>

                        <div className="row checkout-payment">

                            <div className="col">
                                <a href="/cart/pay-now" className="btn-checkout-payment">
                                    Pay Now
                                </a>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        )

    }

}

export default Checkout;