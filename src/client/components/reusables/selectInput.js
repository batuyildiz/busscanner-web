import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { selectInputStyles } from './styles';

class SelectInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val: props.initialValue,
    };
  }

  handleChange(event) {
    const { onChange } = this.props;
    this.setState({ val: event.target.value });
    onChange(event.target.value);
  }

  render() {
    const { val } = this.state;
    const {
      name,
      label,
      options,
      placeholder,
      width,
    } = this.props;
    return (
      <FormControl style={{ width }}>
        <InputLabel shrink>
          {label}
        </InputLabel>
        <Select
          value={val}
          onChange={e => this.handleChange(e)}
          input={<Input name={name} id={name} />}
          displayEmpty
          name={name}
          style={selectInputStyles.select}
        >
          {placeholder
            && (
            <MenuItem disabled value="">
              <em>{placeholder}</em>
            </MenuItem>
            )
          }
          {
            options.map((opt, index) => (
              <MenuItem key={`${name}_${index}`} value={opt.value}>{opt.name}</MenuItem>))
          }
        </Select>
      </FormControl>
    );
  }
}

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  initialValue: PropTypes.string,
  width: PropTypes.number,
};

SelectInput.defaultProps = {
  initialValue: null,
  placeholder: null,
  width: null,
};

export default SelectInput;
