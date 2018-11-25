import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/header';
import Filters from '../components/filters';
import JourneyCard from '../components/journeyCard';
import { fetchData, loading } from '../actions/homeActionCreators';

// import { actionCreators as homeActionCreators } from '../../ducks/home';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departureDate: new Date(),
      returnDate: '',
      departureTime: '',
      arrivalTime: '',
      departurePlace: '',
      maxPrice: 5,
      maxDuration: 0,
    };
  }

  handleDateChange(type, direction, value) {
    const key = `${direction}${type.charAt(0)
      .toUpperCase() + type.slice(1)}`;
    this.setState({
      [key]: value,
    });
    console.log(value);
  }

  handleDeparturePlaceChange(value) {
    this.setState({
      departurePlace: value,
    });
    console.log(value);
  }

  handleMaxDurationChange(value) {
    this.setState({
      maxDuration: value,
    });
    console.log(value);
  }

  handlePriceChange(value) {
    this.setState({
      maxPrice: value,
    });
    console.log(value);
  }

  handleSearchClick() {
    const {
      departureDate,
      returnDate,
      departurePlace,
      maxDuration,
      maxPrice,
    } = this.state;
    const { searchJourneys } = this.props;
    const payload = {
      departure_date: departureDate.toISOString()
        .split('T')[0],
      max_price: maxPrice.toString(),
      max_duration: maxDuration === 0 ? '100000' : (maxDuration * 60).toString(),
    };
    console.log('dd', payload);

    // TODO: handle form errors
    if (departureDate !== null && maxPrice !== null && maxDuration !== null) {
      console.log('click');
      searchJourneys(payload);
    }
  }

  render() {
    const { data, dataFetched } = this.props;
    return (
      <div className="container">
        <div className="bg">
          <Header />
          <Filters
            onDepartureDateChange={(val, type) => this.handleDateChange(type, 'departure', val)}
            onReturnDateChange={(val, type) => this.handleDateChange(type, 'return', val)}
            onDeparturePlaceChange={val => this.handleDeparturePlaceChange(val)}
            onPriceChange={val => this.handlePriceChange(val)}
            onMaxDurationChange={val => this.handleMaxDurationChange(val)}
            onSearchClick={() => this.handleSearchClick()}
          />
        </div>
        <div className="col-lg-12 pt-5">
          <h3 className="result-text" style={{ textAlign: dataFetched ? 'left' : 'center' }}>
            {dataFetched ? 'Results:' : 'Make a search to get started!'}
          </h3>
          <div className="row">
            {data.length > 0
              ? data.map((item, index) => (
                <JourneyCard
                  key={`${item.title}_${index}`}
                  text={`From ${item.route.from_station.name} to ${item.route.to_station.name} `}
                  title={item.route.to_station.city.name}
                  image={item.route.to_station.image || 'https://i0.1616.ro/media/2/2621/33241/15520423/2/fli.jpg'}
                  duration={item.duration_minutes.toString()}
                  date={item.departure.split('T')[0]}
                  time={item.departure.split('T')[1].substring(0, item.departure.split('T')[1].length - 3)}
                  price={item.fare}
                  url={`https://shop.global.flixbus.com/search?departureCity=${item.route.from_station.city.id}&arrivalCity=${item.route.from_station.city.id}&rideDate=26.11.2018`}
                />
              )) : (<div className="no-data-text">{dataFetched && 'Sorry! No journeys found.'}</div>)
            }
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  dataFetched: PropTypes.bool.isRequired,
  searchJourneys: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { data, dataFetched } = state.data;
  return {
    data,
    dataFetched
  };
}


function mapDispatchToProps(dispatch) {
  return {
    searchJourneys: (data) => {
      dispatch(fetchData(data));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
