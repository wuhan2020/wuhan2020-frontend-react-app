import * as React from "react";
import styles from '../../../styles/pages/logistics/list.module.scss';
import Message from "../../Message";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { IApplicationState } from "../../../store";
import { withRouter, RouteComponentProps } from "react-router";
import { Layout } from "antd";

interface ConnectedProps {
	loading: boolean;
}

interface Props extends RouteComponentProps {

}
const { Content } = Layout;
class LogisticsList extends React.PureComponent<Props, {}>
{
	public props: ConnectedProps & Props;
	componentDidMount() {
	}

	onNewClick = () => {

	}

	render()
	{
		return (
			<Layout style={{backgroundColor: '#fff'}}>
				<Content>
					<div className={styles.pageLogisticsList}>
            Logistics List
					</div>
				</Content>
			</Layout>
		)
	}
}

const mapStateToProps = (state: IApplicationState) =>
{
	return {
		loading: state.app.loading,
	};
};

const mapActionsToProps = dispatch =>
{
	return {
		actions: bindActionCreators(
			{
			},
			dispatch
		),
	};
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withRouter(LogisticsList));