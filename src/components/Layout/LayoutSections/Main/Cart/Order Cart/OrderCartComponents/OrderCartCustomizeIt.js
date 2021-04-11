import React from "react";
import Aux from "../../../../../../../hoc/Auxilliary";

const OrderCartCustomizeIt = (props) => {

    return (

        <Aux>

            {
                    <p className="text-color-green pl-2 text-center">{props.customizeItValue}</p>
            }

        </Aux>

    )

}

export default OrderCartCustomizeIt;