import { render } from "@testing-library/react"
import { AuthContext } from "../../../context/AuthContext"
import Controls from "./Controls"

const MockAuthProvider = ({ user, children }) => {
    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

const MockControl = ({ picture }) => {
    return <div>Control</div>
}

describe('Controls tests', () => {
    describe('Layout', () => {

        test('renderiza el control cuando la picture pertenece al usuario y el path es /user', () => {

            const user = { user: { uid: 1 } };
            const picture = { user_id: 1 };

            window.history.pushState({}, '', '/user');

            const {queryByText} = render(<MockAuthProvider user={user}>
                <Controls>
                    <MockControl picture={picture}></MockControl>
                </Controls>
            </MockAuthProvider>);

            expect(queryByText('Control')).toBeInTheDocument();

        })

        test('no renderiza el control cuando la picture no le pertenece al usuario autenticado', () => {

            const user = { user: { uid: 1 } };
            const picture = { user_id: 2 };

            window.history.pushState({}, '', '/user');

            const {queryByText} = render(<MockAuthProvider user={user}>
                <Controls>
                    <MockControl picture={picture}></MockControl>
                </Controls>
            </MockAuthProvider>);

            expect(queryByText('Control')).not.toBeInTheDocument();

        })

        test('no renderiza el control cuando el path es diferente a /user', () => {

            const user = { user: { uid: 1 } };
            const picture = { user_id: 2 };

            window.history.pushState({}, '', '/');

            const {queryByText} = render(<MockAuthProvider user={user}>
                <Controls>
                    <MockControl picture={picture}></MockControl>
                </Controls>
            </MockAuthProvider>);

            expect(queryByText('Control')).not.toBeInTheDocument();

        })

    })
})
