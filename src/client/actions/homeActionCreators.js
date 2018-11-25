import fetch from 'isomorphic-fetch';

export function loading(showLoading) {
  return {
    type: 'LOADING',
    loading: showLoading
  };
}

export function fetchData(data) {
  return (dispatch) => {
    fetch(
      `https://cors-anywhere.herokuapp.com/http://api.busscanner.net/journeys?departure_date=${data.departure_date}&max_price=${data.max_price}&max_duration=${data.max_duration}`,
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
            return dispatch({
              type: 'FETCH_DATA_SUCCESS',
              data: res
            });
          }
          return dispatch({
            type: 'FETCH_DATA_FAILURE',
          });
        }
      );
  };
}
