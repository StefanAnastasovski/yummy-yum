import React from "react";


const MRRecipeStepsCard = () => {


    return (

        <div className="col card mx-5 meal-steps-card">

            <div className="card-img">

                <img className={""}
                     src='https://i.ibb.co/6gZcZ6q/meal1.jpg'
                     alt="chef-img"
                     width="100%"
                     height="100%"
                />

            </div>

            <div className="card-body">

                <h5>1. Roast the Sweet Potatoes</h5>

                <p className="py-2 text-color-green">Quarter <strong>sweet potato</strong> and cut
                    into ½" pieces.
                    Place sweet potato pieces on prepared baking sheet and toss with 2
                    tsp. <strong>olive oil</strong>, ¼ tsp. <strong>salt</strong>, and ¼
                    tsp. <strong>pepper</strong>. Massage oil and seasoning into potatoes.
                    Spread into a single layer and roast in hot oven until tender, 18-20
                    minutes.
                    While sweet potato roasts, prepare ingredients.
                </p>


            </div>

        </div>


    )

}

export default MRRecipeStepsCard;