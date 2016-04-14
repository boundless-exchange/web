import { routerReducer } from 'react-router-redux';
import * as redux from 'redux';
import combinedReduction from 'combined-reduction';
import thunk from 'redux-thunk';

export function createRootReducer() {
  return combinedReduction({
    routing: routerReducer,
  });
}

export function createRootEnhancer() {
  const enhancers = [
    redux.applyMiddleware(
      thunk,
    ),
  ];

  if ('devToolsExtension' in global) {
    enhancers.push(window.devToolsExtension());
  }

  return redux.compose(...enhancers);
}

export function createStore(initialState) {
  return redux.createStore(
    createRootReducer(),
    initialState,
    createRootEnhancer(initialState),
  );
}
