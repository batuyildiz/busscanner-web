import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatetimeInput from './reusables/datetimeInput';
import SelectInput from './reusables/selectInput';
import SliderInput from './reusables/sliderInput';
import Button from './reusables/button';
import Mixpanel from '../utils/mixpanel';

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
  },
  titleText: {
    color: '#2a2a2a',
    fontFamily: 'Open Sans, Arial, Sans Serif',
    fontSize: '20px',
    textAlign: 'center',
    width: '100%',
  },
};

const durations = [
  {
    name: 'Anywhere',
    value: '0'
  },
  {
    name: 'Close (< 2 hours)',
    value: '1'
  },
  {
    name: 'Middle (2 - 4 hours)',
    value: '2'
  },
  {
    name: 'Far (+4 hours)',
    value: '3'
  },
];

const cities = [
  {
    name: 'Munich',
    value: 0
  },
];

class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: 0,
      departureDate: new Date(),
      screenState: 0,
    };
  }

  onCityChange(city) {
    this.setState({
      city,
    });
  }

  handleDepartureDateChange(val, type) {
    const { onDepartureDateChange } = this.props;
    this.setState({ departureDate: val });
    onDepartureDateChange(val, type);
  }

  changeState(scState) {
    const { city } = this.state;
    this.setState({
      screenState: scState,
    });
    Mixpanel.track('SearchInitiate', { city: cities[city].name });
  }

  render() {
    const { departureDate, screenState } = this.state;
    const {
      onReturnDateChange,
      onMaxDurationChange,
      onDepartureChange,
      onPriceChange,
      onSearchClick,
    } = this.props;
    return (
      <div className="col-lg-12" style={styles.filterBg}>
        <div className="row pt-4 pb-3">
          <div className="titleText" style={styles.titleText}>
            {screenState === 0
              ? 'Start by telling us where you are' : 'Now tell us when you want to leave Munich'}
          </div>
        </div>

        {screenState === 0 ? (
          <div className="row pt-1">
            <div className="col-lg-12 col-md-12 col-sm-12 input-grp" style={styles.inputGroupStyle}>
              <SelectInput
                name="departureCity"
                label=""
                options={cities}
                onChange={val => this.onCityChange(val)}
                fixedWidth={400}
                initialValue="0"
              />
            </div>
          </div>
        ) : (
          <div className="row pt-3">
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
        )}
        {screenState === 0 ? (
          <div className="row pb-3 pr-5 pl-5">
            <div className="col-lg-4 col-md-12" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
              <Button
                classes={{ button: 'btnClass' }}
                text="Continue"
                onClick={() => this.changeState(1)}
                width="100%"
              />
            </div>
          </div>
        ) : (
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
        )}
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
  onDepartureChange: PropTypes.func.isRequired,
  onSearchClick: PropTypes.func.isRequired,
};

export default Filters;
