const initialState = {
  data: [],
  loading: false,
  dataFetched: false,
};

export default function dataReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        loading: action.loading,
      };
    case 'FETCH_DATA_SUCCESS':
      return {
        ...state,
        data: action.data.reduce((acc, cur) => {
          const rate = parseInt(
            ((parseFloat(cur.route.average_fare) - parseFloat(cur.fare)) / cur.average_fare)
            * 100, 0
          );
          if (rate > 0) {
            acc = [...acc, {
              ...cur,
              discount_percent: rate
            }];
          }
          return acc;
        }, []),
        dataFetched: true,
      };
    default:
      return state;
  }
}
