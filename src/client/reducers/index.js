import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import dataReducer from './data';

export default history => combineReducers({
  router: connectRouter(history),
  data: dataReducer
});
