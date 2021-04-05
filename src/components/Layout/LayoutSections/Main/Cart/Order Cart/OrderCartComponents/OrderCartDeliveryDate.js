import React from "react";
import Aux from "../../../../../../../hoc/Auxilliary";

const OrderCartDeliveryDate = (props) => {

    let dates = []

    let getMondayInCurrentWeek = () => {
        let currentDate = new Date();
        let month = currentDate.getMonth();
        let monthDate = currentDate.getDate();
        let year = currentDate.getFullYear();
        let dayInMonth = new Date(year, month, monthDate);
        let dayInMonthNumber = dayInMonth.getDay();
        let fullDate;

        if (dayInMonthNumber === 0) {
            fullDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 6);
            monthDate = fullDate.getDate();
            month = fullDate.getMonth();
        } else {
            let mondayInWeek = (dayInMonthNumber - 1);
            monthDate = monthDate - mondayInWeek;
            if (monthDate < 0) {
                let newDate = new Date(year, month, 0)
                monthDate = newDate.getDate() - (Math.abs(monthDate));
                month = month - 1;
            }
        }

        return [month, monthDate, year];

    }

    let populateDates = () => {
        let deliveryDates = [];

        let mealMenuDate = props.mealMenuDate.split("-");

        let newDate = new Date(mealMenuDate[2], mealMenuDate[0] - 1, mealMenuDate[1])

        let currentDate = new Date();

        // let mondayInCurrentWeekDate = getMondayInCurrentWeek().join("-");
        // let mondayInMenuWeekDate = newDate.getMonth() + "-" + newDate.getDate() + "-" + newDate.getFullYear();
        //
        // let allowOrder = false;
        //
        // if (mondayInCurrentWeekDate === mondayInMenuWeekDate &&
        //     (currentDate.getDay() === 0 && currentDate.getHours() < 6)) {
        //     allowOrder = true;
        // } else if (newDate.getTime() > currentDate.getTime()) {
        //     allowOrder = true;
        // } else if (newDate.getTime() < currentDate.getTime()) {
        //     allowOrder = false;
        // } else if (mondayInCurrentWeekDate === mondayInMenuWeekDate &&
        //     (currentDate.getDay() === 0 && currentDate.getHours() > 6)) {
        //     allowOrder = false
        // }


        if (currentDate.getTime() > newDate.getTime()
            || currentDate.getTime() === newDate.getTime()) {
            const month = currentDate.toLocaleString('default', {month: 'long'});
            let day = currentDate.getDate();
            let dayInWeek = currentDate.getDay();

            if (dayInWeek === 0) {
                let deliveryDate = month + " " + (day) + ", " + currentDate.getFullYear();
                deliveryDates.push(deliveryDate);
            }

            let iValue = dayInWeek + 1;
            if (currentDate.getHours() < 6) {
                iValue = dayInWeek;
                --day;
            }
            if (dayInWeek > 0 && dayInWeek <= 6) {
                for (let i = iValue; i <= 7; i++) {
                    let deliveryDate = month + " " + (++day) + ", " + currentDate.getFullYear();
                    deliveryDates.push(deliveryDate);
                }
            }
        } else if (currentDate.getTime() < newDate.getTime() && currentDate.getHours() < 6) {
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
                    let iValue = dayInWeek + 1;
                    if (currentDate.getHours() < 6) {
                        iValue = dayInWeek;
                        day--;
                    }
                    for (let i = iValue; i <= 7; i++) {
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