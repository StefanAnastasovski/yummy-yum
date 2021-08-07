import React from "react"

import './OurGoal.css'
import IMG from "../../../../../images/OurGoal/healthy-vegetables-wooden-table.jpg"
import Image from "../WeeklyMenu/MealRecipe/MealRecipeComponents/Images/Image";

const OurGoal = () => {

    return (

        <div className="our-goal-wrapper">

            <div className="og-banner-img">

                <div className="og-img">

                    <Image
                        img={IMG}
                    />

                    <div className="og-title position-absolute bg-rgba-light-lemon-green p-2">

                        <h4 className="text-color-darkgreen text-center">
                            Yummy Yum brings people together around the dinner table.
                        </h4>

                        <p className="pt-2 text-center">
                            Helping you save time while enjoying real
                            home cooking and the joy that comes with it.
                        </p>

                    </div>

                </div>

            </div>

            <div className="container py-5 d-flex">

                <div className="og-description">

                    <p>
                        Every day, you're out there making things happen. That's why Yummy Yum was created:
                        to provide everything you need to bring more delicious meals and moments to the table, no
                        matter how busy you are. Because at Yummy Yum, we believe that preparing and enjoying a
                        home-cooked
                        meal should be a simply delicious experience.
                    </p>

                    <p className="py-2">
                        In fact, simplicity is our mantra. From online to doorstep...to your kitchen table, we make
                        planning
                        and preparing a home-cooked meal simple, intuitive and inspirational every step of the way.
                    </p>

                    <p>
                        The CEO started Yummy Yum by partnering with a chef to design delicious, easy-to-follow
                        recipes. Since then, our team has grown to include several chefs, and more than 700 employees
                        across
                        production, marketing, technology, product, design, and customer service. Last year, we
                        delivered
                        over 10 million meals and expanded our delivery to cover more than 97% of the U.S. population.
                        Some
                        days -- okay, most days -- we can't believe how quickly we've grown. But we believe that people
                        continue to love Yummy Yum for the same reasons it was founded: it saves time, reduces food
                        waste,
                        and most importantly, brings people together for a home-cooked meal.
                    </p>

                </div>

            </div>

        </div>

    )
}

export default OurGoal;