import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import classnames from 'classnames';

import 'react-datepicker/dist/react-datepicker.css';
import './DateBox.css';

export default class DateBox extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    const { onChange, name } = this.props;
    if (!onChange) return;
    if (name) return onChange(name, date);
    return onChange(date);
  }

  render() {
    const { value, className, placeholder, label, error } = this.props;
    const customClass = classnames('field', className);
    return (
      <div className={customClass}>
        { label ? (<label className="label">{label}</label>) : null }
        <div className="control">
          <DatePicker
            ref={(c) => {this._calendar = c }}
            dateFormat="DD MMM YYYY"
            selected={value ? value : moment()}
            onChange={this.handleChange}
            className="input"
            placeholderText={placeholder}
          />
          { error ? (<p className="help is-danger">{ error }</p>) : null }
        </div>
      </div>
    )
  }
}

DateBox.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  fallbackValue: PropTypes.object,
  className: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
}