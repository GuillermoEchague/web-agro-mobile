import Navbar from "./Navbar";
import { render, fireEvent, waitFor  } from "@testing-library/react"
import {BrowserRouter as Router} from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";


const MockAuthProvider = ({user, children}) =>{
    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

const setupWithoutAuth = () => {
    const user = {user: null};
    return render(
        <MockAuthProvider user={user}>
            <Router>
                <Navbar></Navbar>
            </Router> 
        </MockAuthProvider>
    );
}

const setupWithAuth = (logout) => {
    const user = {user: {email:'test@gmail.com'}};
    return render(
        <MockAuthProvider user={user}>
            <Router>
                <Navbar logout={logout}></Navbar>
            </Router> 
        </MockAuthProvider>
    );
}

const mockHistoryReplace = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        replace: mockHistoryReplace
    })
}))

describe('Navbar test', ()=>{
    describe('Layout', ()=> {

        test('tiene el logo', ()=>{
            const { queryByText } = render(<Router><Navbar></Navbar></Router>);

            const homeLink =  queryByText('AgroVisionIA');
            expect(homeLink.getAttribute('href')).toBe("/");
        })

        test('tiene el enlace para ir a la pagina principal', ()=>{
            const { queryByText } = render(<Router><Navbar></Navbar></Router>);

            const homeLink =  queryByText('INICIO');
            expect(homeLink.getAttribute('href')).toBe("/");
        })

        test('cuando el usuario no esta logeado en el sistema debe mostrar el enlace para iniciar sesion', ()=>{
            const { queryByText } = setupWithoutAuth();

            const signInLink =  queryByText('INICIAR SESION');
            expect(signInLink.getAttribute('href')).toBe("/login");
        })

        test('cuando el usuario no esta logeado en el sistema debe mostrar el enlace para crear cuenta', ()=>{
            const { queryByText } = setupWithoutAuth();

            const signUpLink =  queryByText('CREAR CUENTA');
            expect(signUpLink.getAttribute('href')).toBe("/register");
        })

        test('cuando el usuario esta logeado en el sistema debe mostrar el enlace para ir a la pagina del usuario', ()=>{
            const { queryByText } = setupWithAuth();

            const homeLink =  queryByText('test'.toUpperCase());
            expect(homeLink.getAttribute('href')).toBe("/user");
        })

        test('cuando el usuario esta logeado en el sistema debe mostrar el enlace para cerrar sesion', ()=>{
            const { queryByText } = setupWithAuth();

            const userLink =  queryByText('CERRAR SESION');
            expect(userLink).toBeInTheDocument();
        })

        test('cuando el usuario esta logeado en el sistema debe mostrar el enlace para subir imagen', ()=>{
            const { queryByText } = setupWithAuth();

            const sharePictureLink =  queryByText('SUBIR IMAGEN');
            expect(sharePictureLink.getAttribute('href')).toBe('/sharepicture');
        })
    })

    describe('Functionality', ()=> {
        test('cuando el usuario da click en cerrar sesion, se cierra la sesion', ()=>{
            const logoutFunction = jest.fn().mockResolvedValue();
            const { queryByText } = setupWithAuth(logoutFunction);
            const logoutLink =  queryByText('CERRAR SESION');
            fireEvent.click(logoutLink);
            expect(logoutFunction).toHaveBeenCalledTimes(1);
        })

        test('cuando el usuario da click en cerrar sesion, debe redireccionar al home', async ()=>{
            const logoutFunction = jest.fn().mockResolvedValue();
            const { queryByText } = setupWithAuth(logoutFunction);
            const logoutLink =  queryByText('CERRAR SESION');

            await waitFor(()=>{
                fireEvent.click(logoutLink);
            });

            expect(mockHistoryReplace).toHaveBeenCalledWith("/");
        })
    })
})