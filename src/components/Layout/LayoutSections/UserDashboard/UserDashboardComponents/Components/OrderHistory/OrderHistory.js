import React from "react";
import OrderHistoryCart from "./OrderHistoryComponents/OrderHistoryCart";

const OrderHistory = (props) => {

    console.log("=============Order History Props=============")
    console.log(props)

    return (

        <div className="user-menu-body-main col">

            <div className="container h-100 d-flex flex-column">

                <div className="row d-flex flex-column">

                    <div className="col pb-2 d-flex flex-column">
                        <div className="col d-flex py-2 align-items-baseline">
                            <label className="col-3">Order From:</label>
                            <input type="date"
                                   value={props.filterDates.filterFromDate}
                                   className="px-1 ml-3 coupon-percentage-discount-field"
                                   onChange={props.onChangeFromDateHandler}
                                   onClick={props.onChangeFromDateHandler}
                            />
                        </div>
                        <div className="col d-flex align-items-baseline">
                            <label className="col-3">Order To:</label>
                            <input type="date"
                                   value={props.filterDates.filterToDate}
                                   className="px-1 ml-3 coupon-percentage-discount-field"
                                   onChange={props.onChangeToDateHandler}
                                   onClick={props.onChangeToDateHandler}
                            />
                        </div>
                        <div className="col d-flex align-items-baseline">
                            <button type="button" className="btn-apply-order-history"
                                    onClick={props.onApplyCallOrderMealsQuery}
                            >Apply
                            </button>
                        </div>

                    </div>

                    <div className="d-flex align-items-baseline">
                        <label className="mr-2">Orders per Page:</label>
                        <select className="select-order-info font-weight-bold bg-white"
                                onChange={props.onChangeNumberOfItemsPerPage}
                                value={props.numberOfItemsPerPage}>

                            <option className="font-weight-bold" value="5">5</option>
                            <option className="font-weight-bold" value="10">10</option>
                            <option className="font-weight-bold" value="25">25</option>
                            <option className="font-weight-bold" value="50">50</option>
                            <option className="font-weight-bold" value="100">100</option>

                        </select>
                    </div>

                    <div className="d-flex align-items-baseline">
                        <label className="mr-2">Show Meals By:</label>
                        <select className="select-order-info font-weight-bold bg-white"
                                onChange={props.onChangeShowMealsByHandler}
                                value={props.showMealsByValue}>

                            <option className="font-weight-bold" value="All">All</option>
                            <option className="font-weight-bold" value="Scheduled">Scheduled</option>
                            <option className="font-weight-bold" value="Ordered">Ordered</option>

                        </select>
                    </div>

                </div>

                <div className="row d-flex flex-column flex-grow-1 h-100">
                    {
                        props.orderMealsByPage.length > 0 &&
                        <div aria-label="Page navigation example"
                             className="pt-5 w-100 d-flex justify-content-center">

                            <ul className="pagination">
                                <li className="page-item">
                                <span className="page-link cursor-pointer" aria-label="Previous"
                                      onClick={props.onClickPagePerClick}>
                                    <span aria-hidden="true">&laquo;</span>
                                    <span className="sr-only">Previous</span>
                                </span>
                                </li>
                                {
                                    props.showPages.map((item, index) => {
                                        if (item === (parseInt(props.pageSelected) + 1)) {
                                            return <li className="page-item active" key={"page-item-id-" + index}
                                                       onClick={props.onClickPagePerClick}
                                            >
                                                <span className="page-link cursor-pointer">{item}</span>
                                            </li>
                                        } else {
                                            return <li className="page-item" key={"page-item-id-" + index}
                                                       onClick={props.onClickPagePerClick}
                                            >
                                                <span className="page-link cursor-pointer">{item}</span>
                                            </li>
                                        }


                                    })
                                }
                                <li className="page-item">
                                <span className="page-link cursor-pointer" aria-label="Next"
                                      onClick={props.onClickPagePerClick}>
                                    <span aria-hidden="true">&raquo;</span>
                                    <span className="sr-only">Next</span>
                                </span>
                                </li>
                            </ul>

                        </div>
                    }
                    <ul className="list-unstyled">

                        {
                            props.orderMealsByPage.map((item, index) => {
                                return <li key={"order-history-cart-id-" + index}>
                                    <OrderHistoryCart
                                        item={item}
                                        index={index}
                                    />
                                </li>
                            })
                        }

                    </ul>

                </div>

            </div>

        </div>

    )

}

export default OrderHistory;