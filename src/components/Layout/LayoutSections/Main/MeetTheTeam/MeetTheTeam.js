import React from "react"

import Image from "../WeeklyMenu/MealRecipe/MealRecipeComponents/Images/Image";
import IMG from "../../../../../images/MealRecipe/Image from iOS.jpg"

import './MeetTheTeam.css'

const MeetTheTeam = () => {

    let jobTitles = ["Junior Full Stack Developer", "Paid Media Specialist", "Data Analyst"]

    return (

        <div className="meet-our-team-wrapper">

            <div className="container py-5 d-flex">

                <div className="mot col-3">

                    <div className="mot-img">
                        <Image
                            // img = {props.images}
                            img={IMG}
                        />
                    </div>

                    <h3 className="py-2">
                        Stefan
                        <span className="pl-2 d-block">Anastasovski</span>
                    </h3>
                    <hr className="m-0 mt-2 w-75"/>

                    <ul>
                        {
                            jobTitles.map((item, index) => {
                                return <li key={"job-titles-id-" + index}>
                                    {item}
                                </li>
                            })
                        }
                    </ul>


                </div>


                <div className="container pt-5">

                    <h5 className="text-color-green text-uppercase pb-2">
                        Personal Profile
                    </h5>

                    <p>
                        I’m currently working in the digital
                        marketing field as a Head of Paid Media and Data Analyst.
                    </p>

                </div>


            </div>


        </div>

    )
}

export default MeetTheTeam;