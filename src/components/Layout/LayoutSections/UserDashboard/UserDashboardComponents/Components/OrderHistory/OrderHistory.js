import React from "react";
import OrderHistoryCart from "./OrderHistoryComponents/OrderHistoryCart";

const OrderHistory = (props) => {

    console.log(props)

    let onChangeToDateHandler = (event) => {
        props.onChangeToDateHandler(event.target.value)
    }
    let onChangeFromDateHandler = (event) => {
        props.onChangeFromDateHandler(event.target.value)
    }
    return (

        <div className="user-menu-body-main col">

            <div className="container">

                <div className="row d-flex flex-column">

                    <div className="col pb-2 d-flex flex-column">
                        <div className="col d-flex py-2 align-items-baseline">
                            <label className="col-3">Order From:</label>
                            <input type="date"
                                   value={props.filterDates.filterFromDate}
                                   className="px-1 ml-3 coupon-percentage-discount-field"
                                   onChange={onChangeFromDateHandler}
                                   onClick={onChangeFromDateHandler}
                            />
                        </div>
                        <div className="col d-flex align-items-baseline">
                            <label className="col-3">Order To:</label>
                            <input type="date"
                                   value={props.filterDates.filterToDate}
                                   className="px-1 ml-3 coupon-percentage-discount-field"
                                   onChange={onChangeToDateHandler}
                                   onClick={onChangeToDateHandler}
                            />
                        </div>

                    </div>

                    {
                        props.info.map((item, index) => {
                            return <OrderHistoryCart
                                key={"order-history-cart-id-" + index}
                                item={item}
                            />
                        })
                    }
                </div>

            </div>

        </div>

    )

}

export default OrderHistory;