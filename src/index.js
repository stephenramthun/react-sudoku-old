import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { boardSaga, reducer as board } from './store/board/reducer';
import { reducer as settings } from './store/settings/reducer';
import './index.less';

const sagaMiddleware = createSagaMiddleware();
const reducers = combineReducers({ board, settings });
const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(boardSaga);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
