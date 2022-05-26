import { combineReducers } from "redux";
import userPictureReducer from "./userPictureReducer";

export default combineReducers({
    userPictures: userPictureReducer
});
