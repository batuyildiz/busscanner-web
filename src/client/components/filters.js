import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatetimeInput from './reusables/datetimeInput';
import SelectInput from './reusables/selectInput';
import SliderInput from './reusables/sliderInput';
import Button from './reusables/button';

const styles = {
  inputGroupStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '30px',
  },
  inputGroupStyleMobile: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '30px',
  },
  pipeStyle: {
    height: '30px',
    margin: '15px 15px 0px 15px',
    border: '0.5px solid #949494',
  },
  filterBg: {
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 27px 0 rgba(0, 0, 0, .13)',
    borderRadius: '8px',
  }
};

const durations = [
  {
    name: 'Anywhere',
    value: '0'
  },
  {
    name: 'Close (< 2 hours)',
    value: '2'
  },
  {
    name: 'Middle (< 4 hours)',
    value: '4'
  },
  {
    name: 'Far (+6 hours)',
    value: '6'
  },
];

class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departureDate: new Date(),
    };
  }

  handleDepartureDateChange(val, type) {
    const { onDepartureDateChange } = this.props;
    this.setState({ departureDate: val });
    onDepartureDateChange(val, type);
  }

  render() {
    const { departureDate } = this.state;
    const {
      onReturnDateChange,
      onMaxDurationChange,
      onPriceChange,
      onSearchClick,
    } = this.props;
    return (
      <div className="col-lg-12" style={styles.filterBg}>
        <div className="row pt-5">
          <div className="col-lg-3 col-md-6 col-sm-12 input-grp" style={styles.inputGroupStyle}>
            <DatetimeInput
              name="departureDate"
              label="Departure Date"
              onChange={val => this.handleDepartureDateChange(val, 'date')}
              type="date"
            />
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 input-grp" style={styles.inputGroupStyle}>
            <DatetimeInput
              name="returnDate"
              label="Return Date"
              onChange={val => onReturnDateChange(val, 'date')}
              type="date"
              clearable
              disablePast
              emptyLabel="Optional"
              minDate={departureDate}
            />
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 input-grp" style={styles.inputGroupStyle}>
            <SelectInput
              name="maxDuration"
              label="Journey Length"
              options={durations}
              onChange={val => onMaxDurationChange(val)}
              fixedWidth={300}
              initialValue="0"
            />
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 input-grp" style={styles.inputGroupStyle}>
            <SliderInput
              label="Max Price (per person)"
              onChange={val => onPriceChange(val)}
            />
          </div>
        </div>
        <div className="row pb-3 pr-5 pl-5">
          <div className="align-right col-lg-2 col-md-12" style={{ marginLeft: 'auto' }}>
            <Button
              classes={{ button: 'btnClass' }}
              text="Search"
              onClick={() => onSearchClick()}
              width="100%"
            />
          </div>
        </div>
      </div>
    );
  }
}

Filters.propTypes = {
  onDepartureDateChange: PropTypes.func.isRequired,
  onReturnDateChange: PropTypes.func.isRequired,
  onDeparturePlaceChange: PropTypes.func.isRequired,
  onPriceChange: PropTypes.func.isRequired,
  onMaxDurationChange: PropTypes.func.isRequired,
  onSearchClick: PropTypes.func.isRequired,
};

export default Filters;
