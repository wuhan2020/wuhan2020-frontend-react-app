import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import "../styles/app.scss";
import { IApplicationState } from "../store";
import { AppState } from "../store/App";
import { actionCreators, Actions } from "../store/App/actions";
import { connect } from "react-redux";
import { Select, Spin } from 'antd';
import { bindActionCreators } from "redux";

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

	componentWillMount()
	{
		const { location, history } = this.props;
    const params = new URLSearchParams(location.search)
    
    // @todo - handle any global app request here
	}

	public render()
	{
		return (
			<div className="main">
				{this.props.children}
        Hello World
			</div>
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