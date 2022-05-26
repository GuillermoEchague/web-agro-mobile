import React from 'react';
import { Link } from 'react-router-dom';
import '../Button/ButtonHeader.css';


const STYLES = ['btn--primary', 'btn1--outline', 'btn1--test'];

const SIZES = ['btn--medium', 'btn1--large'];


export const ButtonHeader = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize
  }) => {
    const checkButtonStyle = STYLES.includes(buttonStyle)
      ? buttonStyle
      : STYLES[0];
  
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
  
    return (
      <Link to='/' className='btn1-mobile'>
        <button
          className={`btn ${checkButtonStyle} ${checkButtonSize}`}
          onClick={onClick}
          type={type}
        >
          {children}
        </button>
      </Link>
    );
  };