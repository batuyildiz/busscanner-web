const initialState = {
  data: [],
  loading: false,
  dataFetched: false,
  hasMore: false,
  citySuggestions: [],
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
        hasMore: state.data.length < action.data.length || action.reset,
        data: action.data,
        dataFetched: true,
      };
    case 'FETCH_CITY_SUCCESS':
      return {
        ...state,
        citySuggestions: action.data,
      };
    case 'RESET_DATA':
      return {
        data: [],
        loading: false,
        dataFetched: false,
        hasMore: false,
      };
    case 'LOAD_MORE_SUCCESS':
      return {
        ...state,
        data: [...state.data, action.data],
        dataFetched: true,
      };
    default:
      return state;
  }
}
