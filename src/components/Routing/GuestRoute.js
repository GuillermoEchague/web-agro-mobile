import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Route, Redirect } from 'react-router-dom';


const GuestRoute = ({ component: Component, ...routeProps }) => {
    const { user } = useContext(AuthContext);
    return (
        <Route
            {...routeProps} render={props =>
                !user ? <Component {...props}></Component>
                    : <Redirect to="/user"></Redirect>
            }
        ></Route>
    )
}

export default GuestRoute