import userPictureReducer from "./userPictureReducer";
import { CLEAR_PICTURES, DELETE_PICTURE, SET_IS_FETCHING, SET_PAGINATION_END, SET_USER_PICTURES, USER_NEW_PICTURE } from "../types";

const initialState = {
    pictures: [],
    pagination: { lastDocument: null, limit: 2 },
    paginationEnd: false,
    isFetching: false
}

describe('userPicturesReducer tests', () => {
    test('cuando se llama el userPicturesReducer con el type USER_NEW_PICTURE se debe insertar la picture al principio del arreglo', ()=>{

        const picture = {title: "title", picture:"data:image/png;base64", user_id:1, id:1, created_by:"test"};
    
        expect(
            userPictureReducer(initialState, {type: USER_NEW_PICTURE, payload: picture })
        ).toEqual({
            ...initialState,
            pictures: [picture, ...initialState.pictures]
        });
    
    })


    // test('cuando se llama el userPicturesReducer con el type SET_USER_PICTURES se deben setear las pictures', () => {

    //     const pictures = [
    //         { title: "title", picture: "test.png", user_id: 1, id: 1, created_by: "test" },
    //         { title: "title", picture: "test.png", user_id: 1, id: 2, created_by: "test" }
    //     ]
        
    //     expect(
    //         userPicturesReducer(initialState, { type: SET_USER_PICTURES, payload: { data: pictures, isFetching: false, lastDocument: null } })
    //     ).toEqual({
    //         ...initialState,
    //         pictures: pictures
    //     });
    
    // })

    // test('cuando se llama el userPicturesReducer con el type SET_USER_PICTURES se deben setear las pictures, y eliminar las pictures repetidas', () => {

    //     const picture = { title: "title", picture: "test.png", user_id: 1, id: 1, created_by: "test" };

    //     initialState.pictures.push(picture);

    //     const pictures = [
    //         { title: "title", picture: "test.png", user_id: 1, id: 1, created_by: "test" },
    //         { title: "title", picture: "test.png", user_id: 1, id: 2, created_by: "test" }
    //     ]
        
    //     expect(
    //         userPicturesReducer(initialState, { type: SET_USER_PICTURES, payload: { data: pictures, isFetching: false, lastDocument: null } })
    //     ).toEqual({
    //         ...initialState,
    //         pictures: pictures
    //     });
    
    // })

    // test('cuando se llama el userPicturesReducer con el type SET_IS_FETCHING se debe setear isFetching', () => {

    //     expect(
    //         userPicturesReducer(initialState, { type: SET_IS_FETCHING, payload: true })
    //     ).toEqual({
    //         ...initialState,
    //         isFetching: true
    //     });
    
    // })

    // test('cuando se llama el userPicturesReducer con el type SET_PAGINATION_END se debe setear paginationEnd', () => {

    //     expect(
    //         userPicturesReducer(initialState, { type: SET_PAGINATION_END, payload: { paginationEnd: true, isFetching: false } })
    //     ).toEqual({
    //         ...initialState,
    //         paginationEnd: true
    //     });
    
    // })

    // test('cuando se llama el userPicturesReducer con el type DELETE_PICTURE se debe eliminar la picture del array de pictures', () => {

    //     const picture = { title: "title", picture: "test.png", user_id: 1, id: 1, created_by: "test" };

    //     initialState.pictures.push(picture);

    //     expect(
    //         userPicturesReducer(initialState, { type: DELETE_PICTURE, payload: picture.id })
    //     ).toEqual({
    //         ...initialState,
    //         pictures: []
    //     });
    
    // })

    // test('cuando se llama el userPicturesReducer con el type CLEAR_PICTURES debe reiniciar el state para el reducer', () => {

    //     const picture = { title: "title", picture: "test.png", user_id: 1, id: 1, created_by: "test" };

    //     initialState.pictures.push(picture);

    //     expect(
    //         userPicturesReducer(initialState, { type: CLEAR_PICTURES })
    //     ).toEqual({
    //         ...initialState,
    //         pictures: []
    //     });
    
    // })

  
})