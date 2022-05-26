import { useContext } from "react";
import {AuthContext} from "../../../context/AuthContext";

const Controls = ({children}) => {
    
    const {user} = useContext(AuthContext);

    const currentPath = window.location.pathname.replace("/","");

    const {picture} = children.props;

    return <div>{
        ((user && user.uid === picture.user_id) && currentPath === "user") && children
        }</div>
}

export default Controls;