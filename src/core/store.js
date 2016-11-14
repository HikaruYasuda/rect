import { applyMiddleware, compose, createStore } from 'redux';
import reducer from './reducer'

/**
 * @param {*|any} initialState
 * @returns {Store}
 */
export default (initialState = {}) => {
  let middleware = applyMiddleware();

  if (process.env.NODE_ENV !== 'production') {
    // configure redux-devtools-extension
    // @see https://github.com/zalmoxisus/redux-devtools-extension
    const devToolsExtension = window['devToolsExtension'];
    if (typeof devToolsExtension === 'function') {
      middleware = compose(middleware, devToolsExtension());
    }
  }

  const store = createStore(reducer, initialState, middleware);

  if (module.hot) {
    module.hot.accept('./reducer', () => {
      store.replaceReducer(require('./reducer').default);
    });
  }

  return store;
}
