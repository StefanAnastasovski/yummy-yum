import React from "react";

const Dashboard = (props) => {

    return (

        <div className="dashboard-wrapper row py-5">

            <div className="col">

                <div className="col d-flex justify-content-center">
                    <a className="w-100 text-center" href={window.location.href +"/create-recipe"}>
                        <button className="w-50 btn-create-recipe" onClick={props.onSubmitRoute}>
                            Create Recipe
                        </button>
                    </a>
                </div>

                <div className="col d-flex justify-content-center my-5">
                    <a className="w-100 text-center" href={window.location.href +"/create-menu"}>
                        <button className="w-50 btn-create-menu" onClick={props.onSubmitRoute}>
                            Create Menu
                        </button>
                    </a>
                </div>

            </div>

            <div className="col d-flex flex-column">

                <div className="row">

                    <div className="col">
                        <p>Subscribed Users:
                            <span className="font-weight-bold bg-white px-5 py-1 ml-3 text-color-green">32</span>
                        </p>
                    </div>

                </div>

                <div className="row">

                    <div className="col d-flex justify-content-center my-5">
                        <a className="w-100 text-center" href={window.location.href +"/send-email"}>
                            <button className="w-50 btn-send-email" onClick={props.onSubmitRoute}>
                                Send Email
                            </button>
                        </a>
                    </div>

                </div>


            </div>

        </div>

    )

}

export default Dashboard;