import React from "react";
import Aux from "../../../../../../../hoc/Auxilliary";

const OrderCartDeliveryDate = (props) => {

    let dates = []

    let populateDates = () => {
        let deliveryDates = [];

        let mealMenuDate = props.mealMenuDate.split("-");

        let newDate = new Date(mealMenuDate[2], mealMenuDate[0] - 1, mealMenuDate[1])

        let currentDate = new Date();

        if (currentDate.getTime() > newDate.getTime() && currentDate.getHours() < 6) {
            const month = currentDate.toLocaleString('default', {month: 'long'});
            let day = currentDate.getDate();
            let dayInWeek = currentDate.getDay();

            if (dayInWeek === 0) {
                let deliveryDate = month + " " + (day) + ", " + currentDate.getFullYear();
                deliveryDates.push(deliveryDate);
            }

            if (dayInWeek > 0 && dayInWeek <= 6) {
                for (let i = dayInWeek + 1; i <= 7; i++) {
                    let deliveryDate = month + " " + (++day) + ", " + currentDate.getFullYear();
                    deliveryDates.push(deliveryDate);
                }
            }

        } else if (currentDate.getTime() < newDate.getTime() && currentDate.getHours() < 5) {
            const month = newDate.toLocaleString('default', {month: 'long'});
            let day = newDate.getDate();
            let dayInWeek = newDate.getDay();

            if (dayInWeek > 0 && dayInWeek <= 6) {
                if (dayInWeek === 1) {
                    for (let i = dayInWeek; i <= 7; i++) {
                        let deliveryDate = month + " " + (day++) + ", " + newDate.getFullYear();
                        deliveryDates.push(deliveryDate);
                    }
                } else {
                    for (let i = dayInWeek + 1; i <= 7; i++) {
                        let deliveryDate = month + " " + (day++) + ", " + newDate.getFullYear();
                        deliveryDates.push(deliveryDate);
                    }
                }

            }
        }

        return deliveryDates;

    }

    dates = populateDates();


    return (

        <Aux>

            {
                dates.length > 0 ? <select
                        onChange={props.deliveryDateOnChangeHandler}
                        value={props.deliveryDateValue}
                        name={props.deliveryDateName} id={props.deliveryDateId} className="ml-1">
                        {dates.map((item, index) => {
                            return <option
                                key={index} value={dates[index]}
                            >
                                {dates[index]}
                            </option>
                        })}

                    </select> :
                    <p className="text-danger pl-2">Can't order</p>
            }

        </Aux>

    )

}

export default OrderCartDeliveryDate;