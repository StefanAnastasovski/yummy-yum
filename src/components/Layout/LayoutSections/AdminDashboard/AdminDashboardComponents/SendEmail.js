import React, {Component} from "react";

class SendEmail extends Component {


    state = {
        subscribedUsers: 34,
        subscribeOrderListNumber: [1, 2, 3]
    }


    handleSubmit = (event) => {
        alert('Email is sent!');

        event.preventDefault();

    }

    render() {

        return (

            <div className="create-menu-wrapper py-5">

                <div className="button-go-back-to-dashboard">
                    <input type="button" className="btn-go-back-to-dashboard"
                           value="<< Go Back to Dashboard" onClick={this.props.onSubmitRoute}/>
                </div>

                <div className="cr-menu py-3 ">

                    <form onSubmit={this.handleSubmit}>

                        <div className="row d-flex flex-column">

                            <div className="row justify-content-center pb-4">
                                <h3>Send Email</h3>
                            </div>

                            <div className="row">
                                <div className="col-8 text-center">

                                    <div className="col d-flex flex-column">
                                        <label className="align-self-start">Subject:</label>
                                        <input type="text" className="w-50 mb-2"/>
                                    </div>

                                    <div className="col d-flex flex-column mb-2">
                                        <label className="align-self-start">Text:</label>
                                        <textarea className="w-75" rows="8"/>
                                    </div>

                                    <div className="col d-flex flex-column">
                                        <input type="file" className="w-50 mb-2 btn-email-attach"/>
                                    </div>

                                    <div className="col d-flex flex-column ">
                                        <input type="submit" value="Send Email!" className="w-50 align-self-center"/>
                                    </div>

                                </div>

                                <div className="col-2">

                                    <p>Subscribed Users: <span
                                        className="bg-white text-color-green p-2">{this.state.subscribedUsers}</span>
                                    </p>

                                    <div className="subscribers-list py-4">

                                        <ul className="list-unstyled sl">

                                            <li><span>{this.state.subscribeOrderListNumber[0]}</span>.
                                                example@example.com
                                            </li>

                                            <li><span>{this.state.subscribeOrderListNumber[1]}</span>.
                                                example@example.com
                                            </li>

                                            <li><span>{this.state.subscribeOrderListNumber[2]}</span>.
                                                example@example.com
                                            </li>

                                        </ul>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </form>

                </div>

            </div>

        )

    }

}

export default SendEmail;