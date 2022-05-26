import { auth } from "../firebase";


export const signUpFirebase = (email, password) =>{
    return auth.createUserWithEmailAndPassword(email,password);
}

export const logoutFirebase = () =>{
    return auth.signOut();
}

export const signInFirebase = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
}