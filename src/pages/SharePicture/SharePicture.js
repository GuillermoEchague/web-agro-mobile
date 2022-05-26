import React, { useState, useContext, useRef } from 'react'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import InputComponent from '../../components/InputComponent/InputComponent'
import toBase64 from '../../helpers/imageToBase64';
import { PictureValidation, PictureValidationResolution, SharePictureValidation } from '../../validation/validation';
import { connect } from 'react-redux';
import {createPicture} from '../../redux/actions/userPictureActions';
import {AuthContext} from '../../context/AuthContext';
import getUsername from '../../helpers/username';
import InputFileComponent from '../../components/inputFileComponent/inputFileComponent';


export const SharePicture = ({actions}) => {

    const [title, setTitle] = useState("");
    const [picture, setPicture] = useState(null);
    const [sendingRequest, setSendingRequest ] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const [apiError, setApiError] = useState("");

    const pictureUploaderFileRef = useRef();
    const {user} = useContext(AuthContext);

    const onPictureSelect = async (event) =>{
        //console.log(event.target.files);
        if(event.target.files.length === 0){
            return;
        }
        const file = event.target.files[0];

        // Validacion de la foto
        const validation = PictureValidation(file);

        if (!validation.isValid){
            setValidationErrors(validation.errors);
            return;
        }

        setValidationErrors({});

        //Convertir la imagen a base 64
        const result = await toBase64(file);
        //console.log(result);
        setPicture(result);
    }

    const imageLoaded = (e) =>{
        const {naturalWidth, naturalHeight} = e.target; 
        //console.log(e.target.naturalWidth,  e.target.naturalHeight)
        const validation = PictureValidationResolution(naturalWidth, naturalHeight)
        setValidationErrors(validation.errors);
    }

    const share = async (e) =>{
        e.preventDefault();

        try {
            const validation = SharePictureValidation(title,picture, validationErrors.picture);

          
            setValidationErrors(validation.errors);

            if(!validation.isValid){
                return;
            }

            setSendingRequest(true);
            //console.log('Enviar Formulario');
            await actions.createPicture({
                title: title,
                picture: picture,
                user_id:user.uid,
                created_by: getUsername(user)
            })

            resetForm();


        } catch (error) {
            setApiError(error.message);

            setSendingRequest(false);
        }

    }


    const resetForm = () => {
        pictureUploaderFileRef.current.value = "";
        setSendingRequest(false);
        setApiError("");
        setPicture(null);
        setTitle("");

    }


    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-6 col-sm-8 mx-auto">
                    <div>
                        <h2>SUBIR IMAGEN</h2> <hr/>
                    </div>
                    <form onSubmit={share}>
                        <InputComponent
                        id="title"
                        labelText="Titulo"
                        value={title}
                        error={validationErrors.title}
                        onChange={(e)=> setTitle(e.target.value)}
                        />

                        <InputFileComponent
                        ref={pictureUploaderFileRef}
                        id="picture"
                        type="file"
                        labelText="Seleccione la imagen a analizar"
                        error={validationErrors.picture}
                        accept="image/png, image/jpg, image/jpeg"
                        onChange={onPictureSelect}
                       file={picture}
                       onFileLoaded={imageLoaded}
                        />

                        
                        <ButtonComponent
                            loading={sendingRequest}
                            id="btn-share"
                            type="submit"
                            text="Subir Imagen"
                        />
                    </form>
                    {
                        apiError && <div className="alert alert-danger mt-4" role="alert">
                            {apiError}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
       actions: {
           createPicture: (picture) => dispatch(createPicture(picture))
       }
    }
}


export default connect(null, mapDispatchToProps)(SharePicture);
