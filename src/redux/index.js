import { routerMiddleware } from 'connected-react-router';
import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import history from '~/helpers/history';
import createReducer from './reducers';
import rootSaga from './saga';
import monitorReducerEnhancer from './enhancers/monitorReducer';

const sagaMiddleware = createSagaMiddleware();
function createSagaInjector(runSaga, rootSaga) {
    const injectedSagas = new Map();

    const isInjected = (key) => injectedSagas.has(key);

    const injectSaga = (key, saga) => {
        if (isInjected(key)) return;
        const task = runSaga(saga);
        injectedSagas.set(key, task);
    };
    injectSaga('root', rootSaga);
    return injectSaga;
}

function configureStore(initialState = {}) {
    const store =
        process.env.NODE_ENV === 'development'
            ? createStore(
                  createReducer(),
                  initialState,
                  composeWithDevTools(
                      applyMiddleware(routerMiddleware(history), sagaMiddleware, logger),
                      monitorReducerEnhancer,
                  ),
              )
            : createStore(createReducer(), {}, compose(applyMiddleware(routerMiddleware(history), sagaMiddleware)));

    store.asyncReducers = {};
    store.injectReducer = (key, asyncReducer) => {
        store.asyncReducers[key] = asyncReducer;
        store.replaceReducer(createReducer(store.asyncReducers));
    };

    store.injectSaga = createSagaInjector(sagaMiddleware.run, rootSaga);
    return store;
}

const store = configureStore();

export default store;
