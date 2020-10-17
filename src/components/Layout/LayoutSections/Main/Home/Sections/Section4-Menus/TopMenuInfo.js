import React from "react";

import TopMenu from "./TopMenu";

const TopMenuInfo = (props) => {


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

        menuName: "Vegetarian",
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
    let menuInfo = {};
    if (props.MenuName === "Adventurous")
        menuInfo = {...Adventurous};
    else if (props.MenuName === "Carb-Conscious")
        menuInfo = {...CarbConscious};
    else if (props.MenuName === "Low-Cal")
        menuInfo = {...LowCal};
    else if (props.MenuName === "Quick and Simple")
        menuInfo = {...QuickAndSimple};
    else if (props.MenuName === "Vegetarian")
        menuInfo = {...Vegetarian};

    return (

        <TopMenu menuInfo={menuInfo}/>

    )

}

export default TopMenuInfo;
