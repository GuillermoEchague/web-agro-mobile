import { useState, useEffect } from "react"
import { AuthContext } from "../context/AuthContext";
import {auth} from '../firebase/firebase';

export const AuthProvider = ({children}) =>{

    const [user, setUser] = useState({user:null, isLoading: true});

    useEffect(() => {
        const unsuscribe = auth.onAuthStateChanged((firebaseUser) =>{
            setUser({user: firebaseUser, isLoading:false});
        })
        return unsuscribe;
    }, []);

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>

}