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
      `https://api.busscanner.net/journeys?departure_date=${data.departure_date}&max_price=${data.max_price}&max_duration=${data.max_duration}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      }
    ).then(res => res.json())
      .then(
        (res) => {
          // console.log(res);
          if (res) {
            dispatch(showLoading(false));
            return dispatch({
              type: 'FETCH_DATA_SUCCESS',
              data: res
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
