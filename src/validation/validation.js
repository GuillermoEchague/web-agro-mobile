import validate from 'validate.js';

export const SignUpValidation = (email,password)=>{

    const validationErrors = {};

    if(validate.single(email,{presence: true, email: true })){
        validationErrors.email = "El correo electronico no es valido";
    }

    if(validate.single(password,{presence: true, length: {minimum: 6, maximum:30 } })){
        validationErrors.password = "La contraseña debe ser entre 6 y 30 caracteres";
    }
    return {isValid: Object.keys(validationErrors).length === 0, errors: validationErrors}
}

export const PictureValidation = (file) => {
    const validationErrors = {};

    const acceptTypes = ["image/png", "image/jpg", "image/jpeg"];

    const maxSize = 2; //2MB

    if (!acceptTypes.includes(file.type)) {
        validationErrors.picture = "La foto debe ser png o jpg";
    }

    if ((file.size /1024 / 1024) > maxSize){
        validationErrors.picture = "El tamaño no puede superar los 2MB";
    }

    return {isValid: Object.keys(validationErrors).length === 0, errors: validationErrors}
}


export const PictureValidationResolution = (width, height) => {
    const validationErrors = {};
    if (width < 1024) {
        validationErrors.picture = "La foto debe ser al menos de 1024 pixeles de ancho";
    }
    return {isValid: Object.keys(validationErrors).length === 0, errors: validationErrors}
}

export const SharePictureValidation = (title, picture, pictureOldErrors) => {
    const validationErrors = {};

    if (validate.single(title, { presence: true, length: { minimum: 6, maximum: 100 } })) {
        validationErrors.title = "El titulo debe ser entre 6 y 100 caracteres";
    }

    if(pictureOldErrors){
        validationErrors.picture = pictureOldErrors;
    } else {
        if (!picture || picture === null) {
            validationErrors.picture = "La foto es obligatoria";
        }
    }

    return {isValid: Object.keys(validationErrors).length === 0, errors: validationErrors}

}

export const isObjectEmpty = (obj) => Object.keys(obj).length === 0;