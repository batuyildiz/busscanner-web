const initialState = {
  data: [],
  loading: false,
  dataFetched: false,
  hasMore: false,
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
        hasMore: state.data.length < action.data.length,
        data: action.data,
        dataFetched: true,
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
