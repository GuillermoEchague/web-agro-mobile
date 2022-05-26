import { render} from "@testing-library/react"
import {BrowserRouter as Router} from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";
import PrivateRoute from "./PrivateRoute";

describe('PrivateRoute test',()=>{

    const MockAuthProvider = ({user, children}) =>{
        return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
    }

    const component = () => {
        return <div><span>Private component</span></div>
    }

    describe('Functionality', ()=>{
        test('muestra el componente cuando el usuario esta autenticado', ()=>{
            const user = {
                user: {email:"test@gmail.com"}
            };

           const{queryByText} = render(
                <MockAuthProvider user={user}> 
                    <Router>
                        <PrivateRoute component={component}></PrivateRoute>
                    </Router>
                </MockAuthProvider>
            )

            const spanElement = queryByText('Private component')

            expect(spanElement).toBeInTheDocument();

        })

        test('el componente no se muestra cuando el usuario no esta autenticado', ()=>{
            const user = {
                user: null
            };

           const{queryByText} = render(
                <MockAuthProvider user={user}> 
                    <Router>
                        <PrivateRoute component={component}></PrivateRoute>
                    </Router>
                </MockAuthProvider>
            )

            const spanElement = queryByText('Private component')

            expect(spanElement).not.toBeInTheDocument();

        })
    })

})