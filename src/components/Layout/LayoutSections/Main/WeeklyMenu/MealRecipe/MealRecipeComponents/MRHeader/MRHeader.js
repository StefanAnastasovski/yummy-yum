import React from "react";

import './MRHeader.css';

import Aux from "../../../../../../../../hoc/Auxilliary";

const MRHeader = (props) => {

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
            label: "Default",
            value: "Default",
            checked: true
        },
    ];


    const cartItems = JSON.parse(localStorage.getItem("shoppingCartItems"))
    const mealInfo = JSON.parse(localStorage.getItem("mealInfo"));

    let isElementExist = true;

    cartItems.forEach(item => {
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

                    <div className="col">

                        <h4 className="mb-3">
                            Category:
                            <span className="text-color-green ml-5 border-bottom">
                                    {props.mealInfo.mealCategory}
                            </span>
                        </h4>

                        <div>
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
                        props.isLoggedIn && <div className="meal-recipe-add-to-cart col">
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