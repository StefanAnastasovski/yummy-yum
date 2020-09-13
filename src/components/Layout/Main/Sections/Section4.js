import React, {Component} from "react";

import TopMenu from "./Section4-Menus/TopMenu";

class Section4 extends Component {

    state = {
        menuName: "Adventurous",
        shortenMenuNameUppercase: "Adv",
        shortenMenuNameLowercase: "adv",

        mealName1: "Japanese BBQ Burger",
        mealText1: "with smoky potato wedges",

        mealName2: "Huli-Huli Chicken Rice Bowl",
        mealText2: "with charred pineapple",

        mealName3: "Garlic-Parmesan Crusted Filet Mignon",
        mealText3: "with red wine sauce, roasted red potatoes and parsnips",

        mealName4: "Korean Fried Chicken",
        mealText4: "with edamame rice",
    }


    render() {

        let Adventurous = {

            menuName: "Adventurous",
            shortenMenuNameUppercase: "Adv",
            shortenMenuNameLowercase: "adv",

            mealName1: "Japanese BBQ Burger",
            mealText1: "with smoky potato wedges",

            mealName2: "Huli-Huli Chicken Rice Bowl",
            mealText2: "with charred pineapple",

            mealName3: "Garlic-Parmesan Crusted Filet Mignon",
            mealText3: "with red wine sauce, roasted red potatoes and parsnips",

            mealName4: "Korean Fried Chicken",
            mealText4: "with edamame rice",

        }

        let CarbConscious = {

            menuName: "CarbConscious",
            shortenMenuNameUppercase: "CC",
            shortenMenuNameLowercase: "cc",

            mealName1: "Pretzel-Crusted Pork Chop",
            mealText1: "with brown sugar Dijonnaise and shaved Brussels sprouts",

            mealName2: "Teriyaki Ginger-Glazed Salmon",
            mealText2: "with stir-fried bok choy and carrots",

            mealName3: "Sweet Chili Pork Lettuce Wrap with Crispy Rice Noodles",
            mealText3: "ready in 15 minutes",

            mealName4: "Chicken Taco Stuffed Peppers",
            mealText4: "with pico de gallo and sour cream",

        }

        let LowCal = {

            menuName: "LowCal",
            shortenMenuNameUppercase: "LC",
            shortenMenuNameLowercase: "lc",

            mealName1: "BBQ Shrimp Pizzas",
            mealText1: "with pico de gallo",

            mealName2: "Greek Spinach and Feta Chicken",
            mealText2: "with zucchini and yellow squash",

            mealName3: "Pork Tenderloin with Roasted Pears",
            mealText3: "with green beans and garlic-thyme sauce",

            mealName4: "Roasted Salmon with Ginger-Scallion Sauce",
            mealText4: "and charred green beans",

        }

        let QuickAndSimple = {

            menuName: "QuickAndSimple",
            shortenMenuNameUppercase: "QAS",
            shortenMenuNameLowercase: "qas",

            mealName1: "Crispy Caesar Chicken with Roasted Broccoli",
            mealText1: "easy prep & pan included",

            mealName2: "Creamy Tomato and Italian Sausage Penne Bake with Spinach",
            mealText2: "easy prep & pan included",

            mealName3: "Apple & Chicken Salad",
            mealText3: "no cooking required",

            mealName4: "BBQ Chicken Flatbreads with Ranch Dressing",
            mealText4: "ready in 15 minutes",

        }

        let Vegetarian = {

            menuName: "vegetarian",
            shortenMenuNameUppercase: "Veg",
            shortenMenuNameLowercase: "veg",

            mealName1: "Fig and Goat Cheese Flatbread",
            mealText1: "with walnuts and caramelized onions",

            mealName2: "Sun-Dried Tomato Pesto Spaghetti",
            mealText2: "with garlic bread",

            mealName3: "Brussels & Brown Butter Risotto",
            mealText3: "with goat cheese and pecans",

            mealName4: "Crispy Teriyaki Tofu Tacos",
            mealText4: "with jalapeño",

        }

        let chooseMenu = "Adventurous";

        return (

            <div className="main-section-4 pt-3 pb-5">

                <div className="container">

                    <div className="ms4-dd-menu">

                        <h2 className="text-center text-uppercase">What's on your menu</h2>

                        {/*Dropdown menu - meals*/}
                        <div>

                            <h4 className="text-color-green text-center pt-2">
                                Choose one of our menus
                            </h4>

                            <div className="ms4-dd-menu-section w-50 container py-3">

                                <div className="ms4-dd-menu-btn">

                                    <ul className="ms4-ddm-main">

                                        <li>
                                            <input type="submit" value={chooseMenu}
                                                   className="dd-menu-btn font-size-1" />
                                        </li>

                                        <li>

                                            <ul className="dd-menu ">
                                                <li>Adventurous</li>
                                                <li>Quick and Simple</li>
                                                <li>Low-cal</li>
                                                <li>Carb-conscious</li>
                                                <li>Vegetarian</li>
                                            </ul>

                                        </li>

                                    </ul>

                                </div>

                            </div>

                            <div className="ms4-menu-section">

                                {/*Choose one of our menus*/}
                                <div className="row ms4-ms text-center">

                                    <TopMenu MenuInf={this.state}/>

                                </div>

                                {/*See Full Menu*/}
                                <div className="ms4-full-menu-btn d-flex justify-content-center pt-5">

                                    <input type="submit" value="See Full Menu" className="full-menu-btn font-size-1" />

                                </div>


                            </div>

                        </div>

                    </div>

                </div>

            </div>

        )

    }
};

export default Section4;