import React from "react";


const CustomizeItCard = (props) => {
    console.log(props)

    return (


        <div className="card p-3">


            <div className="close-customize-it-card d-flex justify-content-end">
               <button type="button" className="text-right p-1 btn-close-customize-it-card">X</button>
            </div>

            <h5 className="text-uppercase pb-4">
                Customize It Options For
            </h5>

            <ul className="list-unstyled">

                <li className="text-color-green">Smoked Almond and Herbed Goat Cheese Stuffed Chicken Breast</li>
                <li className="text-color-green">Organic Boneless Skinless Chicken Breasts</li>
                <li className="text-color-green">Duroc Boneless Pork Chops</li>
                <li className="text-color-green">Boneless Skinless Chicken Breasts</li>
                <li className="text-color-green">Antibiotic-Free Boneless Skinless Chicken Breasts</li>

            </ul>

            <div className="pt-4">
                <button type="button" className="btn-close-customize-it w-100 ">Close</button>
                {/*<button type="button" className="btn-go-to-cart w-100 ">Go to Cart</button>*/}
            </div>

        </div>

    )
}

export default CustomizeItCard;