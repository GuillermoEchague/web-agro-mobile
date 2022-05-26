import { createPictureService, deletePictureService, getUserPicturesService } from "../../firebase/services/pictureService";
import { DELETE_PICTURE, SET_IS_FETCHING, SET_PAGINATION_END, SET_USER_PICTURES, USER_NEW_PICTURE } from "../types";

export const createPicture = (picture, service = createPictureService) => dispatch => {
    return new Promise((resolve,reject) => {
        service(picture)
        .then(inserted =>{
            picture['id'] = inserted.id;
            dispatch({
                type: USER_NEW_PICTURE,
                payload: picture
            })
            resolve(picture);
        })
        .catch(error => reject(error));
    })
}


export const deletePicture = (picture, service = deletePictureService) => dispatch => {
    return new Promise((resolve,reject) => {
        service(picture)
        .then(removed =>{
            dispatch({type: DELETE_PICTURE, payload: picture.id})
            resolve(removed)
           
        })
        .catch(error => reject(error));
    })
}


export const getUserPictures = (lastDocument, limit, userId, service = getUserPicturesService) => dispatch => {
    return new Promise((resolve,reject) => {
        dispatch({type: SET_IS_FETCHING, payload: true})
        service(lastDocument, limit, userId)
        .then((res) =>{
            if(res.docs.length === 0) {
                dispatch({
                    type: SET_PAGINATION_END,
                    payload: {paginationEnd: true, isFetching: false}

                })
                resolve(res);
            } else {
                const data = res.docs.map(doc => {
                    return {id: doc.id, ...doc.data()}
                })

                dispatch ({
                    type: SET_USER_PICTURES,
                    payload:{
                        data, isFetching:false, lastDocument: res.docs[res.docs.length - 1]
                    }
                })
                resolve(data);
            }
        })
        .catch(error => {
            dispatch({type: SET_IS_FETCHING, payload: false})
            reject(error)});
    })
}