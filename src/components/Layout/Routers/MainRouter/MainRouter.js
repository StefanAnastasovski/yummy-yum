import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import Aux from "../../../../hoc/Auxilliary";

import Main from "../../LayoutSections/Main/Main";

class MainRouter extends Component {

    // state = {};

    // method = () => {
    //
    // };

    render() {

        return (

                <Aux>
                    <Router>

                        <Switch>

                            <Route exact path="/">

                                <Main />

                            </Route>

                        </Switch>

                    </Router>
                </Aux>

        )

    }

}

export default MainRouter;
