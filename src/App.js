
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navigation/Navbar';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import PrivateRoute from './components/Routing/PrivateRoute';
import Home from "./pages/Home/Home";
import Servicios from './pages/Servicios/Servicios';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import User from "./pages/User/User";
import GuestRoute from './components/Routing/GuestRoute';
import SharePicture from './pages/SharePicture/SharePicture';
import * as Sentry from "@sentry/react";

function App() {

  const {isLoading} = useContext(AuthContext);
  return (

    isLoading ? <div>Cargando...</div>:
    (<Router>
      {/* <Navbar/> */}
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/services" component={Servicios}></Route>
        <GuestRoute exact path="/register" component={SignUp}></GuestRoute>
        <GuestRoute exact path="/login" component={SignIn}></GuestRoute>
        <PrivateRoute exact path="/user" component={User}></PrivateRoute>
        <PrivateRoute exact path="/sharepicture" component={SharePicture}></PrivateRoute>
      </Switch>
    </Router>)
  );
}

export default Sentry.withProfiler(App);
