import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Route, Redirect } from 'react-router-dom';


const PrivateRoute = ({ component: Component, ...routeProps }) => {
    const { user } = useContext(AuthContext);
    return (
        <Route
            {...routeProps} render={props =>
                user ? <Component {...props}></Component>
                    : <Redirect to="/login"></Redirect>
            }
        ></Route>
    )
}

export default PrivateRoute
