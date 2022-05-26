import { render} from "@testing-library/react"
import {BrowserRouter as Router} from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";
import GuestRoute from "./GuestRoute";

describe('GuestRoute test',()=>{

    const MockAuthProvider = ({user, children}) =>{
        return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
    }

    const component = () => {
        return <div><span>Guest component</span></div>
    }

    describe('Functionality', ()=>{
        test('muestra el componente cuando el usuario no esta autenticado', ()=>{
            const user = {
                user: null
            };

           const{queryByText} = render(
                <MockAuthProvider user={user}> 
                    <Router>
                        <GuestRoute component={component}></GuestRoute>
                    </Router>
                </MockAuthProvider>
            )

            const spanElement = queryByText('Guest component')

            expect(spanElement).toBeInTheDocument();

        })

        test('el componente no se muestra cuando el usuario esta autenticado', ()=>{
            const user = {
                user: "test@gmail.com"
            };

           const{queryByText} = render(
                <MockAuthProvider user={user}> 
                    <Router>
                        <GuestRoute component={component}></GuestRoute>
                    </Router>
                </MockAuthProvider>
            )

            const spanElement = queryByText('Guest component')

            expect(spanElement).not.toBeInTheDocument();

        })
    })

})