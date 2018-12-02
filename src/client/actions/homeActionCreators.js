import fetch from 'isomorphic-fetch';

export function showLoading(show) {
  return {
    type: 'LOADING',
    loading: show
  };
}

export function fetchData(data) {
  return (dispatch) => {
    dispatch(showLoading(true));
    fetch(
      `https://api.busscanner.net/journeys?departure_date=${data.departure_date}&max_price=${data.max_price}&duration_class=${data.max_duration}${data.return_date ? `&return_date=${data.return_date}` : ''}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      }
    ).then(res => res.json())
      .then(
        (res) => {
          console.log(res);
          if (res) {
            dispatch(showLoading(false));
            return dispatch({
              type: 'FETCH_DATA_SUCCESS',
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
            });
          }
          dispatch(showLoading(false));
          return dispatch({
            type: 'FETCH_DATA_FAILURE',
          });
        }
      );
  };
}
