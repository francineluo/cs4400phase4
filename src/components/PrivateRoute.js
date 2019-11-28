import React from 'react';
import {
    Route,
    Redirect,
    withRouter
} from "react-router-dom";

function PrivateRoute({ component: Component, loggedIn, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => loggedIn === true
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/login', state: { loggedOut: true, from: props.location } }} />}
        />
    )
}

export default withRouter(PrivateRoute);