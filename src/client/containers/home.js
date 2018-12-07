import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import InfiniteScroll from 'react-infinite-scroller';
import Header from '../components/header';
import Footer from '../components/footer';
import Filters from '../components/filters';
import JourneyCard from '../components/journeyCard';
import { fetchData, showLoading } from '../actions/homeActionCreators';
import { humanizeISODate, flixizeISODate, toISOStringBetter } from '../utils/helpers';
import Mixpanel from '../utils/mixpanel';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departureDate: new Date(),
      returnDate: '',
      departureTime: '',
      arrivalTime: '',
      departurePlace: '',
      maxPrice: 15,
      maxDuration: 0,
      searchCounter: 0,
    };
  }

  componentDidMount() {
    Mixpanel.track('PageView', { page_name: 'Homepage' });
  }

  handleDateChange(type, direction, value) {
    const key = `${direction}${type.charAt(0)
      .toUpperCase() + type.slice(1)}`;
    this.setState({
      [key]: value,
    });
  }

  handleDeparturePlaceChange(value) {
    this.setState({
      departurePlace: value,
    });
  }

  handleMaxDurationChange(value) {
    this.setState({
      maxDuration: value,
    });
  }

  handlePriceChange(value) {
    this.setState({
      maxPrice: value,
    });
  }

  handleSearchClick(offset) {
    const {
      departureDate,
      returnDate,
      departurePlace,
      maxDuration,
      maxPrice,
      searchCounter
    } = this.state;
    const { searchJourneys, showLoadingBar } = this.props;
    this.setState({ searchCounter: searchCounter + 1 });
    const payload = {
      departure_date: toISOStringBetter(departureDate)
        .split('T')[0],
      return_date: returnDate ? toISOStringBetter(returnDate)
        .split('T')[0] : null,
      max_price: maxPrice.toString(),
      max_duration: maxDuration,
    };

    // TODO: handle form errors
    if (departureDate !== null && maxPrice !== null && maxDuration !== null) {
      searchJourneys(payload, offset);
      if (offset === 0) {
        Mixpanel.track('Search', {
          departure_date: toISOStringBetter(departureDate)
            .split('T')[0],
          return_date: returnDate ? toISOStringBetter(returnDate)
            .split('T')[0] : null,
          max_price: maxPrice,
          max_duration: maxDuration
        });
      }
    }
  }

  render() {
    const {
      data,
      dataFetched,
      loading,
      hasMore
    } = this.props;
    const { returnDate, searchCounter } = this.state;
    return (
      <div className="container">
        <div className="bg">
          <Header />
          <div className="row mt-5 mb-5">
            <div className="col-12 col-md-12" style={{ textAlign: 'center' }}>
              <h1 style={{ color: '#ffffff', textShadow: '0 1px 5px rgba(0,0,0,.6)' }}> Easiest way to find bus trip deals! </h1>
            </div>
          </div>
          <Filters
            onDepartureDateChange={(val, type) => this.handleDateChange(type, 'departure', val)}
            onDepartureChange={() => {
            }}
            onReturnDateChange={(val, type) => this.handleDateChange(type, 'return', val)}
            onDeparturePlaceChange={val => this.handleDeparturePlaceChange(val)}
            onPriceChange={val => this.handlePriceChange(val)}
            onMaxDurationChange={val => this.handleMaxDurationChange(val)}
            onSearchClick={() => this.handleSearchClick(0)}
          />
        {loading ? (
          <LinearProgress style={{ borderRadius: '10px' }} />
        ) : (
          <div className="col-lg-12 pt-5">
            {data.length > 0 ? (
              <InfiniteScroll
                pageStart={0}
                loadMore={page => this.handleSearchClick(page)}
                hasMore={hasMore}
                loader={(
                  <div
                    style={{
                      width: '100%',
                      textAlign: 'center'
                    }}
                    key={`prgrs_${searchCounter}`}
                  >
                    <CircularProgress color="primary" />
                  </div>
                )}
                initialLoad={false}
              >
                <div className="row">
                  {data
                    .map((item, index) => (
                      <JourneyCard
                        key={`${item.title}_${index}_${searchCounter}`}
                        text={`From ${item.route.from_station.name} to ${item.route.to_station.name} `}
                        title={item.route.to_station.city.name}
                        image={item.route.to_station.city.image || 'https://i0.1616.ro/media/2/2621/33241/15520423/2/fli.jpg'}
                        duration={`${parseInt(item.duration_minutes / 60, 0)} hours ${item.duration_minutes % 60 !== 0 ? `${(item.duration_minutes % 60).toString()} minutes` : ''}`}
                        date={humanizeISODate(item.departure)}
                        time={item.departure.split('T')[1].substring(0, item.departure.split('T')[1].length - 3)}
                        price={item.fare}
                        rate={item.discount_percent.toString()}
                        url={`https://shop.global.flixbus.com/search?departureCity=${item.route.from_station.city.flix_id}&arrivalCity=${item.route.to_station.city.flix_id}&rideDate=${flixizeISODate(item.departure)}${returnDate ? `&backRide=1&backRideDate=${flixizeISODate(returnDate)}` : ''}`}
                        isTwoWay={returnDate ? humanizeISODate(returnDate) : ''}
                        order={index}
                        flixuid={item.flix_uid}
                      />
                    ))
                  }
                </div>
              </InfiniteScroll>) : (
                <div className="no-data-text">{dataFetched && 'Sorry! No journeys found.'}</div>
            )}
          </div>
        )
        }
        </div>
        <Footer />
      </div>
    );
  }
}

Home.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  dataFetched: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  hasMore: PropTypes.bool.isRequired,
  searchJourneys: PropTypes.func.isRequired,
  showLoadingBar: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const {
    data,
    dataFetched,
    loading,
    hasMore
  } = state.data;
  return {
    data,
    dataFetched,
    loading,
    hasMore
  };
}


function mapDispatchToProps(dispatch) {
  return {
    searchJourneys: (data, offset) => {
      dispatch(fetchData(data, offset));
    },
    showLoadingBar: (show) => {
      dispatch(showLoading(show));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
