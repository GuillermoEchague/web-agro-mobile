import { render, fireEvent, waitFor } from "@testing-library/react"
import SignIn from "./SignIn"

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush
    })
}))

describe('sign in Page Test', ()=>{
    describe('Layout', ()=>{
        test('La pagina del login tiene un input para el correo electronico', ()=>{
            const { container } = render(<SignIn></SignIn>);
            const emailInput = container.querySelector('#email');
            expect(emailInput).toBeInTheDocument();

        })
        test('La pagina del login tiene un input para la contraseña', ()=>{
            const { container } = render(<SignIn></SignIn>);
            const passwordInput = container.querySelector('#password');
            expect(passwordInput).toBeInTheDocument();

        })

        test('La pagina del login tiene un boton para enviar el formulario', ()=>{
            const { container } = render(<SignIn></SignIn>);
            const button = container.querySelector('#btn-login');
            expect(button).toBeInTheDocument();

        })

        test('La pagina del login tiene un label para el correo electrónico', ()=>{
            const { queryByText } = render(<SignIn></SignIn>);
            const labelEmail = queryByText('Correo Electrónico');
            expect(labelEmail).toBeInTheDocument();

        })

        test('La pagina del login tiene un label para la contraseña', ()=>{
            const { queryByText } = render(<SignIn></SignIn>);
            const labelPassword = queryByText('Contraseña');
            expect(labelPassword).toBeInTheDocument();

        })

        test('La pagina del login tiene un titulo de Iniciar Sesión', ()=>{
            const { container } = render(<SignIn></SignIn>);
            const title = container.querySelector("h3");
            expect(title.textContent).toBe("Iniciar Sesión");

        })
    })

    describe('Funcionality',()=>{

        const changeEvent = (value)=>{
            return {
                target:{
                    value
                }
            }
        }

        let emailInput, passwordInput, signInButton;

        const setupForSubmit = (emailVal = "test@gmail.com", passwordVal = "P4ssw0rd", signInFunction) => {
            const rendered = render(<SignIn signIn={signInFunction}></SignIn>)
            const {container} = rendered;

            emailInput = container.querySelector('#email');
            fireEvent.change(emailInput, changeEvent(emailVal));

            passwordInput = container.querySelector('#password');
            fireEvent.change(passwordInput, changeEvent(passwordVal));

            signInButton = container.querySelector("#btn-login");

            return rendered;
        }

        test('el input del email tiene el valor del state', ()=>{
            const { container } = render(<SignIn></SignIn>);
            const emailInput = container.querySelector('#email');
            fireEvent.change(emailInput, changeEvent("prueba"));
            expect(emailInput).toHaveValue("prueba");
        })

        test('el input del password tiene el valor del state', ()=>{
            const { container } = render(<SignIn></SignIn>);
            const passwordInput = container.querySelector('#password');
            fireEvent.change(passwordInput, changeEvent("p4ssw0rd"));
            expect(passwordInput).toHaveValue("p4ssw0rd");
        })

        test("cuando se da el click en el boton de signin y el correo electronico es invalido debe mostrar el error de validacion", ()=>{
            const {queryByText} = setupForSubmit("");

            fireEvent.click(signInButton);

            const error = queryByText("El correo electronico no es valido");
            expect(error).toBeInTheDocument();
        })

        test("cuando se da el click en el boton de signin y el password es invalido debe mostrar el error de validacion", ()=>{
            const {queryByText} = setupForSubmit("test@gmail.com","");

            fireEvent.click(signInButton);

            const error = queryByText("La contraseña debe ser entre 6 y 30 caracteres");
            expect(error).toBeInTheDocument();
        })

        test("cuando se da el click en el boton de signin debe limpiar los errores de validacion", ()=>{
            const {queryByText} = setupForSubmit("test@gmail.com","");

            fireEvent.click(signInButton);
            fireEvent.change(passwordInput, changeEvent("P4ssw0rd"));
            fireEvent.click(signInButton);

            const error = queryByText("La contraseña debe ser entre 6 y 30 caracteres");
            expect(error).not.toBeInTheDocument();
        })

        test("cuando se da clic en el boton de sign in y el email y password son validos debe llamar la funcion signin", () => {
            const signInFunction = jest.fn().mockResolvedValue({});
            
            setupForSubmit("test@gmail.com", "P4ssw0rd", signInFunction);
            fireEvent.click(signInButton);
            expect(signInFunction).toHaveBeenCalledTimes(1);           
        })

        test("cuando se da clic en el boton de sign in y el email y password son validos debe llamar la funcion signin con el email y el password", async () => {
            const signInFunction = jest.fn().mockResolvedValue({});
            
            setupForSubmit("test@gmail.com", "P4ssw0rd", signInFunction);
            await waitFor(()=>{
                fireEvent.click(signInButton);
            });
            expect(signInFunction).toHaveBeenCalledWith("test@gmail.com", "P4ssw0rd");           
        })

        test("cuando se da clic en el boton de sign in y el password es incorrecto no debe llamar la funcion signin", async () => {
            const signInFunction = jest.fn().mockResolvedValue({});
            
            setupForSubmit("test@gmail.com", "", signInFunction);
            await waitFor(()=>{
                fireEvent.click(signInButton);
            });
            expect(signInFunction).toHaveBeenCalledTimes(0);           
        })

        test("cuando el backend retorna un error, se debe mostrar en pantalla", async () => {
            const signInFunction = jest.fn().mockRejectedValue({
                message: "Validation error"
            });
            
            const{container}=setupForSubmit("emailrepetido@gmail.com", "p$ssw0rd", signInFunction);
            
            await waitFor(()=>{
                fireEvent.click(signInButton);
            });
            const error = container.querySelector('.alert');
            expect(error.textContent).toBe("Validation error");           
        })

        test("cuando existe un mensaje de error del backend y se envia la peticion de nuevo, se debe borrar el mensaje de error", async () => {
            const signInFunction = jest.fn().mockImplementation(()=>{
                return new Promise((resolve, reject)=>{
                    setTimeout(()=> {
                        reject({})
                    },300);

                });
            });
            
            const{container}=setupForSubmit("emailrepetido@gmail.com", "p$ssw0rd", signInFunction);
            
            await waitFor(()=>{
                fireEvent.click(signInButton);
            });
            await waitFor(()=>{
                fireEvent.click(signInButton);
            });
            const error = container.querySelector('.alert');
            expect(error).not.toBeInTheDocument();         
        })


        test("muestra el spinner cuando se esta enviando una peticion al backend", async () => {
            const signInFunction = jest.fn().mockImplementation(()=>{
                return new Promise((resolve, reject)=>{
                    setTimeout(()=> {
                        resolve({})
                    },300);

                });
            });
            
            const{container}=setupForSubmit("emailrepetido@gmail.com", "p$ssw0rd", signInFunction);
            
            await waitFor(()=>{
                fireEvent.click(signInButton);
            });
           
            const spinner = container.querySelector('.spinner-border');

            expect(spinner).toBeInTheDocument();         
        })

        test("oculta el spinner cuando se envio una peticion y el backend retorno un error", async () => {
            const signInFunction = jest.fn().mockRejectedValueOnce({
                message: "Validation error"
            });
            
            const{container}=setupForSubmit("emailrepetido@gmail.com", "p$ssw0rd", signInFunction);
            
            await waitFor(()=>{
                fireEvent.click(signInButton);
            });
           
            const spinner = container.querySelector('.spinner-border');

            expect(spinner).not.toBeInTheDocument();         
        })

        test("redirecciona el usuario a la pagina /user cuando inicia sesion correctamente", async () => {
            const signInFunction = jest.fn().mockResolvedValue();
            
           setupForSubmit("emailrepetido@gmail.com", "p$ssw0rd", signInFunction);
            
            await waitFor(()=>{
                fireEvent.click(signInButton);
            });
           
            expect(mockHistoryPush).toHaveBeenCalledWith("/user");
            
        })
    })
})