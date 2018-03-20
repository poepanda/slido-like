import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const Button = ({ customClass, large, primary, children, ...rest }) => {
  const classes = classnames('button', 
  customClass,
    {
      'is-large': large,
      'is-primary': primary
    }
  )

  return (
    <button {...rest} className={classes}>
      {children}
    </button>
  )
}

Button.propTypes = {
  customClass: PropTypes.string,
  large: PropTypes.bool,
  primary: PropTypes.bool,
  children: PropTypes.any
}

export default Button;