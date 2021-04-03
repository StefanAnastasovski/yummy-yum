import React from "react";
import Aux from "../../../../../../../hoc/Auxilliary";

const OrderCartDeliveryTime = (props) => {

    let time = [
        "08:00 AM - 08:30 AM", "09:00 AM - 09:30 AM", "10:00 AM - 10:30 AM",
        "11:00 AM - 11:30 AM", "12:00 PM - 12:30 PM", "01:00 PM - 01:30 PM",
        "02:00 PM - 02:30 PM", "03:00 PM - 03:30 PM", "04:00 PM - 04:30 PM",
        "05:00 PM - 05:30 PM", "06:00 PM - 06:30 PM", "07:00 PM - 07:30 PM",
        "07:30 PM - 08:00 PM",
    ]

    return (


        <Aux>
            {

                new Date().getDay() !== 0 ||
                new Date().getDay() === 0 && new Date().getHours() < 6
                    ? <select
                        onChange={props.deliveryTimeOnChangeHandler}
                        value={props.deliveryTimeValue}
                        name={props.deliveryTimeName} id={props.deliveryTimeId} className="ml-1">
                        {time.map((item, index) => {
                            return <option
                                key={index} value={time[index]}
                            >
                                {time[index]}
                            </option>
                        })}

                    </select> :
                    <p className="text-danger pl-2">Can't order</p>
            }


        </Aux>
    )

}
export default OrderCartDeliveryTime;