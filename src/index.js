import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
// import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';

import { reducer } from './redux';
import { watcherSaga } from './saga';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const history = createBrowserHistory();

// create a redux store with our reducer above and middleware
let store = createStore(reducer, compose(applyMiddleware(sagaMiddleware)));

// run the saga
sagaMiddleware.run(watcherSaga);

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<App />
		</Router>
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
