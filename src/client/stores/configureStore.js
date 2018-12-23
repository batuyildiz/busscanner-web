import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';


export default function configureStore(initialState) {
  return createStore(
    rootReducer(), // root reducer with router state
    initialState,
    compose(
      applyMiddleware(
        thunk
        // ... other middlewares ...
      ),
    ),
  );
}
