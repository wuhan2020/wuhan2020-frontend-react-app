import * as React from 'react';
import { Route } from 'react-router';
import { URLS } from './constants/urls';
import { Store } from 'redux';
import App from './components/App';
import Home from './components/Pages/Home';


export default (store: Store<any>) => (
	<App>
		<Route exact path={URLS.HOME} component={Home} />
	</App>
);