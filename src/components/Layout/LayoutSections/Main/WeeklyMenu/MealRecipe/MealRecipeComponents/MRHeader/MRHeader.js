import React from "react";

import './MRHeader.css';

import Aux from "../../../../../../../../hoc/Auxilliary";

const MRHeader = (props) => {

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


    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const cartItems = JSON.parse(localStorage.getItem("shoppingCartItems"))
    const mealInfo = JSON.parse(localStorage.getItem("mealInfo"));

    let isElementExist = true;

    isLoggedIn === "YES" && cartItems.forEach(item => {
        if (item.menuCardIndex === mealInfo.cardIdNumber)
            isElementExist = false;
    })


    return (

        <Aux>

            <div className="row d-flex flex-column">

                <div className="col">
                    <h1 className="">{props.mealInfo.mealName}</h1>
                    <h4 className="text-color-green">{props.mealInfo.mealDescription}</h4>
                </div>

                <div className="w-75">
                    <hr/>
                </div>

                <div className="col d-flex justify-content-between">

                    <div className="col-8">

                        <h4 className="mb-3">
                            Category:
                            <span className="text-color-green ml-5 border-bottom">
                                    {props.mealInfo.mealCategory}
                            </span>
                        </h4>

                        <div className="mc-options">
                            <select
                                value={props.mealInformation.customizeItValue}
                                name={props.mealInformation.customizeItValue}
                                onChange={props.onChangeCustomizeItHandler}
                                className="meal-recipe-customize-it"
                            >
                                {options.map((item, index) => {
                                    return <option
                                        key={index} value={item.value}
                                    >
                                        {item.label}
                                    </option>
                                })}
                            </select>
                        </div>
                        <p className="font-size-2">
                            ***Free customization option.
                            Add or remove ingredients at no extra cost.
                        </p>


                        {
                            props.isLoggedIn && <h4 className="mt-3">
                                Price:
                                <span className="text-color-green ml-5 border-bottom">
                                    {props.mealInfo.price} $
                                </span>
                            </h4>
                        }

                    </div>

                    {
                        props.isLoggedIn && <div className="meal-recipe-add-to-cart col-4">
                            {
                                isElementExist ? <button
                                    onClick={props.addToCartHandler}
                                    type="button" className="btn-add-to-cart" value="Add to Cart"
                                >
                                    Add to Cart
                                </button> : <button
                                    onClick={props.removeItem}
                                    type="button" className="btn-remove-item" value="Remove item"
                                >
                                    {/*btn-remove-item*/}
                                    Remove
                                </button>
                            }
                        </div>
                    }

                </div>

            </div>


        </Aux>

    )

}

export default MRHeader;