import firebase from "firebase/app";

import {db, storage} from '../firebase';

export const createPictureService = async (picture) => {
    picture['created_at'] = firebase.firestore.Timestamp.now();
    const { downloadURL, fileName } = await uploadPicture(picture);
    picture['picture'] = downloadURL;
    picture['filename'] = fileName;
    return db.collection("pictures").add(picture);
}

const uploadPicture = async (picture) => {
    const fileName = Date.now().toString();
    const storageRef = storage.ref(picture.created_by).child(fileName);
    const res = await storageRef.putString(picture.picture, 'data_url');
    const downloadURL = await res.ref.getDownloadURL();
    return { downloadURL, fileName };
}
export const deletePictureService = async (picture) => {
    const storageRef = storage.ref(picture.created_by);
    const pictureStorageRef = storageRef.child(picture.filename);
    await pictureStorageRef.delete();
    const docRef = db.collection("pictures").doc(picture.id);
    await docRef.delete();
}

export const getPicturesService = (lastDocument, limit) => {
    if (lastDocument === null) {
        return db.collection("pictures").orderBy('created_at', "desc").limit(limit).get();
    }

    return db.collection("pictures").orderBy('created_at', "desc").startAfter(lastDocument)
        .limit(limit).get();
}

export const getUserPicturesService = (lastDocument, limit, userId) => {
    if (lastDocument === null) {
        return db.collection("pictures").where("user_id", "==", userId).limit(limit).get();
    }

    return db.collection("pictures").where("user_id", "==", userId).startAfter(lastDocument).limit(limit).get();
}