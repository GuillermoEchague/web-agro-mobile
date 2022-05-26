import { fireEvent, render, waitFor } from "@testing-library/react"
import {SharePicture} from "./SharePicture"
import flushPromises from "flush-promises";
import { AuthContext } from "../../context/AuthContext";


const MockAuthProvider = ({ user, children }) => {
    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

const mockAsyncDelayed = (succeed = true) => {
    return jest.fn().mockImplementation(() => {
        return new Promise((res, rej) => {
            setTimeout(() => succeed ? res({}) : rej({}), 300)
        })
    })
}

describe('SharePicture test', () => {
    describe('Layout', () => {
        test('tiene el titulo', () => {
            const { container } = render(<SharePicture></SharePicture>)
            const title = container.querySelector('h2');
            expect(title.textContent).toBe('SUBIR IMAGEN');
        })

        test('tiene el label para el titulo', () => {
            const { queryByText } = render(<SharePicture></SharePicture>)
            const labelTitle = queryByText('Titulo');
            expect(labelTitle).toBeInTheDocument();
        })

        test('tiene el label para el titulo', () => {
            const { container } = render(<SharePicture></SharePicture>)
            const inputTitle = container.querySelector('#title');
            expect(inputTitle).toBeInTheDocument();
        })

        test('tiene el label para la foto', () => {
            const { queryByText } = render(<SharePicture></SharePicture>)
            const labelPicture = queryByText('Seleccione la imagen a analizar');
            expect(labelPicture).toBeInTheDocument();
        })

        test('tiene el label para la foto', () => {
            const { container } = render(<SharePicture></SharePicture>)
            const inputPicture = container.querySelector('#picture');
            expect(inputPicture).toBeInTheDocument();
        })

       

        test('tiene el boton para enviar el formulario', () => {
            const { container } = render(<SharePicture></SharePicture>)
            const button = container.querySelector('#btn-share');
            expect(button).toBeInTheDocument();
        })
    })

    describe('Functionality', () => {

        const mockFile = (type = "image/png", size = 1) => {
            const file = new File(["dummy content"], "example." + type, {
                type: type
            });
            Object.defineProperty(file, "size", { value: 1024 * 1024 * size });
           
            return file;
        }



        test('no lanza una excepcion cuando se selecciona la imagen', () => {
            const { container } = render(<SharePicture></SharePicture>)

            const inputPicture = container.querySelector('#picture');

            expect(() => fireEvent.change(inputPicture, { target: { files: [] } })
            ).not.toThrow();

        })

        test('muestra el mensaje de error de la imagen cuando el formato de la imagen es invalido', async () => {
            const { queryByText, container } = render(<SharePicture></SharePicture>)

            const inputPicture = container.querySelector('#picture');

            const file = mockFile("text/plain");

            await waitFor(() => {
                fireEvent.change(inputPicture, { target: { files: [file] } });
            })
            const errorMessage = queryByText("La foto debe ser png o jpg");
            expect(errorMessage).toBeInTheDocument();

        })
        test('muestra el mensaje de error de la imagen cuando el peso de la imagen es invalido', async () => {
            const { queryByText, container } = render(<SharePicture></SharePicture>)

            const inputPicture = container.querySelector('#picture');

            const file = mockFile("image/png", 3);

            await waitFor(() => {
                fireEvent.change(inputPicture, { target: { files: [file] } });
            })
            const errorMessage = queryByText("El tamaño no puede superar los 2MB");
            expect(errorMessage).toBeInTheDocument();

        })

        test('muestra el mensaje de error de la imagen cuando la resolucion de la imagen es invalido', async () => {
            const { queryByText, container } = render(<SharePicture></SharePicture>)

            const inputPicture = container.querySelector('#picture');

            const file = mockFile();

            await waitFor(() => {
                fireEvent.change(inputPicture, { target: { files: [file] } });
            })

            await waitFor(() => {
               const img = container.querySelector('.photo-container img');
               fireEvent.load(img, {target: img})
            })
            const errorMessage = queryByText("La foto debe ser al menos de 1024 pixeles de ancho");
            expect(errorMessage).toBeInTheDocument();

        })


        test('muestra el mensaje de error del titulo cuando el titulo es invalido', async () => {
            const { queryByText, container } = render(<SharePicture></SharePicture>)

            await waitFor(() => {
              const button = container.querySelector('#btn-share');
              fireEvent.click(button);
            })
            const errorMessage = queryByText("El titulo debe ser entre 6 y 100 caracteres");
            expect(errorMessage).toBeInTheDocument();

        })

        test('muestra el mensaje de error del titulo cuando el titulo es menor a 6 caracteres', async () => {
            const { queryByText, container } = render(<SharePicture></SharePicture>)

            const titleInput = container.querySelector('#title');

            fireEvent.change(titleInput, {
                target: {
                    value:"12345"
                }
            });

            await waitFor(() => {
              const button = container.querySelector('#btn-share');
              fireEvent.click(button);
            })
            const errorMessage = queryByText("El titulo debe ser entre 6 y 100 caracteres");
            expect(errorMessage).toBeInTheDocument();

        })

        test('muestra el mensaje de error del titulo cuando el titulo es mayor a 100 caracteres', async () => {
            const { queryByText, container } = render(<SharePicture></SharePicture>)

            const titleInput = container.querySelector('#title');

            fireEvent.change(titleInput, {
                target: {
                    value:"a".repeat(101)
                }
            });

            await waitFor(() => {
              const button = container.querySelector('#btn-share');
              fireEvent.click(button);
            })
            const errorMessage = queryByText("El titulo debe ser entre 6 y 100 caracteres");
            expect(errorMessage).toBeInTheDocument();

        })

        test('muestra el mensaje de error de la imagen cuando no se envio la imagen', async () => {
            const { queryByText, container } = render(<SharePicture></SharePicture>)

            await waitFor(() => {
              const button = container.querySelector('#btn-share');
              fireEvent.click(button);
            })
            const errorMessage = queryByText("La foto es obligatoria");
            expect(errorMessage).toBeInTheDocument();

        })


        test('preserva los errores de validacion de la imagen', async () => {
            const { queryByText, container } = render(<SharePicture></SharePicture>)

            const inputPicture = container.querySelector('#picture');

            const file = mockFile("text/plain");

            await waitFor(() => {
                fireEvent.change(inputPicture, { target: { files: [file] } });
            })

            await waitFor(() => {
                const button = container.querySelector('#btn-share');
                fireEvent.click(button);
            })
            const errorMessage = queryByText("La foto debe ser png o jpg");
            expect(errorMessage).toBeInTheDocument();

        })
        
        test('muestra la imagen seleccionada en el preview container', async () => {
            const { queryByText, container } = render(<SharePicture></SharePicture>)

            const inputPicture = container.querySelector('#picture');

            const file = mockFile();

            await waitFor(async() => {
                fireEvent.change(inputPicture, { target: { files: [file] } });
                await flushPromises();
            })

            const image = container.querySelector('.photo-container img');
            expect(image.src).toContain('data:image/png;base64');

        })

        test('no llama la accion cuando el titulo es incorrecto', async()=>{
            const actions = {
                createPicture: jest.fn().mockResolvedValue({})
            };
            const { container } = render(<SharePicture actions={actions}></SharePicture>);
            const inputPicture = container.querySelector('#picture');
            const file = mockFile();

            await waitFor(async() => {
                fireEvent.change(inputPicture, { target: { files: [file] } });
                await flushPromises();
            });

            await waitFor(() => {
                const button = container.querySelector('#btn-share');
                fireEvent.click(button);
            })
            expect(actions.createPicture).toHaveBeenCalledTimes(0);
            
        })

        test ('no llama la accion cuando el titulo es incorrecto', async () => {
            const actions = {
                createPicture: jest.fn().mockResolvedValue({})
            };
            const { container } = render(<SharePicture actions={actions}></SharePicture>);
            const inputPicture = container.querySelector('#picture');
            const file = mockFile();
            await waitFor(async () => {
                fireEvent.change(inputPicture, { target: { files: [file] } });
                await flushPromises();
            });
            await waitFor(() => {
                const button = container.querySelector('#btn-share');
                fireEvent.click(button);
            })
            expect(actions.createPicture).toHaveBeenCalledTimes(0);

        })

        test ('no llama la accion cuando la foto es incorrecta', async () => {
            const actions = {
                createPicture: jest.fn().mockResolvedValue({})
            };
            const { container } = render(<SharePicture actions={actions}></SharePicture>);
            const titleInput = container.querySelector('#title');
            fireEvent.change(titleInput, {
                target: {
                    value: "1234567"
                }
            });
            await waitFor(() => {
                const button = container.querySelector('#btn-share');
                fireEvent.click(button);
            })
            expect(actions.createPicture).toHaveBeenCalledTimes(0);

        })

        test ('debe limpiar los errores de validacion cada vez que se envie la peticion', async () => {
            const actions = {
                createPicture: jest.fn().mockResolvedValue({})
            };

            const { container, queryByText } = render(<SharePicture actions={actions}></SharePicture>);
            const button = container.querySelector('#btn-share');
            await waitFor(() => {
                fireEvent.click(button);
            })
            const titleInput = container.querySelector('#title');
            fireEvent.change(titleInput, {
                target: {
                    value: "1234567"
                }
            });
            await waitFor(() => {
                fireEvent.click(button);
            })
            const errorMessage = queryByText("El titulo debe ser entre 6 y 100 caracteres");
            expect(errorMessage).not.toBeInTheDocument();

        })

        const setupForSubmit = async (action) => {
            const user = {
                user: { uid: 1, email: "test@gmail.com" }
            }
            const actions = {
                createPicture: action
            }
            const { container } = render(
                <MockAuthProvider user={user}>
                    <SharePicture actions={actions}></SharePicture>
                </MockAuthProvider>
            )
            const titleInput = container.querySelector('#title');
            fireEvent.change(titleInput, {
                target: {
                    value: "1234567"
                }
            });

            const inputPicture = container.querySelector('#picture');
            const file = mockFile();
            await waitFor(async () => {
                fireEvent.change(inputPicture, { target: { files: [file] } });
                await flushPromises();

            });

            return container;
        }


        test('llama la accion cuando el titulo y la imagen son validos', async () => {
            const createPicture = jest.fn().mockResolvedValue({});
            const container = await setupForSubmit(createPicture);
            const button = container.querySelector('#btn-share');
            await waitFor(()=> {
                fireEvent.click(button);
            })
            expect(createPicture).toHaveBeenCalledTimes(1);
        })


        test('muestra el spinner cuando la peticion esta siendo procesada', async () => {
            const createPicture = mockAsyncDelayed();
            const container = await setupForSubmit(createPicture);
            const button = container.querySelector('#btn-share');
            await waitFor(()=> {
                fireEvent.click(button);
            })

            const spinner = container.querySelector('.spinner-border');
            expect(spinner).toBeInTheDocument();
        })

        test('oculta el spinner despues que la peticion ha finalizado', async () => {
            const createPicture = jest.fn().mockResolvedValue({});
            const container = await setupForSubmit(createPicture);
            const button = container.querySelector('#btn-share');
            await waitFor(()=> {
                fireEvent.click(button);
            })
            const spinner = container.querySelector('.spinner-border');
            expect(spinner).not.toBeInTheDocument();
        })
        
        test('resetea el campo del titulo despues de procesar la peticion correctamente', async () => {
            const createPicture = jest.fn().mockResolvedValue({});
            const container = await setupForSubmit(createPicture);
            const button = container.querySelector('#btn-share');
            await waitFor(()=> {
                fireEvent.click(button);
            })
            const titleInput = container.querySelector('#title');
            expect(titleInput.value).toBe("");
        })

        test('resetea el campo de la imagen despues de procesar la peticion correctamente', async () => {
            const createPicture = jest.fn().mockResolvedValue({});
            const container = await setupForSubmit(createPicture);
            const button = container.querySelector('#btn-share');
            await waitFor(()=> {
                fireEvent.click(button);
            })
            const inputPicture = container.querySelector('#picture');
            expect(inputPicture.value).toBe("");
        })

        test('oculta el spinner despues que la peticion ha finalizado con error', async () => {
            const createPicture = jest.fn().mockRejectedValue({});
            const container = await setupForSubmit(createPicture);
            const button = container.querySelector('#btn-share');
            await waitFor(()=> {
                fireEvent.click(button);
            })
            const spinner = container.querySelector('.spinner-border');
            expect(spinner).not.toBeInTheDocument();
        })

        test('muestra el error del backend cuando la peticion ha finalizado con error', async () => {
            const createPicture = jest.fn().mockRejectedValue({
                message: "Validation error"
            });
            const container = await setupForSubmit(createPicture);
            const button = container.querySelector('#btn-share');
            await waitFor(()=> {
                fireEvent.click(button);
            })
            const backendError = container.querySelector('.alert');
            expect(backendError.textContent).toBe("Validation error");
        })

        test('resetea el error del backend cuando la peticion ha finalizado correctamente', async () => {
            const createPicture = jest.fn().mockRejectedValueOnce({
                message: "Validation error"
            });
            const container = await setupForSubmit(createPicture);
            const button = container.querySelector('#btn-share');
            await waitFor(()=> {
                fireEvent.click(button);
            })
            await waitFor(()=> {
                fireEvent.click(button);
            })
            const backendError = container.querySelector('.alert');
            expect(backendError).not.toBeInTheDocument();
        })


        
    })
})