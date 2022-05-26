import React, {useState} from 'react'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import InputComponent from '../../components/InputComponent/InputComponent'
import { signInFirebase } from '../../firebase/auth/functions';
import { SignUpValidation } from '../../validation/validation';
import { useHistory } from 'react-router-dom';




const SignIn = ({signIn = signInFirebase}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState("");
    const [sendingRequest, setSendingRequest] = useState(false);

    const history = useHistory();

    const createAccount = async (e) => {
        e.preventDefault();

        setApiError("");

        setErrors({});
        
        try {
            const validation = SignUpValidation(email, password);
            if(!validation.isValid){
                setErrors(validation.errors);
                return;
            }

            setSendingRequest(true);
            
            await signIn(email, password);  
            
            history.push('/user');
            
            
        } catch (error) {
            setApiError(error.message);
            setSendingRequest(false);
        }
    }


    return (
        <div className="container pt-5">
            <div className="row">
                <div className="col-md-6 col-sm-10 mx-auto">
                    <div className="card">
                        <div className="card-body">
                            <h3>Iniciar Sesión</h3> <hr/>
                            <form onSubmit={createAccount}>
                                <InputComponent
                                    id="email"
                                    labelText="Correo Electrónico"
                                    type="email"
                                    value={email}
                                    onChange={(e)=> setEmail(e.target.value)}
                                    error = {errors.email}

                                />

                                <InputComponent
                                    id="password"
                                    labelText="Contraseña"
                                    type="password"
                                    value={password}
                                    onChange={(e)=> setPassword(e.target.value)}
                                    error = {errors.password}
                                />

                                <div className="mb-3">
                                    <ButtonComponent
                                    id="btn-login"
                                    loading={sendingRequest}
                                    text="Iniciar Sesion"
                                    type="submit"
                                    
                                    />
                                    
                                </div>
                            </form>

                            {

                               apiError && <div className="alert alert-danger mt-4" role="alert">
                                   {apiError}
                               </div> 
                            }

                        </div>
                    </div>
                </div>
            </div>       
        </div>
    )
}

export default SignIn
