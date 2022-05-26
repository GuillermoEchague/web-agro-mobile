import { render, fireEvent  } from "@testing-library/react"
import InputFileComponent from "./InputFileComponent"

describe('Input file component tests', ()=>{
    describe('Layout', ()=>{
        test('Tiene el label', ()=> {
           const {container} = render(<InputFileComponent></InputFileComponent>);
           const label = container.querySelector('label');
           expect(label).toBeInTheDocument();
        })

        test ('el label tiene el icono', () => {
            const { container } = render(<InputFileComponent></InputFileComponent>);
            const icon = container.querySelector('label .picture-icon');
            expect(icon).toBeInTheDocument();            
        })


        test('Tiene el input', ()=> {
            const {container} = render(<InputFileComponent></InputFileComponent>);
            const input = container.querySelector('input');
            expect(input).toBeInTheDocument();
         })
         test('tiene el contenedor para hacer el preview de la foto', () => {
            const file = "data:image/png;base64"
            const { container } = render(<InputFileComponent file={file}>
                
            </InputFileComponent>)
            const previewPicture = container.querySelector('.photo-container');
            expect(previewPicture).toBeInTheDocument();
        })
    })

    describe('Functionality', ()=>{

        
        test('la propiedad type es de tipo text por defecto', ()=>{
            const {container} = render(<InputFileComponent></InputFileComponent>);
            const input = container.querySelector('input');
            expect(input.type).toBe("text");

        })

        test('acepta la propiedad type', ()=>{
            const {container} = render(<InputFileComponent type="email"></InputFileComponent>);
            const input = container.querySelector('input');
            expect(input.type).toBe("email");

        })

        test('acepta la propiedad para label text', ()=>{
            const {container} = render(<InputFileComponent labelText="prueba"></InputFileComponent>);
            const label = container.querySelector('label');
            expect(label.textContent.trim()).toBe("prueba");

        })

        test('acepta la propiedad id', ()=>{
            const {container} = render(<InputFileComponent id="id-de-prueba"></InputFileComponent>);
            const input = container.querySelector('input');
            expect(input.id).toBe("id-de-prueba");

        })

        test('acepta la propiedad id', ()=>{
            const {container} = render(<InputFileComponent value="prueba" onChange={jest.fn()}></InputFileComponent>);
            const input = container.querySelector('input');
            expect(input.value).toBe("prueba");

        })

        test('acepta la propiedad para el callback onChange', ()=>{
            const onChangeCallback = jest.fn();
            const {container} = render(<InputFileComponent value="prueba" onChange={onChangeCallback}></InputFileComponent>);
            const input = container.querySelector('input');
            fireEvent.change(input, {
                target: {
                    value: "1234"
                }
            })
            expect(onChangeCallback).toHaveBeenCalledTimes(1);

        })
        test('acepta la propiedad error', ()=>{
            const {container} = render(<InputFileComponent error="Email incorrecto"></InputFileComponent>);
            const errorMessage= container.querySelector('.invalid-feedback');
            expect(errorMessage.textContent).toBe("Email incorrecto");

        })

        test('acepta la propiedad accept', ()=>{
            const {container} = render(<InputFileComponent accept="image/png"></InputFileComponent>);
            const input= container.querySelector('input');
            expect(input.getAttribute('accept')).toBe("image/png");

        })

        test('acepta la propiedad file', () => {
            const file = "data:image/png;base64"
            const { container } = render(<InputFileComponent file={file}></InputFileComponent>);
            const image = container.querySelector('.photo-container img');
            expect(image.getAttribute('src')).toBe(file);
        })

       
    })
})