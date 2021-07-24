import React, {useState} from "react";


const CustomizeItCard = (props) => {

    let customizeArray = JSON.parse(localStorage.getItem("mealRecipe"));

    let options = props.mealCustomizeOptions.map(item => {
        return {
            label: item.mealCustomizeOption,
            value: item.mealCustomizeOption,
            checked: false
        }
    })

    options.push({
        label: "Default",
        value: "Default",
        checked: true
    });

    if (customizeArray) {
        customizeArray.forEach(item => {
            if (item.cardIdNumber === props.cardIdNumber) {
                options.forEach((customizeOption, index) => {
                    customizeOption.checked = customizeOption.value === item.customizeItOption;
                })
            }
        })
    }


    const [customizeOptions, setOptions] = useState([]);

    if (customizeOptions.length === 0)
        setOptions(() => {
            return options
        })

    let clicked = () => {
        props.closeCustomizeCard("");
    }


    let useForceUpdate = (event) => {
        // console.log(event.target.value)
        options.forEach(item => {
            item.checked = event.target.value === item.value;
        })
        setOptions(() => {
            return options;
        })
        props.customizeItCardOnClickHandler(event, props.cardIdNumber, props.mealName, props.mealMenuName)
    }

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

                {customizeOptions.map((item, index) => {
                    return <li className="text-color-green" key={(index + 1)}>
                        {
                            localStorage.getItem("isLoggedIn") === "YES"
                            && <input
                                checked={customizeOptions[index].checked}
                                onChange={useForceUpdate}
                                type="radio"
                                value={customizeOptions[index].value}
                                className="cursor-pointer mr-1"
                                name="customize-it-option"/>
                        }
                        {customizeOptions[index].label}
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