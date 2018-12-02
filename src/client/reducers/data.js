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
        data: action.data,
        dataFetched: true,
      };
    default:
      return state;
  }
}
