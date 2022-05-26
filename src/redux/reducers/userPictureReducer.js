import {USER_NEW_PICTURE,SET_USER_PICTURES,SET_IS_FETCHING,SET_PAGINATION_END, DELETE_PICTURE} from '../types';

const initialState = {
    pictures: [],
    pagination: {lastDocument: null, limit:2 },
    paginationEnd: false,
    isFetching: false
}

const userPictureReducer = (state = initialState, action) =>{
    switch (action.type) {
        case USER_NEW_PICTURE:
            return {
                ...state,
                pictures: [action.payload, ...state.pictures]
            }
            case SET_USER_PICTURES:
                const { data, isFetching, lastDocument } = action.payload;
    
                let filtered = [...state.pictures, ...data];
                filtered = filtered.filter((picture, index, self) => self.findIndex(p => p.id === picture.id) === index);
    
                return {
                    ...state,
                    pictures: [...filtered],
                    isFetching,
                    pagination: { ...state.pagination, lastDocument }
                }
        case SET_IS_FETCHING:
            return {
                ...state,
               isFetching: action.payload
            }
        case SET_PAGINATION_END:
            return {
                ...state,
                isFetching: action.payload.isFetching,
                paginationEnd: action.payload.paginationEnd
            }
        case DELETE_PICTURE: 
        return {
            ...state,
            pictures: state.pictures.filter(Picture => Picture.id !== action.payload)
        }

        default:
            return state;
    }
}

export default userPictureReducer;