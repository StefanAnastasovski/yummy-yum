import React from "react";


const CustomizeItCard = (props) => {

    let customizeArray = JSON.parse(localStorage.getItem("mealRecipe"));
    let value = "";
    if (customizeArray) {
        customizeArray.forEach(item => {
            if (item.cardIdNumber === props.cardIdNumber)
                value = item.customizeItOption;
        })
    }
    const options = [
        {
            label: "Smoked Almond and Herbed Goat Cheese Stuffed Chicken Breast",
            value: "Smoked Almond and Herbed Goat Cheese Stuffed Chicken Breast",
            checked: false
        },
        {
            label: "Organic Boneless Skinless Chicken Breasts",
            value: "Organic Boneless Skinless Chicken Breasts",
            checked: false

        },
        {
            label: "Duroc Boneless Pork Chops",
            value: "Duroc Boneless Pork Chops",
            checked: false

        },
        {
            label: "Boneless Skinless Chicken Breasts",
            value: "Boneless Skinless Chicken Breasts",
            checked: false

        },
        {
            label: "Antibiotic-Free Boneless Skinless Chicken Breasts",
            value: "Antibiotic-Free Boneless Skinless Chicken Breasts",
            checked: false
        },
        {
            label: "Suggested",
            value: "Suggested",
            checked: true
        },
    ];

    options.forEach(item => {
        if (item.value === value)
            item.checked = true;
    })

    let clicked = () => {
        props.closeCustomizeCard("");
    }


    let customizeItClicked = (event) => {
        options.forEach(item => {
            if (item.value === value) {
                item.checked = true;
            }
        })
        props.customizeItCardOnClickHandler(event, props.cardIdNumber)
    }

    console.log(props)

    return (


        <div className="d-flex flex-column justify-content-between p-3 h-100">

            <div>
                <div className="close-customize-it-card d-flex justify-content-end">
                    <button
                        onClick={clicked}
                        type="button" className="text-right p-1 btn-close-customize-it-card">
                        X
                    </button>

                </div>

                <h5 className="text-uppercase pb-4">
                    Customize It Options For
                </h5>

            </div>

            <ul className="list-unstyled">

                {options.map((item, index) => {
                    console.log(item)
                    return <li className="text-color-green" key={(index + 1)}>
                        {localStorage.getItem("isLoggedIn") === "YES"
                        && <input
                            checked={options[index].checked}
                            onChange={customizeItClicked}
                            type="radio"
                            value={options[index].value}
                            className="cursor-pointer mr-1"
                            name="customize-it-option"/>}
                        {options[index].label}
                    </li>
                })}

            </ul>

            <div className="pt-4">
                <button
                    type="button" className="btn-close-customize-it w-100 "
                    onClick={clicked}
                >
                    Close
                </button>
                {/*<button type="button" className="btn-go-to-cart w-100 ">Go to Cart</button>*/}
            </div>

        </div>

    )
}

export default CustomizeItCard;