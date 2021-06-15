import React, {Component} from "react";

import './Orders.css';

import OrderInfoCalls from "../../../../../../../repository/get/getOrderInfo";
import OrdersInfo from "./OrdersInfo";

class Orders extends Component {


    state = {
        orderInfoStartDate: "",
        allOrderInfoByDate: [],
        pagination: [],
        showPages: [],
        orderInfoByPage: [],
        pageSelected: 0,
        numberOfItemsPerPage: 2,
        allowedNumberOfPages: 2
    }

    async componentDidMount() {

        this.setCurrentDate();
        await this.gerOrderInfo()
        await this.pagination()

    }

    createRange = (start, end, step = 1) => {
        const len = Math.floor((end - start) / step) + 1
        return Array(len).fill().map((_, idx) => start + (idx * step))
    }

    setCurrentDate = () => {
        let currentDate = new Date();
        let month = (currentDate.getMonth() + 1);
        let day = (currentDate.getDate());
        if (month.toString().length < 2) {
            month = "0".concat(month.toString())
        }
        if (day.toString().length < 2) {
            day = "0".concat(day.toString())
        }
        currentDate = `${currentDate.getFullYear()}-${month}-${day}`;
        this.setState({
            orderInfoStartDate: currentDate
        })
    }

    gerOrderInfo = async () => {
        try {
            await OrderInfoCalls.fetchOrderInfoByOrderDate(this.state.orderInfoStartDate).then(response => {
                this.setState({
                    allOrderInfoByDate: response.data,
                })
            }).catch(e => {
                console.log(e);
            })
        } catch (e) {
            console.log(e);
        }
    }

    getPages = () => {
        return Math.ceil(this.state.allOrderInfoByDate.length / this.state.numberOfItemsPerPage);
    }

    pagination = async () => {
        let pages = this.getPages();

        this.setState({
            pagination: this.createRange(1, pages, 1)
        })

        if (this.state.pageSelected === 0) {
            if (pages > this.state.allowedNumberOfPages) {
                this.setState(prevState => ({
                    showPages: [...this.createRange(1, pages, 1).slice(0, this.state.allowedNumberOfPages), ">"],
                    orderInfoByPage: [...prevState.allOrderInfoByDate.slice(this.state.pageSelected, this.state.numberOfItemsPerPage)]
                }))
            } else if (pages < this.state.allowedNumberOfPages) {
                this.setState(prevState => ({
                    showPages: [...this.createRange(1, pages, 1).slice(0, pages)],
                    orderInfoByPage: [...prevState.allOrderInfoByDate.slice(this.state.pageSelected, this.state.numberOfItemsPerPage)]
                }))
            } else if (pages === this.state.allowedNumberOfPages) {
                this.setState(prevState => ({
                    showPages: [...this.createRange(1, pages, 1).slice(0, this.state.allowedNumberOfPages)],
                    orderInfoByPage: [...prevState.allOrderInfoByDate.slice(this.state.pageSelected, this.state.numberOfItemsPerPage)]
                }))
            }
        } else {

        }

    }

    setShowPages = (pageSelectedNumber) => {
        let pages = this.getPages();
        let pageStart = 0;
        let pageEnd = 2;
        let numberOfPages = this.state.allowedNumberOfPages;
        let showPages;
        if (pageSelectedNumber === (pages - 1)) {
            pageStart = pages - numberOfPages;
            pageEnd = pages;
            showPages = ["<", ...this.createRange(1, pages, 1)
                .slice(pageStart, pageEnd)];
        } else if (pageSelectedNumber + 2 >= pages) {
            pageStart = pageSelectedNumber;
            pageEnd = pages;
            showPages = ["<", ...this.createRange(1, pages, 1)
                .slice(pageStart, pageEnd)];
        } else if (pageSelectedNumber !== 0) {
            pageStart = pageSelectedNumber;
            pageEnd = pageSelectedNumber + 2
            showPages = ["<", ...this.createRange(1, pages, 1)
                .slice(pageStart, pageEnd), ">"];
        } else if (pageSelectedNumber === 0) {
            showPages = [...this.createRange(1, pages, 1)
                .slice(pageStart, pageEnd), ">"];
        }
        return showPages;

    }

    setPageRange = async (pageSelectedNumber) => {
        let showPages = this.setShowPages(pageSelectedNumber);
        this.setState(prevState => ({
            showPages: showPages,
            orderInfoByPage: [...prevState.allOrderInfoByDate
                .slice((pageSelectedNumber + 1) * this.state.numberOfItemsPerPage - this.state.numberOfItemsPerPage,
                    (pageSelectedNumber + 1) * this.state.numberOfItemsPerPage)]
        }))
    }

    onClickPagePerClick = async (event) => {

        if (event.target.innerHTML === "&gt;") {
            this.setState({
                pageSelected: (this.getPages() - 1)
            })
            await this.setPageRange(this.getPages() - 1);
        } else if (event.target.innerHTML === "&lt;") {
            this.setState({
                pageSelected: 0
            })
            await this.setPageRange(0);
        } else if (event.target.ariaLabel === "Previous" || event.target.innerHTML === "«") {
            if (this.state.pageSelected > 0) {
                await this.setPageRange(this.state.pageSelected - 1);
                this.setState(prevState => ({
                    pageSelected: (prevState.pageSelected - 1)
                }))
            }
        } else if (event.target.ariaLabel === "Next" || event.target.innerHTML === "»") {
            if (this.state.pageSelected < this.getPages() - 1) {
                await this.setPageRange(this.state.pageSelected + 1);
                this.setState(prevState => ({
                    pageSelected: (prevState.pageSelected + 1)
                }))
            }
        } else {
            this.setState({
                pageSelected: (event.target.innerHTML - 1)
            })
            await this.setPageRange(event.target.innerHTML - 1);
        }


    }

    handleSubmit = async (event) => {

        event.preventDefault();


    }


    render() {

        return (

            <div className="create-menu-wrapper py-5">

                <div className="button-go-back-to-dashboard">
                    <input type="button" className="btn-go-back-to-dashboard"
                           value="<< Go Back to Dashboard" onClick={this.props.onSubmitRoute}/>
                </div>

                <div className="orders row py-3 ">

                    <div className="orders-title d-flex mt-5">
                        <div className="col coupons-col">
                            <p className="py-2">Full Name</p>
                        </div>
                        <div className="col coupons-col">
                            <p className="py-2">Username</p>
                        </div>
                        <div className="col coupons-col">
                            <p className="py-2">Meal Qty</p>
                        </div>
                        <div className="col coupons-col">
                            <p className="py-2">Servings Qty</p>
                        </div>
                        <div className="col coupons-col">
                            <p className="py-2">Subtotal($)</p>
                        </div>
                        <div className="col coupons-col">
                            <p className="py-2">Shipping($)</p>
                        </div>
                        <div className="col coupons-col">
                            <p className="py-2">Total($)</p>
                        </div>
                        <div className="col coupons-col">
                            <p className="py-2">Action</p>
                        </div>
                    </div>

                    <div className="orders-info d-flex row">

                        <ul className="list-unstyled">

                            {
                                this.state.orderInfoByPage.map((item, index) => {
                                    return <li key={"order-id-" + index}>
                                        <OrdersInfo
                                            order={item}
                                            fullName={item.user.firstName + " " + item.user.lastName}
                                            username={item.user.username}
                                            mealQty={item.mealNumber}
                                            servingsQty={item.servingNumber}
                                            subtotal={item.subtotal}
                                            shipping={item.shippingCost}
                                            total={item.total}
                                            keyEl={"order-id-" + index}
                                        />
                                    </li>
                                })
                            }

                        </ul>

                    </div>

                    <div aria-label="Page navigation example" className="pt-5 w-100 d-flex justify-content-center">

                        <ul className="pagination">
                            <li className="page-item">
                                <span className="page-link cursor-pointer" aria-label="Previous"
                                      onClick={this.onClickPagePerClick}>
                                    <span aria-hidden="true">&laquo;</span>
                                    <span className="sr-only">Previous</span>
                                </span>
                            </li>
                            {
                                this.state.showPages.map((item, index) => {
                                    if (item === (parseInt(this.state.pageSelected) + 1)) {
                                        return <li className="page-item active" key={"page-item-id-" + index}
                                                   onClick={this.onClickPagePerClick}
                                        >
                                            <span className="page-link cursor-pointer">{item}</span>
                                        </li>
                                    } else {
                                        return <li className="page-item" key={"page-item-id-" + index}
                                                   onClick={this.onClickPagePerClick}
                                        >
                                            <span className="page-link cursor-pointer">{item}</span>
                                        </li>
                                    }


                                })
                            }
                            <li className="page-item">
                                <span className="page-link cursor-pointer" aria-label="Next"
                                      onClick={this.onClickPagePerClick}>
                                    <span aria-hidden="true">&raquo;</span>
                                    <span className="sr-only">Next</span>
                                </span>
                            </li>
                        </ul>

                    </div>

                </div>

            </div>

        )

    }

}

export default Orders;