import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './global.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={App} />
		</Switch>
	</BrowserRouter>, 
document.getElementById('root'));
registerServiceWorker();
