import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createPicture,deletePicture, getUserPictures } from './userPictureActions';
import {  SET_PAGINATION_END,DELETE_PICTURE, SET_IS_FETCHING,SET_USER_PICTURES,USER_NEW_PICTURE } from '../types';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockService = (body, succeeds = true) => () => 
    new Promise((res,rej) => {
        setTimeout(()=> succeeds ? res(body) : rej(body), 10);
    });

describe('userPictureActions tests', ()=> {

    let store;

    beforeEach(()=>{
        store = mockStore({userPictures: []})
    })

    test('lanza una accion USER_NEW_PICTURE con el payload', async ()=>{
        const picture = {title: "title", picture:"data:image/png;base64", user_id:1, created_by:"test"};
        await store.dispatch(createPicture(picture, mockService({id:'123'})));

       // console.log(store.getActions());
        expect(store.getActions()[0]).toMatchObject({
            type: USER_NEW_PICTURE,
            payload: {...picture, id: "123"}
        });

    })

    test('lanza una accion SET_IS_FETCHING antes de enviar la peticion', async () => {
        
        await store.dispatch(getUserPictures(null, 2, 1, mockService({ docs: [] })));

        expect(store.getActions()[0]).toMatchObject({
            type: SET_IS_FETCHING,
            payload: true
        });
    })

    test('lanza una accion SET_PAGINATION_END cuando el backend no devuelve documentos', async () => {
        
        await store.dispatch(getUserPictures(null, 2, 1, mockService({ docs: [] })));

        expect(store.getActions()[1]).toMatchObject({
            type: SET_PAGINATION_END,
            payload: {
                paginationEnd: true,
                isFetching: false
            }
        });
    })


    test('lanza una accion SET_USER_PICTURES cuando el backend devuelve documentos', async () => {

        const docs = [{
            id: 1,
            data: function() {
                return {
                    picture: "mockpicture.png",
                    title: "foto de prueba",
                    created_at: 1234,
                    user_id: 1,
                    created_by: "test"
                }
            }
        }]
        
        await store.dispatch(getUserPictures(null, 2, 1, mockService({ docs })));

        expect(store.getActions()[1]).toMatchObject({
            type: SET_USER_PICTURES,
            payload: {
                data: [{ id: 1 }],
                lastDocument: docs[0],
                isFetching: false
            }
        });
    })


    test('lanza una accion SET_IS_FETCHING cuando la peticion falla', async () => {
        
        try {
            await store.dispatch(getUserPictures(null, 2, 1, mockService({}, false)));
        } catch (err) {

        }

        expect(store.getActions()[1]).toMatchObject({
            type: SET_IS_FETCHING,
            payload: false
        });
    })

    test('lanza una accion DELETE_PICTURE cuando se elimina una picture en el backend', async () => {

        const picture = { id: 1, title: "title", picture: "test.png", user_id: 1,  created_by: "test" };
        
        await store.dispatch(deletePicture(picture, mockService({})));

        expect(store.getActions()[0]).toMatchObject({
            type: DELETE_PICTURE,
            payload: picture.id
        });
    })

})


