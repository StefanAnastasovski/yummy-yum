import React, {Component} from "react";


import OrderInvoiceCalls from '../../../../../../../../repository/get/getOrderInvoice'

class OrderDetails extends Component {

    state = {
        paymentInfo: {},
        orderInfo: {},
        orderMeals: [],
        deliveryAddress: {
            address: "",
            zipCode: ""
        },
        userInfo: {
            fullName: "",
            username: ""
        },
        loading: true

    }


    async componentDidMount() {
        await this.getOrderInvoice();
    }

    getOrderInvoice = async () => {
        await OrderInvoiceCalls.fetchFullOrderInvoiceByOrderId(window.location.href.split("=")[1]).then((response) => {
            this.setState({
                paymentInfo: response.data.payment,
                orderInfo: response.data.orderInfo,
                orderMeals: response.data.orderMeals,
                deliveryAddress: {
                    address: response.data.deliveryAddress,
                    zipCode: response.data.deliveryZipCode
                },
                userInfo: {
                    fullName: response.data.firstName + " " + response.data.lastName,
                    username: response.data.username
                },
                loading: false
            })

        }).catch(function (error) {
            console.log(error)
        })
        // });
    }

    render() {

        return (

            <div className="admin-dashboard-wrapper">

                {
                    !this.state.loading && <div className="order-details row" key={this.props.keyEl}>

                    <div className="col pb-5">

                        <h2 className="text-center py-5">Order Details</h2>

                        <div className="container flex-row d-flex">

                            <div className="col order-details-user-info">

                                <h2 className="text-center">User Info:</h2>

                                <div className="d-flex">
                                    <p className="col">
                                        Full Name:
                                    </p>
                                    <p className="col text-color-green">
                                        {this.state.userInfo.fullName}
                                    </p>
                                </div>

                                <div className="d-flex">
                                    <p className="col">
                                        Username:
                                    </p>
                                    <p className="col text-color-green">
                                        {this.state.userInfo.username}
                                    </p>
                                </div>

                                <div className="d-flex">
                                    <p className="col">
                                        Delivery Address:
                                    </p>
                                    <p className="col text-color-green">
                                        {this.state.deliveryAddress.address}
                                    </p>
                                </div>

                                <div className="d-flex">
                                    <p className="col">
                                        Delivery Zip Code:
                                    </p>
                                    <p className="col text-color-green">
                                        {this.state.deliveryAddress.zipCode}
                                    </p>
                                </div>


                            </div>

                            <div className="col order-details-payment">

                                <h2 className="text-center">Payment Info:</h2>

                                <div className="d-flex">
                                    <p className="col">
                                        Card Number:
                                    </p>
                                    <p className="col text-color-green">
                                        {this.state.paymentInfo.cardNumber}
                                    </p>
                                </div>

                                <div className="d-flex">
                                    <p className="col">
                                        Payment Number ID:
                                    </p>
                                    <p className="col text-color-green">
                                        {this.state.paymentInfo.paymentNumberID}
                                    </p>
                                </div>

                                <div className="d-flex">
                                    <p className="col">
                                        Payment Date:
                                    </p>
                                    <p className="col text-color-green">
                                        {this.state.paymentInfo.paymentDate.split("T")[0]}
                                    </p>
                                </div>

                                <div className="d-flex">
                                    <p className="col">
                                        Total Amount:
                                    </p>
                                    <p className="col text-color-green">
                                        {this.state.paymentInfo.totalAmount}
                                    </p>
                                </div>


                            </div>

                        </div>

                        <div className="container flex-row d-flex">

                            <div className="col order-details-order-info">

                                <h2 className="text-center">Order Info:</h2>

                                <div className="d-flex">
                                    <p className="col">
                                        Order Id:
                                    </p>
                                    <p className="col text-color-green">
                                        {this.state.orderInfo.orderId}
                                    </p>
                                </div>

                                <div className="d-flex">
                                    <p className="col">
                                        Order Date:
                                    </p>
                                    <p className="col text-color-green">
                                        {
                                            this.state.orderInfo.orderDate.split("T")[0]
                                        }
                                    </p>
                                </div>

                                <div className="d-flex">
                                    <p className="col">
                                        Meal Number:
                                    </p>
                                    <p className="col text-color-green">
                                        {this.state.orderInfo.mealNumber}
                                    </p>
                                </div>

                                <div className="d-flex">
                                    <p className="col">
                                        Serving Number:
                                    </p>
                                    <p className="col text-color-green">
                                        {this.state.orderInfo.servingNumber}
                                    </p>
                                </div>

                                <div className="d-flex">
                                    <p className="col">
                                        Subtotal:
                                    </p>
                                    <p className="col text-color-green">
                                        $ {this.state.orderInfo.subtotal}
                                    </p>
                                </div>

                                <div className="d-flex">
                                    <p className="col">
                                        Shipping Cost:
                                    </p>
                                    <p className="col text-color-green">
                                        $ {this.state.orderInfo.servingNumber}
                                    </p>
                                </div>

                                <div className="d-flex">
                                    <p className="col">
                                        Total:
                                    </p>
                                    <p className="col text-color-green">
                                        $ {this.state.orderInfo.total}
                                    </p>
                                </div>


                            </div>

                        </div>

                        <div className="container flex-row d-flex">

                            <div className="col order-details-order-meals">

                                <h2 className="text-center">Order Meals:</h2>

                                <ul className="list-unstyled">
                                    {
                                        this.state.orderMeals.map((item, index) => {
                                            return <li key={"order-meal-id-" + index}>
                                                <h4 className="text-center pt-4"> Meal #{index + 1}</h4>

                                                <div className="d-flex">
                                                    <p className="col">
                                                        Meal Name:
                                                    </p>
                                                    <p className="col text-color-green">
                                                        {item.mealName}
                                                    </p>
                                                </div>

                                                <div className="d-flex">
                                                    <p className="col">
                                                        Menu Name:
                                                    </p>
                                                    <p className="col text-color-green">
                                                        {item.menuName}
                                                    </p>
                                                </div>

                                                <div className="d-flex">
                                                    <p className="col">
                                                        Servings:
                                                    </p>
                                                    <p className="col text-color-green">
                                                        {item.servings}
                                                    </p>
                                                </div>

                                                <div className="d-flex">
                                                    <p className="col">
                                                        Price per Meal:
                                                    </p>
                                                    <p className="col text-color-green">
                                                        $ {item.price}
                                                    </p>
                                                </div>

                                                <div className="d-flex">
                                                    <p className="col">
                                                        Customize Option:
                                                    </p>
                                                    <p className="col text-color-green">
                                                        {item.customizeIt}
                                                    </p>
                                                </div>

                                                <div className="d-flex">
                                                    <p className="col">
                                                        Delivery Date:
                                                    </p>
                                                    <p className="col text-color-green">
                                                        {item.deliveryDate}
                                                    </p>
                                                </div>

                                                <div className="d-flex">
                                                    <p className="col">
                                                        Delivery Time:
                                                    </p>
                                                    <p className="col text-color-green">
                                                        {item.deliveryTime}
                                                    </p>
                                                </div>


                                            </li>
                                        })
                                    }
                                </ul>

                            </div>

                        </div>

                    </div>

                </div>
                }
            </div>


        )

    }
}

export default OrderDetails;