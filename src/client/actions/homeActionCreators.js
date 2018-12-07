import fetch from 'isomorphic-fetch';

export function showLoading(show) {
  return {
    type: 'LOADING',
    loading: show
  };
}

export function fetchData(data, offset) {
  return (dispatch) => {
    if (offset === 0) {
      dispatch(showLoading(true));
    }
    fetch(
      `https://api.busscanner.net/journeys?departure_date=${data.departure_date}&max_price=${data.max_price}&duration_class=${data.max_duration}${data.return_date ? `&return_date=${data.return_date}` : ''}&limit=${8 * (offset + 1)}&offset=0`,
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
            return dispatch({
              type,
              data: data.return_date ? res
                .reduce((acc, cur) => [
                  ...acc,
                  {
                    ...cur.go,
                    fare: cur.total_price.toString(),
                    discount_percent: cur.discount_percent
                  }
                ], [])
                : res,
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
