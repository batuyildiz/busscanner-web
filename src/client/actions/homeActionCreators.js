import fetch from 'isomorphic-fetch';

export function showLoading(show) {
  return {
    type: 'LOADING',
    loading: show
  };
}

export function resetData() {
  return {
    type: 'RESET_DATA',
  };
}

export function fetchData(data, offset, endpoint) {
  const params = Object.keys(data).reduce((acc, cur) => {
    if (data[cur] && data[cur].toString().length > 0) {
      const paramString = `${cur}=${data[cur]}`;
      return [...acc, paramString];
    }
    return acc;
  }, []);
  return (dispatch) => {
    if (offset === 0) {
      dispatch(showLoading(true));
    }
    fetch(
      `https://api.busscanner.net/${endpoint}?${params.join('&')}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      }
    ).then(res => res.json())
      .then(
        (res) => {
          if (res) {
            if (offset === 0) {
              dispatch(showLoading(false));
            }
            const type = 'FETCH_DATA_SUCCESS';
            if (endpoint === 'journeys') {

              return dispatch({
                type,
                data: data.return_date ? res
                  .reduce((acc, cur) => [
                    ...acc,
                    {
                      ...cur.go,
                      fare: cur.total_price.toString(),
                      discount_percent: cur.discount_percent,
                      returnDate: cur.back.departure
                    }
                  ], [])
                  : res,
                reset: offset === 0,
              });
            }
            console.log('FETCH_DATA_SUCCESS');
            console.log(data);
            let mydata = res.reduce((acc, cur) => [
                    ...acc,
                    {
                      ...cur.go,
                      fare: cur.total_price.toString(),
                      discount_percent: cur.discount_percent,
                      returnDate: cur.back.departure
                    }
                  ], []);
            console.log(mydata);
            return dispatch({
              type,
              data: mydata,
              reset: offset === 0,
            });
          }
          if (offset === 0) {
            dispatch(showLoading(false));
          }
          return dispatch({
            type: 'FETCH_DATA_FAILURE',
          });
        }
      );
  };
}

export function fetchCities(val) {
  return (dispatch) => {
    fetch(
      `https://api.busscanner.net/cities?q=${val}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      }
    ).then(res => res.json())
      .then(
        (res) => {
          if (res) {
            const type = 'FETCH_CITY_SUCCESS';
            return dispatch({
              type,
              data: res,
            });
          }
          return dispatch({
            type: 'FETCH_CITY_FAILURE',
          });
        }
      );
  };
}
