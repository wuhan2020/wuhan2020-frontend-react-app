import * as React from 'react';
import { Route } from 'react-router';
import { URLS } from './constants/urls';
import { Store } from 'redux';
import App from './components/App';
import Home from './components/Pages/Home';
import ClinicList from './components/Pages/Clinic/List';
import DonateList from './components/Pages/Donate/List';
import HotelList from './components/Pages/Hotel/List';
import TravelHotelList from './components/Pages/TravelHotel/List';
import LogisticsList from './components/Pages/Logistics/List';
import ProductionList from './components/Pages/Production/List';
import FreeConsultationList from './components/Pages/FreeConsultation/List';
import Treatment from './components/Pages/Treatment';
import NewsFeed from './components/Pages/NewsFeed';
import Clinic from './components/Pages/Clinic';


export default (store: Store<any>) => (
	<App>
		<Route exact path={URLS.HOME} component={ClinicList} />
		<Route exact path={URLS.CLINIC} component={Clinic} />
		<Route exact path={URLS.CLINICS} component={ClinicList} />
		<Route exact path={URLS.DONATE} component={DonateList} />
		<Route exact path={URLS.FREE_CONSULTATION} component={FreeConsultationList} />
		<Route exact path={URLS.HOTELS} component={HotelList} />
		<Route exact path={URLS.LOGISTICS} component={LogisticsList} />
		<Route exact path={URLS.NEWS_FEED} component={NewsFeed} />
		<Route exact path={URLS.PREVENTION_AND_TREATMENT} component={Treatment} />
		<Route exact path={URLS.PRODUCTION} component={ProductionList} />
		<Route exact path={URLS.TRAVEL_HOTEL} component={TravelHotelList} />
	</App>
);