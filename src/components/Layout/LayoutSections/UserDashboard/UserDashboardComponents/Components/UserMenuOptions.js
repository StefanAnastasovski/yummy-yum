import React from "react";

const UserMenuOptions = (props) => {

    let array = ["Personal Information",
        "Shipping Information",
        "Subscription",
        "Order History"]

    return (

        <div className="user-menu-options">

                {
                    array.map((item, index) => {
                        let pt = ""
                        let pb = "";
                        if(index === 0)
                            pt = " pt-2"
                        if(index === array.length-1)
                            pb = " pb-2"
                        if (props.title === item) {
                            return <div onClick={props.onClickChangeTitle}><p className={"user-option-selected" + pt + pb}>{item}</p></div>
                        } else {
                            return <div onClick={props.onClickChangeTitle}><p className={pt + pb}>{item}</p></div>
                        }
                    })
                }

        </div>

    )

}

export default UserMenuOptions;