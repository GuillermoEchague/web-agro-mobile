import { render, waitFor, fireEvent } from "@testing-library/react"
import { AuthContext } from "../../context/AuthContext"

import { User } from "../User/User"

const MockAuthProvider = ({user, children}) =>{
    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

describe('User page tests', () => {
    
    describe('Functionality', () => {
        
        const setup = (actions, pictures, pagination, paginationEnd, isFetching) => {
            
            const user = { user: { uid: 1234 } };

            return render(
                <MockAuthProvider user={user}>
                    <User 
                        actions={actions} 
                        pictures={pictures} 
                        pagination={pagination} 
                        paginationEnd={paginationEnd} 
                        isFetching={isFetching}
                    />
                </MockAuthProvider>
            );
        }

        test('cuando se monta el componente llama la accion getUserPictures', () => {
            const actions = {
                getUserPictures: jest.fn().mockReturnValue({})
            }

            setup(actions, [], [], false, false);

            expect(actions.getUserPictures).toHaveBeenCalledTimes(1);
        })

        test('muestra el spinner cuando se esta llamando la accion getUserPictures', () => {
            const actions = {
                getUserPictures: jest.fn().mockReturnValue({})
            }

            const { container } = setup(actions, [], [], false, true);            

            expect(container.querySelector('.spinner-border')).toBeInTheDocument();
        })

        test('oculta el spinner cuando no se esta llamando la accion getUserPictures', () => {
            const actions = {
                getUserPictures: jest.fn().mockReturnValue({})
            }

            const { container } = setup(actions, [], [], false, false);            

            expect(container.querySelector('.spinner-border')).not.toBeInTheDocument();
        })

        test('vuelve a llamar la funcion getUserPictures cuando se llega al final documento', async () => {
            const actions = {
                getUserPictures: jest.fn().mockReturnValue({})
            }

            setup(actions, [], [], false, false);       
            
            await waitFor(() => {
                fireEvent.scroll(window, { target: { scrollY: 30000 } });
            })

            expect(actions.getUserPictures).toHaveBeenCalledTimes(2);
        })

        test('no llama la funcion getUserPictures cuando ya no hay mas pictures', async () => {
            const actions = {
                getUserPictures: jest.fn().mockReturnValue({})
            }

            setup(actions, [], [], true, false);       
            
            await waitFor(() => {
                fireEvent.scroll(window, { target: { scrollY: 30000 } });
            })

            expect(actions.getUserPictures).toHaveBeenCalledTimes(1);
        })


        test('no llama la funcion getUserPictures cuando hay una peticion en proceso', async () => {
            const actions = {
                getUserPictures: jest.fn().mockReturnValue({})
            }

            setup(actions, [], [], false, true);       
            
            await waitFor(() => {
                fireEvent.scroll(window, { target: { scrollY: 30000 } });
            })

            expect(actions.getUserPictures).toHaveBeenCalledTimes(1);
        })


    })
    

})
