import React, {Component} from "react";

import './MRMealChef.css';

import Aux from "../../../../../../../../hoc/Auxilliary";

class MRMealChef extends Component {

    state = {
        chefFirstName: "Stefan",
        chefLastName: "Anastasovski"
    }

    render() {


        return (

            <Aux>

                <div className="mr-ms d-flex py-5 align-items-baseline">

                    <div className="mr-ms-chef-info col-2">

                        <div className="mr-ms-ci-img">
                            <img className={""}
                                 src='https://i.ibb.co/6gZcZ6q/meal1.jpg'
                                 alt="chef-img"
                                 width="100%"
                                 height="100%"
                            />
                        </div>

                        <p className="pl-3">
                            <span className="d-block font-size-1 pt-1">Chef</span>

                            <span className="pl-2 d-block">
                                {this.state.chefFirstName + " " + this.state.chefLastName}
                            </span>
                        </p>
                        <hr className="m-0 mt-2 w-75"/>

                    </div>

                    <div className="col-10 pl-2">
                        <p>
                            For crab's debut on our menu, we decided to hue close to tradition.
                            This means we're bringing you crab cakes from the land of crab
                            cakes itself: the Chesapeake Bay area of the Mid-Atlantic,
                            famous for its bounties of seafood.
                            Delicious and delectable crab cakes, soft and delicate,
                            are adorned by a tart lemon crema and served with tender
                            broccoli and cheesy potatoes. Crab is here,
                            and may it bring many delicious crab cakes to come!
                        </p>
                    </div>


                </div>


            </Aux>

        )
    }

}

export default MRMealChef;