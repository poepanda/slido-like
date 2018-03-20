import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

class Input extends Component {
  constructor(props) {
    super(props);

    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  getClasses({ addons, customClass, customInputClass, large }) {
    return {
      inputClass: classnames('input', customInputClass, { 'is-large': large }),
      fieldClass: classnames('field', customClass, { 'has-addons': addons }),
      controlClass: classnames('control', { 'is-expanded': addons }),
    }
  }

  onChangeHandler(e) {
    this.props.onChange(e.target.value);
  }

  render() {
    const { name, type, placeholder, value, label, hint, addons, error, leftAddon } = this.props;
    const { fieldClass, controlClass, inputClass } = this.getClasses(this.props);
    
    return (
      <div className={fieldClass}>
        { label ? (<label className="label">{ label }</label>) : null }
        { leftAddon ? leftAddon : null }
        <div className={controlClass}>
          <input
            name={name}
            onChange={this.onChangeHandler}
            value={value}
            type={type}
            className={inputClass}
            placeholder={placeholder}
          />
        </div>
        { addons ? (<div className="control">{ addons }</div>) : null }
        { hint ? (<p className="help">{ hint }</p>) : null }
        { error ? (<p className="help is-danger">{ error }</p>) : null }
      </div>
    )
  }
}

Input.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.any.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  hint: PropTypes.string,
  addons: PropTypes.element,
  
  // Styling props
  customClass: PropTypes.string,
  customInputClass: PropTypes.string,
  large: PropTypes.bool,
};

export default Input;