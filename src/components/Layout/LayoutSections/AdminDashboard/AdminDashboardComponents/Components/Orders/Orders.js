import React, {Component} from "react";

import './Orders.css';

import OrderInfoCalls from "../../../../../../../repository/get/getOrderInfo";
import OrdersInfo from "./OrdersInfo";

class Orders extends Component {


    state = {
        allOrderInfoByDate: [],
        pagination: [],
        showPages: [],
        orderInfoByPage: [],
        pageSelected: 0,
        numberOfItemsPerPage: 2,
        allowedNumberOfPages: 5,
        filterFromDate: "",
        filterToDate: ""
    }

    async componentDidMount() {
        console.log("componentDidMount")
        if (this.state.filterFromDate === "" || this.state.filterToDate === "")
            await this.setDateFilter();
        await this.gerOrderInfo();
    }

    createRange = (start, end, step = 1) => {
        const len = Math.floor((end - start) / step) + 1
        return Array(len).fill().map((_, idx) => start + (idx * step))
    }

    gerOrderInfo = async () => {
        console.log(this.state.filterFromDate)
        console.log(this.state.filterToDate)

        try {
            await OrderInfoCalls.fetchOrderInfoBetweenStartAndEndDates(this.state.filterFromDate, this.state.filterToDate).then(response => {
                console.log(response.data)
                this.setState({
                    allOrderInfoByDate: response.data,
                })
            }).catch(e => {
                console.log(e);
            })
        } catch (e) {
            console.log(e);
        }

        await this.pagination();

    }

    getPages = () => {
        return Math.ceil(this.state.allOrderInfoByDate.length / this.state.numberOfItemsPerPage);
    }

    pagination = async () => {
        let pages = this.getPages();
        if (pages === 0) {
            this.setState({
                showPages: [1],
                pagination: [1]
            })
        } else {
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
            }
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
        if (!(this.state.pagination.length === 1)) {

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


        //condition
        // console.log((this.state.showPages[0] === "<") && this.state.showPages[1] === parseInt(event.target.innerHTML))
    }

    setDateFilter = () => {
        let date = new Date();
        let month = (date.getMonth() + 1);
        let day = date.getDate();
        if (month < 10) {
            month = "0" + month.toString();
        }
        if (day < 10) {
            day = "0" + day.toString();
        }
        this.setState({
            filterFromDate: `${date.getFullYear()}-${month}-${day}`,
            filterToDate: `${date.getFullYear()}-${month}-${day}`
        })
    }

    onChangeToDateHandler = async (event) => {
        console.log(this.state.filterToDate)
        console.log(this.state.filterFromDate)
        this.setState({
            filterToDate: event.target.value,
        })

    }

    onChangeFromDateHandler = async (event) => {
        console.log(this.state.filterToDate)
        console.log(this.state.filterFromDate)
        this.setState({
            filterFromDate: event.target.value,
        })
    }

    onChangeNumberOfItemsPerPage = (event) => {
        console.log(event.target)
        console.log(event.target.value)
        this.setState({
            numberOfItemsPerPage: event.target.value
        })
    }

    handleSubmit = async (event) => {
        console.log("handleSubmit")
        await this.gerOrderInfo();
        console.log(this.state)
    }


    render() {

        return (

            <div className="create-menu-wrapper py-5">

                <div className="button-go-back-to-dashboard">
                    <input type="button" className="btn-go-back-to-dashboard"
                           value="<< Go Back to Dashboard" onClick={this.props.onSubmitRoute}/>
                </div>

                <h2 className="text-center">Orders</h2>

                <div className="order-filters">
                    <div className="d-flex flex pt-2">
                        <div className="col d-flex flex-row">
                            <div className="col d-flex align-items-baseline">
                                <label>From:</label>
                                <input type="date"
                                       value={this.state.filterFromDate}
                                       className="w-75 px-1 ml-3 coupon-percentage-discount-field"
                                       onChange={this.onChangeFromDateHandler}
                                       onClick={this.onChangeFromDateHandler}
                                />
                            </div>
                            <div className="col d-flex align-items-baseline">
                                <label>To:</label>
                                <input type="date"
                                       value={this.state.filterToDate}
                                       className="w-75 px-1 ml-3 coupon-percentage-discount-field"
                                       onChange={this.onChangeToDateHandler}
                                       onClick={this.onChangeToDateHandler}
                                />
                            </div>
                        </div>
                        <div className="col  d-flex flex-row">
                            <div className="col-3 d-flex align-items-baseline">
                                <select className="select-order-info font-weight-bold"
                                        onChange={this.onChangeNumberOfItemsPerPage}
                                        value={this.state.numberOfItemsPerPage}>

                                    <option className="font-weight-bold" value="5">5</option>
                                    <option className="font-weight-bold" value="10">10</option>
                                    <option className="font-weight-bold" value="25">25</option>
                                    <option className="font-weight-bold" value="50">50</option>
                                    <option className="font-weight-bold" value="100">100</option>

                                </select>
                            </div>
                            <div className="col-8 d-flex align-items-baseline">
                                <button type="button"
                                        className="btn-order-info-apply"
                                        onClick={this.handleSubmit}
                                >Apply
                                </button>
                            </div>
                        </div>

                    </div>

                </div>

                <div className="orders row pb-3 ">

                    <div className="orders-title d-flex mt-5">
                        <div className="col order-col">
                            <p className="py-2">Full Name</p>
                        </div>
                        <div className="col order-col">
                            <p className="py-2">Username</p>
                        </div>
                        <div className="col order-col">
                            <p className="py-2">Meal Qty</p>
                        </div>
                        <div className="col order-col">
                            <p className="py-2">Servings Qty</p>
                        </div>
                        <div className="col order-col">
                            <p className="py-2">Subtotal($)</p>
                        </div>
                        <div className="col order-col">
                            <p className="py-2">Shipping($)</p>
                        </div>
                        <div className="col order-col">
                            <p className="py-2">Total($)</p>
                        </div>
                        <div className="col order-col">
                            <p className="py-2">Order Date</p>
                        </div>
                        <div className="col order-col">
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
                                            fullName={item.firstName + " " + item.lastName}
                                            username={item.username}
                                            mealQty={item.mealNumber}
                                            servingsQty={item.servingNumber}
                                            subtotal={item.subtotal}
                                            shipping={item.shippingCost}
                                            total={item.total}
                                            orderDate={item.orderInfo.orderDate.split("T")[0]}
                                            keyEl={"order-id-" + index}
                                            orderId={item.orderInfo.orderId}
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