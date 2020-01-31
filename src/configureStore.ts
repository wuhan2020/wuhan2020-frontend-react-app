import * as thunkModule from 'redux-thunk';
import { compose, applyMiddleware, createStore } from "redux";
import { allReducers } from './store'
import { typedToPlain } from './common/StrongAction'


export default function configureStore(initialState?: any)
{
	// Build middleware. These are functions that can process the actions before they reach the store.
	const thunk = (thunkModule as any).default; // Workaround for TypeScript not importing thunk module as expected
	const windowIfDefined = typeof window === 'undefined' ? null : window as any;
	const devToolsExtension: () => () => void = windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__; // If devTools is installed, connect to it
	let createStoreWithMiddleware;
	if (devToolsExtension)
	{
		createStoreWithMiddleware = compose(applyMiddleware(thunk, typedToPlain as any), devToolsExtension())(createStore);
	} else
	{
		createStoreWithMiddleware = compose(applyMiddleware(thunk, typedToPlain as any))(createStore);
	}

	// Combine all reducers and instantiate the app-wide store instance
	const store = initialState ? createStoreWithMiddleware(allReducers, initialState) : createStoreWithMiddleware(allReducers, initialState)

	return store;
}
