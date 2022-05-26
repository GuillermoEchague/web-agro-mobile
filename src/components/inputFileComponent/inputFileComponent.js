import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import "./input-file-component.css";
import pictureIcon from '../../assets/icons/picture.svg';

const InputFileComponent = React.forwardRef(({file, onFileLoaded ,labelText, type, id, value, onChange, error, accept}, ref) => {
    return (
        <div className="mb-3 input-file-component">
            <label htmlFor={id} className={classNames('form-label', {
                'text-danger':error
                })}>{!file ? <div>
                    <img className="picture-icon" src={pictureIcon} alt="analisis" /> {labelText}
                </div> : <div className="mb-3 photo-container">
                {file && <img onLoad={onFileLoaded} src={file} alt="File"/>}
            </div>}</label>
            <input  ref={ref}  value={value} accept={accept}  onChange={onChange} type={type} id={id} className={classNames('form-control',{'is-invalid':error})} />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
});

InputFileComponent.propTypes ={
    labelText: PropTypes.string,
    type: PropTypes.string,
    id: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    accept: PropTypes.string
}

InputFileComponent.defaultProps = {
    type: "text"
}

export default InputFileComponent
