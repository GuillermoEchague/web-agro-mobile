import PropTypes from 'prop-types';
import React from 'react';

export const ButtonComponent = ({ id, text, color, loading, type, onClick }) => {

    const classNames = "btn btn-" + color;

    return (<button onClick={onClick} disabled={loading} className={classNames} id={id} type={type}>
            { loading ? 
            <React.Fragment>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                &nbsp;<span>Procesando...</span>
            </React.Fragment>
            :  text }
        </button>)
}

ButtonComponent.propTypes = {
    id: PropTypes.string,
    text: PropTypes.string,
    color: PropTypes.string,
    loading: PropTypes.bool,
    type: PropTypes.string,
    onClick: PropTypes.func,
};

ButtonComponent.defaultProps = {
    type: "button",
    color: "primary"
};

export default ButtonComponent;
