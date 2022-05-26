import { render, fireEvent  } from "@testing-library/react"
import InputComponent from "./InputComponent"

describe('Input component tests', ()=>{
    describe('Layout', ()=>{
        test('Tiene el label', ()=> {
           const {container} = render(<InputComponent></InputComponent>);
           const label = container.querySelector('label');
           expect(label).toBeInTheDocument();
        })
        test('Tiene el input', ()=> {
            const {container} = render(<InputComponent></InputComponent>);
            const input = container.querySelector('input');
            expect(input).toBeInTheDocument();
         })
    })

    describe('Functionality', ()=>{
        test('la propiedad type es de tipo text por defecto', ()=>{
            const {container} = render(<InputComponent></InputComponent>);
            const input = container.querySelector('input');
            expect(input.type).toBe("text");

        })

        test('acepta la propiedad type', ()=>{
            const {container} = render(<InputComponent type="email"></InputComponent>);
            const input = container.querySelector('input');
            expect(input.type).toBe("email");

        })

        test('acepta la propiedad para label text', ()=>{
            const {container} = render(<InputComponent labelText="prueba"></InputComponent>);
            const label = container.querySelector('label');
            expect(label.textContent).toBe("prueba");

        })

        test('acepta la propiedad id', ()=>{
            const {container} = render(<InputComponent id="id-de-prueba"></InputComponent>);
            const input = container.querySelector('input');
            expect(input.id).toBe("id-de-prueba");

        })

        test('acepta la propiedad id', ()=>{
            const {container} = render(<InputComponent value="prueba" onChange={jest.fn()}></InputComponent>);
            const input = container.querySelector('input');
            expect(input.value).toBe("prueba");

        })

        test('acepta la propiedad para el callback onChange', ()=>{
            const onChangeCallback = jest.fn();
            const {container} = render(<InputComponent value="prueba" onChange={onChangeCallback}></InputComponent>);
            const input = container.querySelector('input');
            fireEvent.change(input, {
                target: {
                    value: "1234"
                }
            })
            expect(onChangeCallback).toHaveBeenCalledTimes(1);

        })
        test('acepta la propiedad error', ()=>{
            const {container} = render(<InputComponent error="Email incorrecto"></InputComponent>);
            const errorMessage= container.querySelector('.invalid-feedback');
            expect(errorMessage.textContent).toBe("Email incorrecto");

        })

        
    })
})