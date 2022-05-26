import { render, fireEvent, waitFor } from "@testing-library/react"
import SignUp from "./SignUp"

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush
    })
}))

describe('Sign Up Page Test', ()=>{
    describe('Layout', ()=>{
        test('La pagina de registro tiene un input para el correo electronico', ()=>{
            const { container } = render(<SignUp></SignUp>);
            const emailInput = container.querySelector('#email');
            expect(emailInput).toBeInTheDocument();

        })
        test('La pagina de registro tiene un input para la contraseña', ()=>{
            const { container } = render(<SignUp></SignUp>);
            const passwordInput = container.querySelector('#password');
            expect(passwordInput).toBeInTheDocument();

        })

        test('La pagina de registro tiene un boton para enviar el formulario', ()=>{
            const { container } = render(<SignUp></SignUp>);
            const button = container.querySelector('#btn-register');
            expect(button).toBeInTheDocument();

        })

        test('La pagina de registro tiene un label para el correo electrónico', ()=>{
            const { queryByText } = render(<SignUp></SignUp>);
            const labelEmail = queryByText('Correo Electrónico');
            expect(labelEmail).toBeInTheDocument();

        })

        test('La pagina de registro tiene un label para la contraseña', ()=>{
            const { queryByText } = render(<SignUp></SignUp>);
            const labelPassword = queryByText('Contraseña');
            expect(labelPassword).toBeInTheDocument();

        })

        test('La pagina de registro tiene un titulo de crear cuenta', ()=>{
            const { container } = render(<SignUp></SignUp>);
            const title = container.querySelector("h3");
            expect(title.textContent).toBe("Crear Cuenta");

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

        let emailInput, passwordInput, signUpButton;

        const setupForSubmit = (emailVal = "test@gmail.com", passwordVal = "P4ssw0rd", signUpFunction) => {
            const rendered = render(<SignUp signUp={signUpFunction}></SignUp>)
            const {container} = rendered;

            emailInput = container.querySelector('#email');
            fireEvent.change(emailInput, changeEvent(emailVal));

            passwordInput = container.querySelector('#password');
            fireEvent.change(passwordInput, changeEvent(passwordVal));

            signUpButton = container.querySelector("#btn-register");

            return rendered;
        }

        test('el input del email tiene el valor del state', ()=>{
            const { container } = render(<SignUp></SignUp>);
            const emailInput = container.querySelector('#email');
            fireEvent.change(emailInput, changeEvent("prueba"));
            expect(emailInput).toHaveValue("prueba");
        })

        test('el input del password tiene el valor del state', ()=>{
            const { container } = render(<SignUp></SignUp>);
            const passwordInput = container.querySelector('#password');
            fireEvent.change(passwordInput, changeEvent("p4ssw0rd"));
            expect(passwordInput).toHaveValue("p4ssw0rd");
        })

        test("cuando se da el click en el boton de signup y el correo electronico es invalido debe mostrar el error de validacion", ()=>{
            const {queryByText} = setupForSubmit("");

            fireEvent.click(signUpButton);

            const error = queryByText("El correo electronico no es valido");
            expect(error).toBeInTheDocument();
        })

        test("cuando se da el click en el boton de signup y el password es invalido debe mostrar el error de validacion", ()=>{
            const {queryByText} = setupForSubmit("test@gmail.com","");

            fireEvent.click(signUpButton);

            const error = queryByText("La contraseña debe ser entre 6 y 30 caracteres");
            expect(error).toBeInTheDocument();
        })

        test("cuando se da el click en el boton de signup debe limpiar los errores de validacion", ()=>{
            const {queryByText} = setupForSubmit("test@gmail.com","");

            fireEvent.click(signUpButton);
            fireEvent.change(passwordInput, changeEvent("P4ssw0rd"));
            fireEvent.click(signUpButton);

            const error = queryByText("La contraseña debe ser entre 6 y 30 caracteres");
            expect(error).not.toBeInTheDocument();
        })

        test("cuando se da clic en el boton de sign up y el email y password son validos debe llamar la funcion signup", () => {
            const signUpFunction = jest.fn().mockResolvedValue({});
            
            setupForSubmit("test@gmail.com", "P4ssw0rd", signUpFunction);
            fireEvent.click(signUpButton);
            expect(signUpFunction).toHaveBeenCalledTimes(1);           
        })

        test("cuando se da clic en el boton de sign up y el email y password son validos debe llamar la funcion signup con el email y el password", async () => {
            const signUpFunction = jest.fn().mockResolvedValue({});
            
            setupForSubmit("test@gmail.com", "P4ssw0rd", signUpFunction);
            await waitFor(()=>{
                fireEvent.click(signUpButton);
            });
            expect(signUpFunction).toHaveBeenCalledWith("test@gmail.com", "P4ssw0rd");           
        })

        test("cuando se da clic en el boton de sign up y el password es incorrecto no debe llamar la funcion signup", async () => {
            const signUpFunction = jest.fn().mockResolvedValue({});
            
            setupForSubmit("test@gmail.com", "", signUpFunction);
            await waitFor(()=>{
                fireEvent.click(signUpButton);
            });
            expect(signUpFunction).toHaveBeenCalledTimes(0);           
        })

        test("cuando el backend retorna un error, se debe mostrar en pantalla", async () => {
            const signUpFunction = jest.fn().mockRejectedValue({
                message: "Validation error"
            });
            
            const{container}=setupForSubmit("emailrepetido@gmail.com", "p$ssw0rd", signUpFunction);
            
            await waitFor(()=>{
                fireEvent.click(signUpButton);
            });
            const error = container.querySelector('.alert');
            expect(error.textContent).toBe("Validation error");           
        })

        test("cuando existe un mensaje de error del backend y se envia la peticion de nuevo, se debe borrar el mensaje de error", async () => {
            const signUpFunction = jest.fn().mockImplementation(()=>{
                return new Promise((resolve, reject)=>{
                    setTimeout(()=> {
                        reject({})
                    },300);

                });
            });
            
            const{container}=setupForSubmit("emailrepetido@gmail.com", "p$ssw0rd", signUpFunction);
            
            await waitFor(()=>{
                fireEvent.click(signUpButton);
            });
            await waitFor(()=>{
                fireEvent.click(signUpButton);
            });
            const error = container.querySelector('.alert');
            expect(error).not.toBeInTheDocument();         
        })


        test("muestra el spinner cuando se esta enviando una peticion al backend", async () => {
            const signUpFunction = jest.fn().mockImplementation(()=>{
                return new Promise((resolve, reject)=>{
                    setTimeout(()=> {
                        resolve({})
                    },300);

                });
            });
            
            const{container}=setupForSubmit("emailrepetido@gmail.com", "p$ssw0rd", signUpFunction);
            
            await waitFor(()=>{
                fireEvent.click(signUpButton);
            });
           
            const spinner = container.querySelector('.spinner-border');

            expect(spinner).toBeInTheDocument();         
        })

        test("oculta el spinner cuando se envio una peticion y el backend retorno un error", async () => {
            const signUpFunction = jest.fn().mockRejectedValueOnce({
                message: "Validation error"
            });
            
            const{container}=setupForSubmit("emailrepetido@gmail.com", "p$ssw0rd", signUpFunction);
            
            await waitFor(()=>{
                fireEvent.click(signUpButton);
            });
           
            const spinner = container.querySelector('.spinner-border');

            expect(spinner).not.toBeInTheDocument();         
        })

        test("redirecciona el usuario a la pagina /user cuando se registra correctamente", async () => {
            const signUpFunction = jest.fn().mockResolvedValue();
            
            const{container}=setupForSubmit("emailrepetido@gmail.com", "p$ssw0rd", signUpFunction);
            
            await waitFor(()=>{
                fireEvent.click(signUpButton);
            });
           
            expect(mockHistoryPush).toHaveBeenCalledWith("/user");
            
        })
    })
})