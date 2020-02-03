import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import styles from "../styles/app.module.scss";
import { IApplicationState } from "../store";
import { AppState } from "../store/App";
import { actionCreators, Actions } from "../store/App/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Nav from "./Elements/Nav";
import Footer from "./Elements/Footer";
import { Spin } from "antd";
import GlobalLoader from "./Elements/Loader/GloabalLoader";

interface Props extends RouteComponentProps<{}, {}>
{
	app: AppState;
	actions: Actions;
}

class App extends React.PureComponent<Props, {}>
{
	constructor(props)
	{
		super(props);
		const { location, history } = props
    const params = new URLSearchParams(location.search)
    
    // @todo - handle any authentication here
	}
	public componentDidMount()
	{
	}

	async componentWillMount()
	{
		const { location, actions } = this.props;
    const params = new URLSearchParams(location.search)
    
		await actions.fetchAllDataSource();
	}

	public render()
	{
		const { app } = this.props;
		return (
			app.dataSource ? <div className={styles.main}>
				<Nav />
				{this.props.children}
				<Footer />
				{app.loading ? <GlobalLoader size='large' /> : null}
			</div> : null
		);
	}
}

const mapStateToProps = (state: IApplicationState) =>
{
	return {
		app: state.app,
	};
}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({
		...actionCreators,
	}, dispatch)
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));