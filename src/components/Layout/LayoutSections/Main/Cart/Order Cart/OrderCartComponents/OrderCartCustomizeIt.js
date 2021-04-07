import React from "react";
import Aux from "../../../../../../../hoc/Auxilliary";

const OrderCartCustomizeIt = (props) => {

    return (

        <Aux>

            {
                    <p className="text-color-green">{props.customizeItValue}</p>
            }

        </Aux>

    )

}

export default OrderCartCustomizeIt;