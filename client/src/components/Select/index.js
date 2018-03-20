import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

import 'react-select/dist/react-select.css';

export default ({
  options,
  value,
  onChange,
  clearable
}) => (
  <Select
    placeholder="Sorted by"
    options={options}
    value={value}
    clearable={clearable ? clearable : false}
    onChange={onChange}/>
)

Select.propsTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  clearable: PropTypes.bool,
  onChange: PropTypes.func,
}