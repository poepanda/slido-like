import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import storage from 'redux-persist/es/storage';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../rootReducer';
import rootSaga from '../rootSaga';

import { rehydrateComplete } from '../data/meta/actionCreators';

// Redux persist config
const config = {
  key: 'slidolike',
  storage
}

const reducer = persistReducer(config, rootReducer);

const sagaMiddleware = createSagaMiddleware(); 

const configureStore = preloadedState => {
  const store = createStore(
    reducer,
    preloadedState,
    compose(
      applyMiddleware(sagaMiddleware, createLogger()),
    )
  )

  sagaMiddleware.run(rootSaga);

  persistStore(store, {}, () => {
    store.dispatch(rehydrateComplete())
  });
  
  return store;
}

export default configureStore;