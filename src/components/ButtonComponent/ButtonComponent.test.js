import {render, fireEvent} from "@testing-library/react"
import ButtonComponent from "./ButtonComponent"


describe('Button component test', ()=>{
    describe('Layout', ()=>{
        test('tiene el boton', ()=>{
            const {container} = render(<ButtonComponent></ButtonComponent>)
            const button = container.querySelector('button');
            expect(button).toBeInTheDocument();
        })

        test('tiene el spinner', ()=>{
            const {container} = render(<ButtonComponent loading={true}></ButtonComponent>)
            const spinner = container.querySelector('.spinner-border');
            expect(spinner).toBeInTheDocument();
        })
    })

    describe('Functionality', ()=>{

        test('recive el id por parametro', ()=>{
            const {container} = render(<ButtonComponent id="btn"></ButtonComponent>)
            const button = container.querySelector('button');
            expect(button.id).toBe('btn');
        })

        test('recive el texto del boton por parametro', ()=>{
            const {container} = render(<ButtonComponent text="enviar"></ButtonComponent>)
            const button = container.querySelector('button');
            expect(button.textContent).toBe('enviar');
        })

        test('recive el color del boton por parametro', ()=>{
            const {container} = render(<ButtonComponent color="danger"></ButtonComponent>)
            const button = container.querySelector('button');
            expect(button.classList.toString()).toContain('danger');
        })

        test('recive el estado loading por parametro', ()=>{
            const {container} = render(<ButtonComponent loading={true}></ButtonComponent>)
            const spinner = container.querySelector('.spinner-border');
            expect(spinner).toBeInTheDocument();
        })

        test('recive el type del boton por parametro', ()=>{
            const {container} = render(<ButtonComponent type="submit"></ButtonComponent>)
            const button = container.querySelector('button');
            expect(button.type).toBe("submit");
        })

        test('recive la función del callback onClick por parametro', ()=>{
            const onClickFunction = jest.fn();
            const {container} = render(<ButtonComponent onClick={onClickFunction}></ButtonComponent>)
            const button = container.querySelector('button');
            fireEvent.click(button);
            expect(onClickFunction).toHaveBeenCalledTimes(1);
        })

        test('el type del boton es button por defecto', ()=>{
            const {container} = render(<ButtonComponent></ButtonComponent>)
            const button = container.querySelector('button');
            expect(button.type).toBe("button");
        })

        test('el color del boton es primary por defecto', ()=>{
            const {container} = render(<ButtonComponent></ButtonComponent>)
            const button = container.querySelector('button');
            expect(button.classList.toString()).toContain('primary');
        })
    })

})