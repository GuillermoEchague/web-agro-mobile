import { connect } from "react-redux";
import { deletePicture } from "../../../redux/actions/userPictureActions";
import { confirmAlert } from 'react-confirm-alert';
import trashIcon from "../../../assets/icons/trash.svg";
import 'react-confirm-alert/src/react-confirm-alert.css';
import "./delete-control.css"

export const DeleteControl = ({actions, picture}) => {

    const deletePicture = () => {

        confirmAlert({
            message: "Estas segur@ que quieres eliminar esta foto?",
            buttons: [
                {
                    label: "Si",
                    onClick: async () => await actions.deletePicture(picture)
                },
                {
                    label: "No",
                    onClick: () => {}
                }
            ]
        })
    }


    return <div onClick={deletePicture} className="delete-control">
        <img src={trashIcon} alt="Eliminar Foto" title="Eliminar Foto"></img>
    </div>
}

const mapDispatchToProps = (dispatch) => {
    return {
       actions:{
           deletePicture: (picture) => dispatch(deletePicture(picture))
       }
    }
}

export default connect(null, mapDispatchToProps)(DeleteControl);