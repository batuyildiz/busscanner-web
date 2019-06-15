import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatetimeInput from './reusables/datetimeInput';
import SelectInput from './reusables/selectInput';
import SliderInput from './reusables/sliderInput';
import TabsContainer from './reusables/tabs';
import Button from './reusables/button';
import AutoSuggest from './reusables/autosuggest';
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
    padding: 0,
  },
  titleText: {
    color: '#949494',
    fontFamily: 'Open Sans, Arial, Sans Serif',
    fontSize: '20px',
    textAlign: 'center',
    width: '100%',
  },
};

const durations = [
  {
    name: "Doesn't matter",
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

const weekdays = [
  {
    name: 'Monday',
    value: '2'
  },
  {
    name: 'Tuesday',
    value: '3'
  },
  {
    name: 'Wednesday',
    value: '4'
  },
  {
    name: 'Thursday',
    value: '5'
  },
  {
    name: 'Friday',
    value: '6'
  },
  {
    name: 'Saturday',
    value: '7'
  },
  {
    name: 'Sunday',
    value: '1'
  },
];

const cities = [
  {
    name: 'Munich',
    value: '0'
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

  suggestCities(val) {
    const { onCitySearch } = this.props;
    onCitySearch(val);
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
      onDepartureDayChange,
      onReturnDayChange,
      onPriceChange,
      onSearchClick,
      onArrivalPlaceChange,
      citySuggestions,
      onTabChange,
    } = this.props;

    const tabs = [
      {
        label: 'I know when...',
        icon: 'event',
        content: (
          <div className="row pt-3" style={{ width: '100%' }} key="tab_1_c">
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
        ),
      },
      {
        label: 'I know where...',
        icon: 'rv_hookup',
        content: (
          <div className="row pt-3" style={{ width: '100%' }} key="tab_2_c">
            <div className="col-lg-3 col-md-6 col-sm-12 input-grp" style={styles.inputGroupStyle}>
              <AutoSuggest
                name="arrivalPlace"
                label="Arrival Place"
                onSelect={val => onArrivalPlaceChange(val)}
                getSuggestions={val => this.suggestCities(val)}
                suggestions={citySuggestions}
              />
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 input-grp" style={styles.inputGroupStyle}>
              <SelectInput
                name="departureDay"
                label="Departure Day"
                options={weekdays}
                onChange={val => onDepartureDayChange(val)}
                fixedWidth={300}
                initialValue="6"
              />
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 input-grp" style={styles.inputGroupStyle}>
              <SelectInput
                name="returnDay"
                label="Return Day"
                options={weekdays}
                onChange={val => onReturnDayChange(val)}
                fixedWidth={300}
                initialValue="1"
              />
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 input-grp" style={styles.inputGroupStyle}>
              <SliderInput
                label="Max Price (per person)"
                onChange={val => onPriceChange(val)}
              />
            </div>
          </div>
        ),
      },
    ];
    return (
      <div className="col-lg-12" style={styles.filterBg}>
        {screenState === 0
        && (
        <div className="row p-4">
          <div className="titleText" style={styles.titleText}>
            Start by telling us where you are
          </div>
        </div>
        )
        }

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
          <TabsContainer
            tabs={tabs}
            handleTabsChange={val => onTabChange(val)}
          />
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
  onDepartureDayChange: PropTypes.func.isRequired,
  onReturnDayChange: PropTypes.func.isRequired,
  onReturnDateChange: PropTypes.func.isRequired,
  onDeparturePlaceChange: PropTypes.func.isRequired,
  onPriceChange: PropTypes.func.isRequired,
  onTabChange: PropTypes.func.isRequired,
  onMaxDurationChange: PropTypes.func.isRequired,
  onDepartureChange: PropTypes.func.isRequired,
  onSearchClick: PropTypes.func.isRequired,
  onCitySearch: PropTypes.func.isRequired,
  onArrivalPlaceChange: PropTypes.func.isRequired,
  citySuggestions: PropTypes.arrayOf(PropTypes.shape({}))
};

Filters.defaultProps = {
  citySuggestions: [],
};

export default Filters;
