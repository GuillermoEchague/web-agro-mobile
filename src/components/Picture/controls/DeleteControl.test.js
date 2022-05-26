import { render, fireEvent } from "@testing-library/react"
import {DeleteControl} from "./DeleteControl"

describe('DeleteControl tests', () => {

    describe('Layout', () => {
        test('tiene el elemento para borrar una picture', () => {
            const { container} = render(<DeleteControl></DeleteControl>);

            const button = container.querySelector('.delete-control');

            expect(button).toBeInTheDocument();
        })        
    })

    describe('Functionality', () => {
        test('muestra la ventana de confirmacion cuando el usuario da clic en el button', () => {
            const { container, queryByText } = render(<DeleteControl></DeleteControl>);

            const button = container.querySelector('.delete-control');

            fireEvent.click(button);

            const confirmAlert = queryByText("Estas segur@ que quieres eliminar esta foto?");

            expect(confirmAlert).toBeInTheDocument();
        })

        test('cuando el usuario da clic en la opcion si, se debe llamar la accion para eliminar la picture', () => {
            const actions = { deletePicture: jest.fn() };

            const { container, queryByText } = render(<DeleteControl actions={actions}></DeleteControl>);

            const button = container.querySelector('.delete-control');

            fireEvent.click(button);

            const confirmYesButton = queryByText("Si");

            fireEvent.click(confirmYesButton);

            expect(actions.deletePicture).toHaveBeenCalledTimes(1);
        })

        test('se llama la action con la picture que recibe el componente por parametro', () => {
            const actions = { deletePicture: jest.fn() };

            const picture = { id: 1 };

            const { container, queryByText } = render(<DeleteControl actions={actions} picture={picture}></DeleteControl>);

            const button = container.querySelector('.delete-control');

            fireEvent.click(button);

            const confirmYesButton = queryByText("Si");

            fireEvent.click(confirmYesButton);

            expect(actions.deletePicture).toHaveBeenCalledWith(picture);
        })

        test('cuando el usuario da clic en la opcion no, no se debe llamar la accion para eliminar la picture', () => {
            const actions = { deletePicture: jest.fn() };

            const { container, queryByText } = render(<DeleteControl actions={actions}></DeleteControl>);

            const button = container.querySelector('.delete-control');

            fireEvent.click(button);

            const confirmNoButton = queryByText("No");

            fireEvent.click(confirmNoButton);

            expect(actions.deletePicture).not.toHaveBeenCalled();
        })
    })
    
})
