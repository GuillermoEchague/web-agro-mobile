import React, { useContext, useState } from 'react'
import { Link , useHistory } from 'react-router-dom';
import classNames from 'classnames';
import { AuthContext } from '../../context/AuthContext';
import {logoutFirebase} from '../../firebase/auth/functions';
import getUsername from '../../helpers/username';
import logo from '../../assets/image2vector3.svg';



const Navbar = ({logout = logoutFirebase}) => {

    const [isNavOpen, setIsNavOpen] = useState(true);
    const { user } = useContext(AuthContext);
    const history = useHistory();
    const signOut =  async () =>{
        await logout();
        
        history.replace('/');
    }

    return (
        
        <nav className="navbar navbar-expand-lg navbar-light bg-dark"  >
            <div className="container-fluid">
            <Link className="navbar-brand" to="/" ><img src={logo} alt='logo'/> AgroVisionIA</Link>
                <button
                    onClick={() => setIsNavOpen(!isNavOpen)}
                    className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={classNames("navbar-collapse", {
                    'collapse': isNavOpen
                })} id="navbarContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">INICIO</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/services">SERVICIOS</Link>
                        </li>
                    </ul>

                    <ul className="navbar-nav mr-auto mr-2 mb-lg-0">
                        { !user ?
                        <React.Fragment>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">CREAR CUENTA</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">INICIAR SESION</Link>
                            </li>
                        </React.Fragment> :
                        <React.Fragment>
                            <li className="nav-item">
                                <Link className="nav-link" to="/user">{getUsername(user).toUpperCase()}</Link>
                            </li>
                             <li className="nav-item" >
                                <Link className="nav-link" to="/sharepicture" >SUBIR IMAGEN</Link>
                            </li>
                            <li className="nav-item">
                                <a onClick={signOut} href="/#" className="nav-link">CERRAR SESION</a>
                            </li>
                        </React.Fragment>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
