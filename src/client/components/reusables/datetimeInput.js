import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';

const inputTypes = {
  date: DatePicker,
  time: TimePicker,
};

class DatetimeInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val: props.clearable ? null : new Date(),
    };
  }

  onChangeVal(val) {
    const { onChange } = this.props;
    this.setState({ val });
    onChange(val);
  }

  render() {
    const { val } = this.state;
    const {
      type,
      name,
      label,
      clearable,
      minDate,
      emptyLabel
    } = this.props;
    const InputElement = inputTypes[type];
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <InputElement
          name={name}
          label={label}
          value={val}
          onChange={v => this.onChangeVal(v)}
          clearable={clearable}
          minDate={minDate}
          emptyLabel={emptyLabel || null}
          format="d MMM yyyy"
        />
      </MuiPickersUtilsProvider>
    );
  }
}

DatetimeInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  clearable: PropTypes.bool,
  minDate: PropTypes.instanceOf(Date),
  emptyLabel: PropTypes.string,
};

DatetimeInput.defaultProps = {
  clearable: false,
  minDate: null,
  emptyLabel: null,
};

export default DatetimeInput;
