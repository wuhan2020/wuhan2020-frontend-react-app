import * as React from 'react';
import { Route } from 'react-router';
import { URLS } from './constants/urls';
import { Store } from 'redux';
import App from './components/App';
import Home from './components/Pages/Home';
import Clinics from './components/Pages/Clinic';


export default (store: Store<any>) => (
	<App>
		<Route exact path={URLS.HOME} component={Home} />
		<Route exact path={URLS.CLINICS} component={Clinics} />
	</App>
);